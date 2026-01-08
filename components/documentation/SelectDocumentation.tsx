import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const SelectDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Select"
      category="Form"
      description="A dropdown select component that allows users to choose from a predefined list of options. Supports multiple sizes, variants with icons and avatars, search functionality, and comprehensive states."
      whenToUse={[
        'Selecting a single option from a predefined list',
        'Forms requiring dropdown selection (country, state, category)',
        'When space is limited and a dropdown is more compact than radio buttons',
        'Selecting from a large list of options (especially with search enabled)',
        'When the selected value needs to be displayed with an icon or avatar',
        'Filtering or sorting interfaces where users choose from categories'
      ]}
      whenNotToUse={[
        'For selecting multiple options (use MultiSelect or Checkbox group instead)',
        'For text input (use Input component instead)',
        'When there are only 2-3 options (consider using Radio buttons or Toggle)',
        'For navigation between pages (use Navigation or Menu components)',
        'When options need to be hierarchical (use TreeSelect component)',
        'For selecting dates or times (use DatePicker or TimePicker instead)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label',
          description: 'Optional text label displayed above the select field. Provides context for what is being selected.'
        },
        {
          number: 2,
          name: 'Select Button',
          description: 'The main interactive element that displays the selected value or placeholder. Clicking opens the dropdown menu.'
        },
        {
          number: 3,
          name: 'Selected Value / Placeholder',
          description: 'Displays the currently selected option label or placeholder text when no option is selected.'
        },
        {
          number: 4,
          name: 'Chevron Icon',
          description: 'Visual indicator showing the dropdown state. Rotates when the dropdown is open.'
        },
        {
          number: 5,
          name: 'Dropdown Menu',
          description: 'Container that appears below the select button, displaying the list of available options.'
        },
        {
          number: 6,
          name: 'Option Items',
          description: 'Individual selectable items in the dropdown. Can include icons, avatars, or text labels.'
        },
        {
          number: 7,
          name: 'Search Input (Optional)',
          description: 'When searchable variant is enabled, displays a search field at the top of the dropdown for filtering options.'
        },
        {
          number: 8,
          name: 'Helper Text / Error Message',
          description: 'Text displayed below the select providing guidance or error feedback.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard select with text labels only. Most common variant for general selection needs.'
        },
        {
          name: 'Icon',
          description: 'Select with icons displayed next to option labels. Useful for visual categorization or identification.'
        },
        {
          name: 'Avatar',
          description: 'Select with avatar images for options. Commonly used for user selection, team member selection, or profile-based choices.'
        },
        {
          name: 'Search',
          description: 'Select with search functionality to filter options. Ideal for large option lists where users need to quickly find specific items.'
        },
        {
          name: 'Tags',
          description: 'Select that displays selected values as removable tags. Useful for multi-select scenarios or when selected values need to be prominently displayed.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state with neutral border color. Placeholder text is visible when no option is selected.'
        },
        {
          name: 'Placeholder',
          description: 'Empty select showing placeholder text in a lighter color. Provides guidance on what should be selected.'
        },
        {
          name: 'Selected',
          description: 'Select containing a selected value. Displays the selected option label and may show icon or avatar if variant supports it.'
        },
        {
          name: 'Hover',
          description: 'User hovers over the select button. Border color darkens slightly to indicate interactivity.'
        },
        {
          name: 'Focused',
          description: 'Select has keyboard focus. Shows primary color border and focus ring. Dropdown may open automatically.'
        },
        {
          name: 'Open',
          description: 'Dropdown menu is visible and displaying options. Select button shows active state styling.'
        },
        {
          name: 'Error',
          description: 'Select is in an error state (e.g., required field not filled). Red border and error message displayed below.'
        },
        {
          name: 'Disabled',
          description: 'Select is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or open dropdown.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting height, padding, and font size. 3XS (24px) to LG (44px).'
        },
        {
          name: 'variant',
          type: '"default" | "icon" | "avatar" | "search" | "tags"',
          default: '"default"',
          description: 'Visual and functional variant of the select component.'
        },
        {
          name: 'options',
          type: 'Array<SelectOption>',
          description: 'Array of selectable options. Each option includes label, value, and optional icon or avatar.'
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled select value. Use with onChange for controlled components.'
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: 'Callback function invoked when an option is selected.'
        },
        {
          name: 'placeholder',
          type: 'string',
          default: '"Select an option"',
          description: 'Placeholder text shown when no option is selected.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed above the select field.'
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text displayed below the select. Shown when not in error state.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the select is in an error state. Shows red border and error styling.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the select when error is true.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the select, preventing user interaction.'
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Whether the select should take full width of its container.'
        },
        {
          name: 'searchable',
          type: 'boolean',
          default: 'false',
          description: 'Enables search functionality to filter options in the dropdown.'
        },
        {
          name: 'searchPlaceholder',
          type: 'string',
          default: '"Search..."',
          description: 'Placeholder text for the search input when searchable is enabled.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use appropriate size variants based on form density and importance (MD for most cases)',
          'Provide clear, descriptive placeholder text that indicates what should be selected',
          'Use labels for all selects to improve accessibility',
          'Enable search functionality when there are more than 10 options',
          'Use icon or avatar variants when visual identification is helpful',
          'Group related options logically in the options array',
          'Show error messages immediately after validation fails',
          'Use consistent option labels that are clear and concise',
          'Provide helper text for complex selections or when format guidance is needed',
          'Ensure placeholder text is distinguishable from selected values'
        ],
        dont: [
          'Don\'t use placeholder text as the only label (always include a visible label)',
          'Don\'t use error states for validation that hasn\'t occurred yet',
          'Don\'t use select for navigation between pages',
          'Don\'t use select when there are only 2-3 options (use radio buttons or toggle instead)',
          'Don\'t disable options without clear indication of why',
          'Don\'t use overly long option labels that truncate',
          'Don\'t mix different option formats in the same select (e.g., some with icons, some without)',
          'Don\'t use select for multi-select scenarios without proper multi-select component',
          'Don\'t truncate error messages (allow them to wrap or expand)',
          'Don\'t use search variant unnecessarily for small option lists'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the select button',
          'Enter or Space key opens/closes the dropdown',
          'Arrow keys navigate through options when dropdown is open',
          'Escape key closes the dropdown without selecting',
          'Type-ahead works for quick option selection when dropdown is open',
          'Home/End keys jump to first/last option in the dropdown'
        ],
        screenReader: [
          'Label is announced when select receives focus',
          'Placeholder text is announced as a hint when no option is selected',
          'Selected value is announced when an option is chosen',
          'Error state and error message are announced when present',
          'Helper text is announced when select receives focus',
          'Disabled state is announced as "disabled" or "unavailable"',
          'Required state is announced if select is marked as required',
          'Dropdown open/closed state is announced',
          'Option count and current selection are announced when navigating'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for selects without visible labels',
          'aria-describedby linking to helper text or error message',
          'aria-invalid="true" when select is in error state',
          'aria-disabled="true" when select is disabled',
          'aria-required="true" for required selects',
          'aria-expanded on select button indicating dropdown state',
          'role="combobox" or role="listbox" for proper ARIA semantics',
          'aria-activedescendant for keyboard navigation within dropdown'
        ]
      }}
      relatedComponents={[
        'Input',
        'MultiSelect',
        'Dropdown',
        'Radio',
        'Checkbox',
        'Form'
      ]}
      figmaDocumentation={{
        title: 'Select Component Documentation',
        description: 'Complete visual reference showing all select sizes, variants, states, and configurations from the design system. Includes examples of all interactive states and special features.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=61-115801',
        figmaNodeId: '61-115801',
      }}
      examples={[
        {
          title: 'Select with Dropdown',
          description: 'A standard select component with a dropdown menu displaying available options. The dropdown appears below the select button when clicked, providing a clear list of choices for the user to select from.',
          media: {
            type: 'image',
            url: '/examples/select/Select with Dropdown.png',
            alt: 'Select component with dropdown menu open',
          },
          tags: ['dropdown', 'options', 'interaction'],
          critique: 'The dropdown provides a clean and organized way to display options. The visual separation between the select button and dropdown menu helps users understand the interaction. The dropdown should close when clicking outside or selecting an option for better UX.',
        },
        {
          title: 'Multi-select with Dropdown',
          description: 'A select component that allows users to choose multiple options from a dropdown list. Selected items are typically displayed as tags or chips, making it easy to see what has been selected while keeping the interface clean.',
          media: {
            type: 'image',
            url: '/examples/select/Multi-select with dropdown.png',
            alt: 'Multi-select component with dropdown showing multiple selected options',
          },
          tags: ['multi-select', 'multiple', 'tags', 'chips'],
          critique: 'Multi-select functionality is essential for scenarios where users need to select multiple options. The visual representation of selected items helps users track their choices. Consider adding a "Select All" option and clear visual feedback when options are selected or deselected.',
        },
        {
          title: 'AI Suggested Options',
          description: 'A select component enhanced with AI-powered suggestions that intelligently recommend options based on context, user behavior, or input patterns. The AI suggestions appear in the dropdown, helping users make faster and more relevant selections.',
          media: {
            type: 'image',
            url: '/examples/select/AI Suggested Options.png',
            alt: 'Select component with AI-suggested options in dropdown',
          },
          tags: ['ai', 'suggestions', 'intelligent', 'context-aware'],
          critique: 'AI-powered suggestions can significantly improve user experience by reducing the time needed to find the right option. The suggestions should be clearly labeled as AI-generated and allow users to easily dismiss or override them. The AI should learn from user selections to improve suggestions over time.',
        },
        {
          title: 'AI Suggested Options (Enhanced)',
          description: 'An advanced version of AI-suggested select options with more sophisticated recommendation algorithms. This implementation may include contextual understanding, user preference learning, and predictive selection based on previous patterns.',
          media: {
            type: 'image',
            url: '/examples/select/AI Suggested Options 2.png',
            alt: 'Enhanced select component with advanced AI-suggested options',
          },
          tags: ['ai', 'suggestions', 'enhanced', 'predictive'],
          critique: 'Enhanced AI suggestions provide more intelligent and context-aware recommendations. The system should balance between being helpful and being intrusive. Users should always have full control and be able to see all available options, not just AI suggestions.',
        },
      ]}
    />
  );
};

