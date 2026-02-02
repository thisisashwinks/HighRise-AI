import { componentRegistry } from '@/data/components';
import { ComponentDocProps } from '@/types/documentation';

// Import all documentation components to extract their data
// We'll create a function that builds the search index from component data

export interface SearchableItem {
  id: string;
  type: 'component' | 'example' | 'figma';
  title: string;
  description: string;
  category?: string;
  href: string;
  tags?: string[];
  content: string; // All searchable text content
  componentName?: string; // For examples and figma docs
}

// This will be populated by importing component documentation
// For now, we'll create a function that builds the index dynamically
export function buildSearchIndex(componentDocs: ComponentDocProps[]): SearchableItem[] {
  const index: SearchableItem[] = [];

  componentDocs.forEach((doc) => {
    // Add component itself
    const componentContent = [
      doc.name,
      doc.category,
      doc.description,
      ...doc.whenToUse,
      ...doc.whenNotToUse,
      ...doc.anatomy.map((a) => `${a.name} ${a.description}`),
      ...doc.variants.map((v) => `${v.name} ${v.description}`),
      ...doc.states.map((s) => `${s.name} ${s.description}`),
      ...doc.props.map((p) => `${p.name} ${p.type} ${p.description}`),
      ...doc.usageGuidelines.do,
      ...doc.usageGuidelines.dont,
      ...doc.accessibility.keyboard,
      ...doc.accessibility.screenReader,
      ...doc.accessibility.ariaHints,
      ...(doc.aiConsiderations
        ? [
            doc.aiConsiderations.invocation,
            doc.aiConsiderations.latency,
            doc.aiConsiderations.uncertainty,
            doc.aiConsiderations.manualOverride,
            doc.aiConsiderations.context,
            doc.aiConsiderations.safety,
            doc.aiConsiderations.dataVisibility,
          ].filter(Boolean)
        : []),
      ...doc.relatedComponents,
    ].join(' ');

    index.push({
      id: `component-${doc.name.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'component',
      title: doc.name,
      description: doc.description,
      category: doc.category,
      href: `/components/${doc.name.toLowerCase().replace(/\s+/g, '-')}`,
      content: componentContent.toLowerCase(),
    });

    // Add examples
    if (doc.examples) {
      doc.examples.forEach((example, idx) => {
        const exampleContent = [
          example.title,
          example.description,
          example.critique,
          example.highLevelApplication,
          example.productName,
          ...(example.tags || []),
        ]
          .filter(Boolean)
          .join(' ');

        index.push({
          id: `example-${doc.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
          type: 'example',
          title: example.title,
          description: example.description || '',
          category: doc.category,
          href: `/components/${doc.name.toLowerCase().replace(/\s+/g, '-')}#examples`,
          tags: example.tags,
          componentName: doc.name,
          content: exampleContent.toLowerCase(),
        });
      });
    }

    // Add Figma documentation
    if (doc.figmaDocumentation) {
      const figmaContent = [
        doc.figmaDocumentation.title,
        doc.figmaDocumentation.description,
        'figma',
        'design',
        'visual reference',
      ]
        .filter(Boolean)
        .join(' ');

      index.push({
        id: `figma-${doc.name.toLowerCase().replace(/\s+/g, '-')}`,
        type: 'figma',
        title: doc.figmaDocumentation.title,
        description: doc.figmaDocumentation.description || '',
        category: doc.category,
        href: `/components/${doc.name.toLowerCase().replace(/\s+/g, '-')}#figma`,
        componentName: doc.name,
        content: figmaContent.toLowerCase(),
      });
    }
  });

  return index;
}

// Simple fuzzy search function
export function searchIndex(query: string, index: SearchableItem[]): SearchableItem[] {
  if (!query.trim()) return [];

  const queryLower = query.toLowerCase().trim();
  const queryWords = queryLower.split(/\s+/);

  return index
    .map((item) => {
      let score = 0;

      // Exact title match gets highest score
      if (item.title.toLowerCase().includes(queryLower)) {
        score += 100;
      }

      // Title starts with query gets high score
      if (item.title.toLowerCase().startsWith(queryLower)) {
        score += 50;
      }

      // Category match
      if (item.category?.toLowerCase().includes(queryLower)) {
        score += 30;
      }

      // Description match
      if (item.description.toLowerCase().includes(queryLower)) {
        score += 20;
      }

      // Tag matches
      if (item.tags) {
        item.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(queryLower)) {
            score += 25;
          }
        });
      }

      // Content match (word by word)
      queryWords.forEach((word) => {
        if (item.content.includes(word)) {
          score += 5;
        }
      });

      // Component name match (for examples/figma)
      if (item.componentName?.toLowerCase().includes(queryLower)) {
        score += 15;
      }

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20) // Limit to top 20 results
    .map(({ item }) => item);
}
