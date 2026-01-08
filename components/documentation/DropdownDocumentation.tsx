import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const DropdownDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Dropdown"
      category="Form"
      description="A flexible dropdown menu component that displays a list of options in a popup menu. Supports multiple sizes, variants with icons and avatars, checkboxes, descriptions, tags, search functionality, and tree structures."
      whenToUse={[
        'Displaying a list of actions or options in a compact menu',
        'Context menus and action menus triggered by buttons or icons',
        'Selecting from a list of options when space is limited',
        'Providing additional actions or settings in a toolbar or header',
        'Creating hierarchical menus with nested options (tree structure)',
        'When you need more flexibility than a Select component (custom items, headers, footers)',
        'Multi-select scenarios with checkboxes',
        'Menus that need to display rich content (descriptions, tags, avatars)'
      ]}
      whenNotToUse={[
        'For simple single-select form inputs (use Select component instead)',
        'For navigation between pages (use Navigation or Menu components)',
        'When options are always visible (use a list or button group instead)',
        'For selecting dates or times (use DatePicker or TimePicker instead)',
        'When there are only 2-3 options (consider using Radio buttons or Toggle)',
        'For text input (use Input component instead)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Trigger',
          description: 'The element that opens the dropdown menu. Can be a button, icon, or custom element.'
        },
        {
          number: 2,
          name: 'Dropdown Menu',
          description: 'Container that appears when the trigger is activated, displaying the list of options.'
        },
        {
          number: 3,
          name: 'Header Slot (Optional)',
          description: 'Custom content displayed at the top of the dropdown menu, before the options list.'
        },
        {
          number: 4,
          name: 'Search Input (Optional)',
          description: 'When searchable is enabled, displays a search field for filtering options.'
        },
        {
          number: 5,
          name: 'Menu Items',
          description: 'Individual selectable items in the dropdown. Can include icons, avatars, checkboxes, descriptions, tags, and more.'
        },
        {
          number: 6,
          name: 'Footer Slot (Optional)',
          description: 'Custom content displayed at the bottom of the dropdown menu, after the options list.'
        },
        {
          number: 7,
          name: 'Leading Icon (Optional)',
          description: 'Icon displayed at the start of a menu item, before the label.'
        },
        {
          number: 8,
          name: 'Trailing Icon (Optional)',
          description: 'Icon displayed at the end of a menu item, after the label.'
        },
        {
          number: 9,
          name: 'Checkbox (Optional)',
          description: 'Checkbox displayed at the start of a menu item for multi-select scenarios.'
        },
        {
          number: 10,
          name: 'Description (Optional)',
          description: 'Additional text displayed below the label, providing more context about the option.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard dropdown with text labels. Most common variant for general menu needs.'
        },
        {
          name: 'With Icons',
          description: 'Dropdown items with leading or trailing icons. Useful for visual identification or action indication.'
        },
        {
          name: 'With Avatars',
          description: 'Dropdown items with avatar images. Commonly used for user selection or profile-based choices.'
        },
        {
          name: 'With Checkboxes',
          description: 'Dropdown items with checkboxes for multi-select scenarios. Users can select multiple options.'
        },
        {
          name: 'With Descriptions',
          description: 'Dropdown items with description text below the label. Provides additional context or details.'
        },
        {
          name: 'With Tags',
          description: 'Dropdown items with tags displayed next to the label. Useful for categorization or metadata.'
        },
        {
          name: 'Tree Select',
          description: 'Dropdown with hierarchical structure for nested options. Supports parent-child relationships.'
        },
        {
          name: 'Tree',
          description: 'Dropdown with tree structure that can expand/collapse nested items. Useful for complex hierarchies.'
        },
        {
          name: 'Searchable',
          description: 'Dropdown with search functionality to filter options. Ideal for large option lists.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state with dropdown menu closed. Trigger is visible and interactive.'
        },
        {
          name: 'Open',
          description: 'Dropdown menu is visible and displaying options. Trigger shows active state styling.'
        },
        {
          name: 'Hover',
          description: 'User hovers over a menu item. Item background changes to indicate interactivity.'
        },
        {
          name: 'Selected',
          description: 'Menu item is selected. Shows selected indicator (checkmark or highlighted background).'
        },
        {
          name: 'Active',
          description: 'Menu item is currently being activated (clicked). Shows active state styling.'
        },
        {
          name: 'Disabled',
          description: 'Menu item is not interactive. Grayed out appearance with reduced opacity.'
        },
        {
          name: 'Searching',
          description: 'When searchable is enabled and user is typing. Options are filtered based on search query.'
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
          name: 'type',
          type: '"default" | "tree-select" | "tree" | "tree-floating"',
          default: '"default"',
          description: 'Type of dropdown structure. Tree variants support hierarchical/nested options.'
        },
        {
          name: 'options',
          type: 'Array<DropdownOption>',
          description: 'Array of dropdown options. Each option includes label, value, and optional properties like icons, avatars, descriptions, etc.'
        },
        {
          name: 'value',
          type: 'string | string[]',
          description: 'Controlled dropdown value. Use string for single-select, array for multi-select.'
        },
        {
          name: 'onChange',
          type: '(value: string | string[]) => void',
          description: 'Callback function invoked when an option is selected.'
        },
        {
          name: 'placeholder',
          type: 'string',
          default: '"Select an option"',
          description: 'Placeholder text shown when no option is selected (only for default trigger).'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed above the dropdown trigger.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the dropdown, preventing user interaction.'
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Whether the dropdown should take full width of its container.'
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
        },
        {
          name: 'searchValue',
          type: 'string',
          description: 'Controlled search value. Use with onSearchChange for controlled search.'
        },
        {
          name: 'onSearchChange',
          type: '(value: string) => void',
          description: 'Callback function invoked when search input value changes.'
        },
        {
          name: 'maxHeight',
          type: 'string',
          default: '"max-h-60"',
          description: 'Maximum height of the dropdown menu. Options list will scroll if content exceeds this height.'
        },
        {
          name: 'header',
          type: 'React.ReactNode',
          description: 'Custom content displayed at the top of the dropdown menu.'
        },
        {
          name: 'footer',
          type: 'React.ReactNode',
          description: 'Custom content displayed at the bottom of the dropdown menu.'
        },
        {
          name: 'customItems',
          type: 'React.ReactNode',
          description: 'Custom menu items to insert before the options list. Useful for dividers, group titles, or special items.'
        },
        {
          name: 'trigger',
          type: 'React.ReactNode',
          description: 'Custom trigger element. If not provided, a default button trigger is used.'
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'Controlled open state. Use with onOpenChange for controlled dropdown.'
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback function invoked when dropdown open state changes.'
        },
        {
          name: 'align',
          type: '"left" | "right" | "center"',
          default: '"left"',
          description: 'Horizontal alignment of the dropdown menu relative to the trigger.'
        },
        {
          name: 'position',
          type: '"bottom" | "top"',
          default: '"bottom"',
          description: 'Vertical position of the dropdown menu relative to the trigger.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use appropriate size variants based on context and importance (MD for most cases)',
          'Provide clear, descriptive labels for menu items',
          'Use icons or avatars when visual identification is helpful',
          'Enable search functionality when there are more than 10 options',
          'Use checkboxes for multi-select scenarios',
          'Group related options logically',
          'Use descriptions to provide additional context when needed',
          'Use custom header/footer slots for actions or additional information',
          'Ensure menu items are keyboard accessible',
          'Use tree variants for hierarchical data structures'
        ],
        dont: [
          'Don\'t use dropdown for navigation between pages',
          'Don\'t use dropdown when options should always be visible',
          'Don\'t use dropdown for simple form selects (use Select component instead)',
          'Don\'t nest dropdowns too deeply (max 2-3 levels recommended)',
          'Don\'t disable options without clear indication of why',
          'Don\'t use overly long menu item labels that truncate',
          'Don\'t use dropdown when there are only 2-3 options (use radio buttons or toggle instead)',
          'Don\'t forget to handle keyboard navigation',
          'Don\'t use custom items that break the visual consistency',
          'Don\'t use dropdown for text input'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the dropdown trigger',
          'Enter or Space key opens/closes the dropdown',
          'Arrow keys navigate through options when dropdown is open',
          'Escape key closes the dropdown without selecting',
          'Type-ahead works for quick option selection when dropdown is open',
          'Home/End keys jump to first/last option in the dropdown',
          'Enter key selects the focused option'
        ],
        screenReader: [
          'Trigger button announces dropdown state (open/closed)',
          'Menu items are announced when navigating',
          'Selected state is announced for selected items',
          'Disabled state is announced for disabled items',
          'Search input is announced when searchable is enabled',
          'Option count and current selection are announced when navigating',
          'Descriptions and additional information are announced'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for dropdowns without visible labels',
          'aria-expanded on trigger indicating dropdown state',
          'role="menu" on dropdown container',
          'role="menuitem" on menu items',
          'aria-selected for selected items',
          'aria-checked for checkbox items',
          'aria-disabled for disabled items'
        ]
      }}
      relatedComponents={[
        'Select',
        'Button',
        'Input',
        'Checkbox',
        'Radio',
        'Menu'
      ]}
      figmaDocumentation={{
        title: 'Dropdown Component Documentation',
        description: 'Complete visual reference showing all dropdown sizes, variants, states, and configurations from the design system. Includes examples of all interactive states and special features.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=97-339595',
        figmaNodeId: '97-339595',
      }}
      examples={[
        {
          title: 'Context Menu in VS Code',
          description: 'VS Code uses dropdown menus for context menus that appear on right-click. The menus are compact, keyboard accessible, and support icons for quick visual identification.',
          media: {
            type: 'image',
            url: '/examples/dropdown/dropdown-context-vscode.png',
            alt: 'Context menu dropdown in VS Code',
          },
          productName: 'VS Code',
          productUrl: 'https://code.visualstudio.com',
          tags: ['context-menu', 'keyboard-navigation', 'icons'],
          critique: 'The context menu is well-organized with clear visual hierarchy. Icons help identify actions quickly. However, the menu could benefit from keyboard shortcuts displayed next to items.',
          highLevelApplication: 'HighLevel could use dropdown menus for context actions on items like contacts, campaigns, or funnels. We should ensure keyboard accessibility and use icons for common actions.',
        },
        {
          title: 'Action Menu in Notion',
          description: 'Notion uses dropdown menus for action buttons (three dots menu). The menus support icons, descriptions, and dividers to organize related actions.',
          media: {
            type: 'image',
            url: '/examples/dropdown/dropdown-actions-notion.png',
            alt: 'Action menu dropdown in Notion',
          },
          productName: 'Notion',
          productUrl: 'https://www.notion.so',
          tags: ['actions', 'icons', 'dividers', 'organization'],
          critique: 'The action menu is well-organized with clear sections and dividers. Icons make actions easy to identify. However, the menu could benefit from keyboard shortcuts.',
          highLevelApplication: 'HighLevel could use dropdown menus for action buttons in toolbars or item cards. We should organize actions logically with dividers and use icons for visual identification.',
        },
        {
          title: 'Multi-Select Dropdown in Airtable',
          description: 'Airtable uses dropdown menus with checkboxes for multi-select fields. Users can select multiple options, and selected items are clearly indicated.',
          media: {
            type: 'image',
            url: '/examples/dropdown/dropdown-multiselect-airtable.png',
            alt: 'Multi-select dropdown with checkboxes in Airtable',
          },
          productName: 'Airtable',
          productUrl: 'https://airtable.com',
          tags: ['multiselect', 'checkboxes', 'selection'],
          critique: 'The multi-select dropdown clearly shows selected items with checkboxes. The selection state is easy to understand. However, the dropdown could show selected count in the trigger.',
          highLevelApplication: 'HighLevel could use multi-select dropdowns for tagging, categorization, or assigning multiple values. We should clearly indicate selected items and show selection count.',
        },
        {
          title: 'Searchable Dropdown in Linear',
          description: 'Linear uses searchable dropdown menus for quick selection. Users can type to filter options, making it easy to find specific items in large lists.',
          media: {
            type: 'gif',
            url: '/examples/dropdown/dropdown-search-linear.gif',
            alt: 'Searchable dropdown in Linear',
          },
          productName: 'Linear',
          productUrl: 'https://linear.app',
          tags: ['searchable', 'filter', 'quick-selection'],
          critique: 'The search functionality makes it easy to find options quickly. The filtering happens in real-time. However, the search could benefit from keyboard shortcuts for common actions.',
          highLevelApplication: 'HighLevel could use searchable dropdowns for selecting from large lists like contacts, campaigns, or templates. We should enable search when there are more than 10 options.',
        },
        {
          title: 'Tree Dropdown in Figma',
          description: 'Figma uses tree-structured dropdowns for selecting layers or components. The tree structure supports nested items and expand/collapse functionality.',
          media: {
            type: 'image',
            url: '/examples/dropdown/dropdown-tree-figma.png',
            alt: 'Tree dropdown in Figma',
          },
          productName: 'Figma',
          productUrl: 'https://www.figma.com',
          tags: ['tree', 'hierarchical', 'nested'],
          critique: 'The tree structure makes it easy to navigate hierarchical data. The expand/collapse functionality is intuitive. However, deep nesting can make navigation complex.',
          highLevelApplication: 'HighLevel could use tree dropdowns for selecting nested categories, folders, or hierarchical data. We should limit nesting depth and provide clear visual hierarchy.',
        },
      ]}
    />
  );
};
