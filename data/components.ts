export interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  href: string;
}

export interface ComingSoonComponentMetadata {
  name: string;
  category: string;
  description: string;
}

export const componentRegistry: ComponentMetadata[] = [
  {
    name: 'Button',
    category: 'Action',
    description: 'Versatile button component with multiple variants, themes, sizes, and states',
    href: '/components/button',
  },
  {
    name: 'Tabs',
    category: 'Navigation',
    description: 'Flexible tabs component with multiple styles, placements, and optional features',
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
  {
    name: 'Dropdown',
    category: 'Form',
    description: 'Flexible dropdown menu component with multiple sizes, variants, and tree structures',
    href: '/components/dropdown',
  },
  {
    name: 'Content Switcher',
    category: 'Navigation',
    description: 'Segmented control for switching between related content views or options with clear visual distinction',
    href: '/components/content-switcher',
  },
  {
    name: 'Input Form',
    category: 'Form',
    description: 'Comprehensive form component that arranges multiple Input fields in organized sections with flexible column layouts',
    href: '/components/input-form',
  },
  {
    name: 'Text Area',
    category: 'Form',
    description: 'Multi-line text input component for longer text entries, messages, and prompts with auto-resize and validation support',
    href: '/components/textarea',
  },
  {
    name: 'Checkbox',
    category: 'Form',
    description: 'Checkbox component for selecting one or multiple options from a list with support for checked, indeterminate, and error states',
    href: '/components/checkbox',
  },
  {
    name: 'Checkbox Card',
    category: 'Form',
    description: 'Card-based checkbox component for selecting options with visual distinction, icons, descriptions, and custom content slots',
    href: '/components/checkbox-card',
  },
  {
    name: 'Checkbox Group',
    category: 'Form',
    description: 'Group component for displaying multiple checkboxes together with consistent styling, horizontal/vertical layouts, and comprehensive state management',
    href: '/components/checkbox-group',
  },
  {
    name: 'Radio',
    category: 'Form',
    description: 'Radio button component for selecting a single option from a group of options with support for checked, error, and disabled states',
    href: '/components/radio',
  },
  {
    name: 'Radio Card',
    category: 'Form',
    description: 'Card-based radio button component for selecting a single option with visual distinction, icons, descriptions, and custom content slots',
    href: '/components/radio-card',
  },
  {
    name: 'Radio Group',
    category: 'Form',
    description: 'Group component for displaying multiple radio buttons together with consistent styling, horizontal/vertical layouts, and comprehensive state management',
    href: '/components/radio-group',
  },
  {
    name: 'Toggle',
    category: 'Form',
    description: 'Toggle switch component for binary on/off states and settings with multiple sizes, states, and optional labels',
    href: '/components/toggle',
  },
  {
    name: 'Toggle Switch Group',
    category: 'Form',
    description: 'Group component for displaying multiple toggle switches together with consistent styling, horizontal/vertical layouts, and comprehensive state management',
    href: '/components/toggle-switch-group',
  },
];

export const comingSoonComponents: ComingSoonComponentMetadata[] = [
  {
    name: 'Accordion',
    category: 'Content',
    description: 'Collapsible content component for organizing and displaying information in expandable sections',
  },
  {
    name: 'Audio Player',
    category: 'Media',
    description: 'Audio playback component with controls for playing, pausing, and managing audio content',
  },
  {
    name: 'Loading & Thinking Icons/States',
    category: 'Feedback',
    description: 'Visual indicators and animations for loading states and AI thinking processes',
  },
  {
    name: 'Progress Indicator',
    category: 'Feedback',
    description: 'Progress bar and loading indicators to show task completion status and progress',
  },
  {
    name: 'Date Picker',
    category: 'Form',
    description: 'Date selection component with calendar interface for choosing dates and date ranges',
  },
  {
    name: 'Slider',
    category: 'Form',
    description: 'Range slider component for selecting numeric values within a specified range',
  },
];
