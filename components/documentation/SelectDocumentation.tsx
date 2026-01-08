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
          title: 'Searchable Select in Airtable',
          description: 'Airtable uses searchable selects for fields with many options. Users can type to filter options, making it easy to find specific values in large lists.',
          media: {
            type: 'video',
            url: '/examples/select/select-searchable-airtable.mp4',
            alt: 'Searchable select dropdown in Airtable',
            thumbnailUrl: '/examples/select/select-searchable-airtable-thumb.png',
          },
          productName: 'Airtable',
          productUrl: 'https://airtable.com',
          tags: ['searchable', 'filter', 'large-lists', 'autocomplete'],
          critique: 'The search functionality makes it easy to find options in large lists. The filtering happens in real-time as you type. However, the search could benefit from keyboard shortcuts and recent selections.',
          highLevelApplication: 'HighLevel could use searchable selects for fields with many options like country selection, category selection, or tag assignment. We should enable search when there are more than 10 options and provide keyboard navigation.',
        },
        {
          title: 'Avatar Select in Slack',
          description: 'Slack uses avatar selects for choosing team members or channels. The avatars provide visual context, making it easier to identify options at a glance.',
          media: {
            type: 'image',
            url: '/examples/select/select-avatar-slack.png',
            alt: 'Avatar select for team members in Slack',
          },
          productName: 'Slack',
          productUrl: 'https://slack.com',
          tags: ['avatar', 'visual', 'user-selection', 'identification'],
          critique: 'Avatars make it easy to identify team members quickly. The visual representation is more intuitive than text alone. However, the select could benefit from search functionality when there are many team members.',
          highLevelApplication: 'HighLevel could use avatar selects for assigning tasks to team members, selecting contacts, or choosing from a list of users. We should ensure avatars load quickly and have fallbacks for missing images.',
        },
        {
          title: 'Icon Select in Notion',
          description: 'Notion uses icon selects for choosing page icons. The icons are displayed in a grid layout, making visual selection intuitive and fast.',
          media: {
            type: 'gif',
            url: '/examples/select/select-icon-notion.gif',
            alt: 'Icon select dropdown in Notion',
          },
          productName: 'Notion',
          productUrl: 'https://www.notion.so',
          tags: ['icon', 'visual', 'grid', 'quick-selection'],
          critique: 'The icon grid makes visual selection fast and intuitive. The icons are well-organized and easy to scan. However, the grid could benefit from categories or search for large icon sets.',
          highLevelApplication: 'HighLevel could use icon selects for choosing icons for campaigns, funnels, or categories. We should organize icons logically and provide search when there are many options.',
        },
        {
          title: 'Multi-Level Select in Shopify',
          description: 'Shopify uses selects with grouped options for organizing products by category and subcategory. The grouping helps users navigate hierarchical data.',
          media: {
            type: 'image',
            url: '/examples/select/select-grouped-shopify.png',
            alt: 'Grouped select options in Shopify admin',
          },
          productName: 'Shopify',
          productUrl: 'https://www.shopify.com',
          tags: ['grouped', 'hierarchical', 'categories', 'organization'],
          critique: 'Grouped options help organize related items. The visual hierarchy makes it clear which options belong together. However, the groups could be collapsible for better navigation with many categories.',
          highLevelApplication: 'HighLevel could use grouped selects for organizing campaigns by type, contacts by source, or funnels by category. We should maintain clear visual hierarchy and consider collapsible groups for large option sets.',
        },
        {
          title: 'Select with Validation in Typeform',
          description: 'Typeform shows clear validation states on selects. Error messages appear below the select when validation fails, guiding users to correct selections.',
          media: {
            type: 'image',
            url: '/examples/select/select-validation-typeform.png',
            alt: 'Select with validation error in Typeform',
          },
          productName: 'Typeform',
          productUrl: 'https://www.typeform.com',
          tags: ['validation', 'error-states', 'form', 'feedback'],
          critique: 'The validation feedback is clear and helpful. The error message explains what went wrong. However, the validation could happen in real-time as the user interacts with the form.',
          highLevelApplication: 'HighLevel should implement validation for required selects and show clear error messages. We should validate on blur or form submission and provide helpful guidance on what needs to be selected.',
        },
      ]}
    />
  );
};

