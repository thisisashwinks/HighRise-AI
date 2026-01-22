export interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  href: string;
  parentGroup?: string; // For sub-components that belong to a parent group
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
    href: '/components/checkbox/checkbox-card',
    parentGroup: 'Checkbox',
  },
  {
    name: 'Checkbox Group',
    category: 'Form',
    description: 'Group component for displaying multiple checkboxes together with consistent styling, horizontal/vertical layouts, and comprehensive state management',
    href: '/components/checkbox/checkbox-group',
    parentGroup: 'Checkbox',
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
    href: '/components/radio/radio-card',
    parentGroup: 'Radio',
  },
  {
    name: 'Radio Group',
    category: 'Form',
    description: 'Group component for displaying multiple radio buttons together with consistent styling, horizontal/vertical layouts, and comprehensive state management',
    href: '/components/radio/radio-group',
    parentGroup: 'Radio',
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
    href: '/components/toggle/toggle-switch-group',
    parentGroup: 'Toggle',
  },
  {
    name: 'Toggle Card Group',
    category: 'Form',
    description: 'Group component for displaying multiple toggle card components together with consistent styling, horizontal/vertical layouts, icons, descriptions, and comprehensive state management',
    href: '/components/toggle/toggle-card-group',
    parentGroup: 'Toggle',
  },
  {
    name: 'Input Slider',
    category: 'Form',
    description: 'Range slider component for selecting numeric values within a specified range with multiple sizes, states, optional value display, and comprehensive interactive feedback',
    href: '/components/input-slider',
  },
  {
    name: 'Accordion',
    category: 'Content',
    description: 'Collapsible content component for organizing and displaying information in expandable sections',
    href: '/components/accordion',
  },
  {
    name: 'ToDos Accordion',
    category: 'Content',
    description: 'Specialized accordion component for organizing and managing todo items in collapsible sections with checkboxes, due dates, priorities, and completion tracking',
    href: '/components/todos-accordion',
  },
  {
    name: 'Progress Indicator',
    category: 'Feedback',
    description: 'Progress bar and loading indicators to show task completion status and progress. Supports linear bars, circular indicators, stepper progress, and loading animations',
    href: '/components/progress-indicator',
  },
];

// Helper function to get sub-components for a parent group
export const getSubComponents = (parentGroupName: string): ComponentMetadata[] => {
  return componentRegistry.filter((component) => component.parentGroup === parentGroupName);
};

export const comingSoonComponents: ComingSoonComponentMetadata[] = [
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
    name: 'Date Picker',
    category: 'Form',
    description: 'Date selection component with calendar interface for choosing dates and date ranges',
  },
  {
    name: 'Voice Input',
    category: 'Form',
    description: 'Voice input component for capturing audio input and converting speech to text with recording controls and transcription support',
  },
  {
    name: 'Inline Input Editor',
    category: 'Form',
    description: 'Inline editable input component that allows users to edit text directly in place without switching to an edit mode',
  },
  {
    name: 'Inline Text Area Editor',
    category: 'Form',
    description: 'Inline editable textarea component that allows users to edit multi-line text directly in place with auto-resize and formatting support',
  },
  {
    name: 'Inline AI Chat (Editor)',
    category: 'Content',
    description: 'Inline AI chat editor component for conversational interfaces with message history, streaming responses, and rich text editing capabilities',
  },
  {
    name: 'Copilot Panel',
    category: 'Content',
    description: 'AI copilot panel component providing contextual assistance, suggestions, and interactive guidance within the application interface',
  },
  {
    name: 'Questions & Answers',
    category: 'Form',
    description: 'Interactive Q&A form component for gathering context through various input types including single select, multi-select, text inputs, and dropdowns',
  },
  {
    name: 'Modal (Prompt Library/Knowledge Base)',
    category: 'Content',
    description: 'Modal component for displaying prompt libraries and knowledge base content with search, filtering, and content management capabilities',
  },
  {
    name: 'Audio Chimes/Feedback',
    category: 'Feedback',
    description: 'Audio feedback component providing sound chimes and audio cues for user actions, notifications, and system events',
  },
  {
    name: 'Color Inputs',
    category: 'Form',
    description: 'Color input component for selecting colors with multiple input methods including color picker, hex input, RGB/HSL sliders, and visual color swatches',
  },
  {
    name: 'Stream of Thought',
    category: 'Content',
    description: 'Stream of thought component for displaying AI reasoning processes, step-by-step thinking, and progressive content revelation in real-time',
  },
];
