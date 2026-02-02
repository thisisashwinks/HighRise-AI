// This file contains search utilities for the search component
// The actual search data is built in data/search-data.ts

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

// Enhanced search function with better matching
export function searchItems(query: string, items: SearchableItem[]): SearchableItem[] {
  if (!query.trim()) return [];

  const queryLower = query.toLowerCase().trim();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);

  return items
    .map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const contentLower = item.content.toLowerCase();
      const categoryLower = item.category?.toLowerCase() || '';

      // Exact title match gets highest score
      if (titleLower === queryLower) {
        score += 1000;
      } else if (titleLower.startsWith(queryLower)) {
        score += 500;
      } else if (titleLower.includes(queryLower)) {
        score += 200;
      }

      // Word-by-word title matching
      queryWords.forEach((word) => {
        if (titleLower.includes(word)) {
          score += 100;
        }
      });

      // Category match
      if (categoryLower.includes(queryLower)) {
        score += 150;
      }

      // Description match
      if (descLower.includes(queryLower)) {
        score += 50;
      }

      // Tag matches (high weight)
      if (item.tags) {
        item.tags.forEach((tag) => {
          const tagLower = tag.toLowerCase();
          if (tagLower === queryLower) {
            score += 300;
          } else if (tagLower.includes(queryLower)) {
            score += 100;
          }
          queryWords.forEach((word) => {
            if (tagLower.includes(word)) {
              score += 50;
            }
          });
        });
      }

      // Content match (word by word, lower weight)
      queryWords.forEach((word) => {
        if (contentLower.includes(word)) {
          score += 10;
        }
      });

      // Component name match (for examples/figma)
      if (item.componentName) {
        const compNameLower = item.componentName.toLowerCase();
        if (compNameLower.includes(queryLower)) {
          score += 80;
        }
      }

      // Type boost (components get slight boost)
      if (item.type === 'component') {
        score += 5;
      }

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      // Sort by score descending, then by title alphabetically
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.item.title.localeCompare(b.item.title);
    })
    .slice(0, 25) // Limit to top 25 results
    .map(({ item }) => item);
}
