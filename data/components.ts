export interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  href: string;
}

export const componentRegistry: ComponentMetadata[] = [
  {
    name: 'Tabs',
    category: 'Navigation',
    description: 'Tabbed interface supporting Assist and Build modes',
    href: '/components/tabs',
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
];

