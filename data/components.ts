export interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  href: string;
}

export const componentRegistry: ComponentMetadata[] = [
  {
    name: 'Button',
    category: 'Action',
    description: 'Versatile button component with multiple variants, themes, sizes, and states',
    href: '/components/button',
  },
  {
    name: 'Tab',
    category: 'Navigation',
    description: 'Flexible tab component with multiple styles, placements, and optional features',
    href: '/components/tab',
  },
  {
    name: 'Input',
    category: 'Form',
    description: 'Versatile input field with multiple sizes, variants, and states',
    href: '/components/input',
  },
  {
    name: 'Select',
    category: 'Form',
    description: 'Dropdown select component with multiple sizes, variants, and search functionality',
    href: '/components/select',
  },
];

