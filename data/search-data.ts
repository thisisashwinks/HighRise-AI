// Comprehensive search data extracted from component documentation
// This includes components, examples, and Figma documentation

import { componentRegistry } from './components';
import { SearchableItem } from '@/lib/search-data';

export interface ComponentExampleData {
  componentSlug: string;
  componentName: string;
  examples: Array<{
    title: string;
    description: string;
    tags?: string[];
  }>;
  figma?: {
    title: string;
    description: string;
  };
}

// Example data extracted from component documentation
const componentExamples: ComponentExampleData[] = [
  {
    componentSlug: 'input',
    componentName: 'Input',
    examples: [
      {
        title: 'Placeholder State',
        description: 'Input field in its initial placeholder state, showing helpful guidance text that indicates the expected input format or type',
        tags: ['placeholder', 'guidance', 'state'],
      },
      {
        title: 'Filled State',
        description: 'Input field displaying user-entered content. The filled state shows the actual value entered by the user',
        tags: ['filled', 'content', 'state'],
      },
      {
        title: 'Hover State',
        description: 'Input field in hover state, showing visual feedback when the user moves their cursor over the input area',
        tags: ['hover', 'interaction', 'feedback'],
      },
      {
        title: 'Focus State',
        description: 'Input field in focus state when actively receiving input. The focus state includes a border highlight and focus ring',
        tags: ['focus', 'active', 'indicator'],
      },
      {
        title: 'Disabled State',
        description: 'Input field in disabled state, preventing user interaction. Disabled inputs are visually distinct with reduced opacity',
        tags: ['disabled', 'inactive', 'state'],
      },
      {
        title: 'Auto-Fill Functionality',
        description: 'Input field with auto-fill suggestions that appear as the user types. Auto-fill helps users complete their input faster',
        tags: ['auto-fill', 'suggestions', 'productivity'],
      },
      {
        title: 'Number Input',
        description: 'Specialized input field for numeric values with appropriate formatting and validation',
        tags: ['number', 'numeric', 'validation'],
      },
    ],
    figma: {
      title: 'Input Component Documentation',
      description: 'Complete visual reference showing all input sizes, variants, states, and configurations from the design system',
    },
  },
  {
    componentSlug: 'tab',
    componentName: 'Tabs',
    examples: [
      {
        title: 'Assist & Build Mode',
        description: 'Tabs used to switch between Assist and Build modes, providing users with two distinct workflows within the same interface',
        tags: ['mode-switching', 'workflow', 'ai-assist', 'manual-editing'],
      },
      {
        title: 'Assist Tabs Example',
        description: 'The Assist tabs provide an AI-powered interface for content creation and suggestions',
        tags: ['assist', 'ai', 'content-creation', 'suggestions'],
      },
      {
        title: 'Build Tabs Example',
        description: 'The Build tabs offer a manual editing interface where users have full control over content structure and design',
        tags: ['build', 'manual', 'editing', 'customization'],
      },
    ],
    figma: {
      title: 'Tabs Component Documentation',
      description: 'Complete visual reference showing all tab types, placements, sizes, and configurations from the design system',
    },
  },
  {
    componentSlug: 'select',
    componentName: 'Select',
    examples: [
      {
        title: 'Select with Dropdown',
        description: 'A standard select component with a dropdown menu displaying available options',
        tags: ['dropdown', 'options', 'interaction'],
      },
      {
        title: 'Multi-select with Dropdown',
        description: 'Select component supporting multiple selections with checkboxes in the dropdown',
        tags: ['multi-select', 'checkboxes', 'multiple'],
      },
    ],
    figma: {
      title: 'Select Component Documentation',
      description: 'Complete visual reference showing all select sizes, variants, states, and configurations from the design system',
    },
  },
  {
    componentSlug: 'input-slider',
    componentName: 'Input Slider',
    examples: [
      {
        title: 'Input Slider - Standard Implementation',
        description: 'A standard input slider component demonstrating the basic track, fill, and thumb elements',
        tags: ['basic', 'default', 'standard'],
      },
      {
        title: 'Input Slider - Dual Side Configuration',
        description: 'Slider with dual handles allowing selection of a range between two values',
        tags: ['range', 'dual', 'handles'],
      },
    ],
    figma: {
      title: 'Input Slider Component Documentation',
      description: 'Complete visual reference showing all slider sizes, states, variants, and configurations from the design system',
    },
  },
  {
    componentSlug: 'accordion',
    componentName: 'Accordion',
    examples: [
      {
        title: 'Accordion - Collapsed State',
        description: 'Accordion component in its default collapsed state, showing multiple sections with clear headers',
        tags: ['collapsed', 'default-state', 'space-efficient'],
      },
      {
        title: 'Accordion - Expanded with Slot & Footer',
        description: 'Accordion with expanded content including custom slots and footer sections',
        tags: ['expanded', 'custom-content', 'footer'],
      },
    ],
    figma: {
      title: 'Accordion Component Documentation',
      description: 'Complete visual reference showing all accordion variants, sizes, states, and configurations from the design system',
    },
  },
  {
    componentSlug: 'textarea',
    componentName: 'Text Area',
    examples: [
      {
        title: 'Filled State',
        description: 'A textarea in its filled state showing user-entered content. The textarea displays the entered text clearly with proper spacing',
        tags: ['filled', 'content', 'state'],
      },
      {
        title: 'Auto-Fill Functionality',
        description: 'Textarea with auto-fill capability that suggests and completes text based on context or previous entries. This feature enhances productivity by reducing manual typing',
        tags: ['auto-fill', 'suggestions', 'productivity'],
      },
      {
        title: 'Error State',
        description: 'Textarea displaying error state with validation feedback and error messaging',
        tags: ['error', 'validation', 'state'],
      },
    ],
    figma: {
      title: 'Text Area Component Documentation',
      description: 'Complete visual reference showing all textarea sizes, variants, states, and configurations from the design system',
    },
  },
  // Add more components as needed - this can be expanded
];

export function buildFullSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];

  // Add components from registry
  componentRegistry.forEach((component) => {
    const componentSlug = component.href.replace('/components/', '');
    
    items.push({
      id: `component-${componentSlug}`,
      type: 'component',
      title: component.name,
      description: component.description,
      category: component.category,
      href: component.href,
      content: [
        component.name,
        component.category,
        component.description,
      ].join(' ').toLowerCase(),
    });
  });

  // Add examples and Figma docs
  componentExamples.forEach(({ componentSlug, componentName, examples, figma }) => {
    const component = componentRegistry.find(c => c.href === `/components/${componentSlug}`);
    const category = component?.category;

    // Add examples
    examples.forEach((example, idx) => {
      items.push({
        id: `example-${componentSlug}-${idx}`,
        type: 'example',
        title: example.title,
        description: example.description,
        category,
        href: `/components/${componentSlug}#examples`,
        tags: example.tags,
        componentName,
        content: [
          example.title,
          example.description,
          ...(example.tags || []),
          componentName,
        ].join(' ').toLowerCase(),
      });
    });

    // Add Figma doc
    if (figma) {
      items.push({
        id: `figma-${componentSlug}`,
        type: 'figma',
        title: figma.title,
        description: figma.description,
        category,
        href: `/components/${componentSlug}#figma`,
        componentName,
        content: [
          figma.title,
          figma.description,
          'figma',
          'design',
          'visual reference',
          componentName,
        ].join(' ').toLowerCase(),
      });
    }
  });

  return items;
}
