import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const ContentSwitcherDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Content Switcher"
      category="Navigation"
      description="A segmented control component that allows users to switch between related content views or options. Displays multiple options in a connected group with clear visual distinction between selected and unselected states. Supports icons, text labels, and icon-only variants."
      whenToUse={[
        'Switching between related views or modes within the same context',
        'Filtering or organizing content by category or type',
        'Selecting a single option from a small set of related choices (2-7 options)',
        'When options are mutually exclusive and should be visually grouped',
        'Providing a compact alternative to radio buttons or dropdowns',
        'Switching between different data views or display formats'
      ]}
      whenNotToUse={[
        'For primary navigation between major application sections (use Tabs or Navigation instead)',
        'When there are more than 7-8 options (consider a Select dropdown or Tabs component)',
        'For actions or commands (use Buttons or Button Groups instead)',
        'When options need to be selected simultaneously (use Checkboxes instead)',
        'For hierarchical navigation (use Sidebar or Menu components)',
        'When options require additional context or descriptions (use Radio Groups or Select instead)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Container',
          description: 'The outer wrapper that groups all switcher items together. Provides border and rounded corners to create a unified control.'
        },
        {
          number: 2,
          name: 'Switcher Item',
          description: 'Individual clickable element representing an option. Can display text, icon, or both. Shows selected or unselected state.'
        },
        {
          number: 3,
          name: 'Item Label',
          description: 'Text content that identifies the option. Displayed alongside or instead of an icon depending on configuration.'
        },
        {
          number: 4,
          name: 'Item Icon (Optional)',
          description: 'Visual symbol displayed before the label or as the only content in icon-only mode. Helps with quick recognition.'
        },
        {
          number: 5,
          name: 'Selected State Indicator',
          description: 'Visual distinction for the active option. Uses purple background and border to clearly indicate selection.'
        },
        {
          number: 6,
          name: 'Divider',
          description: 'Border between items that separates options. Removed on the last item and on selected items for visual clarity.'
        }
      ]}
      variants={[
        {
          name: 'Text Only',
          description: 'Switcher items display only text labels without icons. Most common variant for simple option selection.'
        },
        {
          name: 'Icon with Text',
          description: 'Switcher items combine icons with text labels. Provides both visual and textual context for better clarity.'
        },
        {
          name: 'Icon Only',
          description: 'Switcher items display only icons without text. Useful for space-constrained interfaces or universally recognized icons.'
        },
        {
          name: 'Small Size (3xs, 2xs, xs)',
          description: 'Compact sizing for dense interfaces or secondary controls. Uses smaller padding and font sizes.'
        },
        {
          name: 'Medium Size (sm, md)',
          description: 'Standard sizing for most use cases. Balanced padding and typography for comfortable interaction.'
        },
        {
          name: 'Large Size (lg)',
          description: 'Larger sizing for prominent controls or when touch targets need to be larger. Increased padding and font size.'
        }
      ]}
      states={[
        {
          name: 'Default (Unselected)',
          description: 'Item is not selected and ready for interaction. Displays with white background, gray text, and right border divider.'
        },
        {
          name: 'Hover (Unselected)',
          description: 'User hovers over an unselected item. Background changes to light gray to provide visual feedback.'
        },
        {
          name: 'Selected',
          description: 'Item is currently active. Displays with purple background, purple text, and full border. No divider on selected items.'
        },
        {
          name: 'Hover (Selected)',
          description: 'User hovers over the selected item. Background darkens slightly and border color changes to indicate interactivity.'
        },
        {
          name: 'Disabled',
          description: 'Item is temporarily unavailable. Appears grayed out with reduced opacity. Not interactive and cannot be selected.'
        },
        {
          name: 'Focus',
          description: 'Item receives keyboard focus. Visible focus ring indicates the element can be activated with keyboard navigation.'
        }
      ]}
      props={[
        {
          name: 'items',
          type: 'ContentSwitcherItemData[]',
          description: 'Array of switcher items, each containing id, label, optional icon, and optional disabled state.'
        },
        {
          name: 'size',
          type: '"2xs" | "3xs" | "xs" | "sm" | "md" | "lg"',
          default: '"3xs"',
          description: 'Size variant affecting padding, font size, icon dimensions, and overall height of switcher items.'
        },
        {
          name: 'iconOnly',
          type: 'boolean',
          default: 'false',
          description: 'Whether switcher items should display only icons without text labels. Requires icons to be provided in items.'
        },
        {
          name: 'defaultSelected',
          type: 'string',
          description: 'ID of the item that should be selected by default. If not provided, first item is selected.'
        },
        {
          name: 'onSelectionChange',
          type: '(itemId: string) => void',
          description: 'Callback function invoked when user selects a different item. Receives the selected item ID.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to the container element for custom styling.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use clear, concise labels that accurately describe each option',
          'Keep the number of options between 2-5 for optimal usability',
          'Use icons to enhance recognition, especially for icon-only variants',
          'Maintain consistent sizing across related switchers in the same interface',
          'Provide visual feedback for all interactive states (hover, focus, selected)',
          'Use appropriate size variants based on content density and screen space',
          'Ensure selected state is clearly distinguishable from unselected states',
          'Use icon-only variants when icons are universally recognized or space is limited',
          'Group related options logically and maintain consistent order'
        ],
        dont: [
          'Don\'t use more than 7-8 options (consider Tabs or Select dropdown instead)',
          'Don\'t use for actions or commands (use Buttons or Button Groups instead)',
          'Don\'t use icon-only variants when icons are ambiguous or unfamiliar',
          'Don\'t change option order dynamically based on user actions',
          'Don\'t use for primary navigation (use Tabs or Navigation components)',
          'Don\'t nest content switchers within other switchers',
          'Don\'t use when options need additional context or descriptions',
          'Don\'t disable all options simultaneously (hide the switcher instead)',
          'Don\'t use inconsistent sizing within the same switcher'
        ]
      }}
      accessibility={{
        keyboard: [
          'Arrow keys navigate between items: Left/Right arrows move focus',
          'Enter or Space activates the focused item',
          'Home key jumps to the first item',
          'End key jumps to the last item',
          'Tab key moves focus to the next focusable element after the switcher',
          'Escape key can be used to cancel selection if applicable'
        ],
        screenReader: [
          'Each item is announced with its label, state, and position (e.g., "All, selected, 1 of 3")',
          'Selected state is clearly announced',
          'Disabled items are announced as "unavailable"',
          'The component is identified as a tablist with role="tablist"',
          'Items are identified as tabs with role="tab"',
          'Selected item has aria-selected="true" attribute'
        ],
        ariaHints: [
          'role="tablist" on the container',
          'role="tab" on each item button',
          'aria-selected="true" on the selected item',
          'aria-controls linking items to their corresponding content panels',
          'aria-disabled on disabled items',
          'aria-label or aria-labelledby for the container if needed'
        ]
      }}
      relatedComponents={[
        'Tab',
        'Button',
        'Select',
        'Radio Group',
        'Toggle Group'
      ]}
      figmaDocumentation={{
        title: 'Content Switcher Component Documentation',
        description: 'Complete visual reference showing all content switcher sizes, variants, and states from the design system.',
        figmaUrl: 'https://www.figma.com/design/QSeD9oVn66FWPsndpW6INE/HighRise-AI-1.1?node-id=26901-4400',
        figmaNodeId: '26901:4400',
      }}
      examples={[
        {
          title: 'View Switcher in GitHub',
          description: 'GitHub uses content switchers to switch between different views of repository content (Code, Issues, Pull Requests). The switcher provides a compact way to navigate between related sections.',
          media: {
            type: 'image',
            url: '/examples/content-switcher/switcher-view-github.png',
            alt: 'View switcher in GitHub repository',
          },
          productName: 'GitHub',
          productUrl: 'https://github.com',
          tags: ['view-switching', 'navigation', 'compact'],
          critique: 'The content switcher provides clear visual distinction between selected and unselected states. The options are logically grouped and easy to understand. However, the switcher could benefit from keyboard shortcuts for power users.',
          highLevelApplication: 'HighLevel could use content switchers for switching between different views in dashboards (List, Grid, Calendar), filtering content (All, Active, Archived), or switching between data formats (Table, Chart, Map).',
        },
        {
          title: 'Filter Switcher in Linear',
          description: 'Linear uses content switchers for filtering tasks by status (All, In Progress, Done). The switcher provides quick access to different filter states without opening a dropdown.',
          media: {
            type: 'gif',
            url: '/examples/content-switcher/switcher-filter-linear.gif',
            alt: 'Filter switcher in Linear task view',
          },
          productName: 'Linear',
          productUrl: 'https://linear.app',
          tags: ['filtering', 'status', 'quick-access'],
          critique: 'The content switcher makes filtering quick and intuitive. The visual feedback is clear when switching between states. The compact design saves space compared to dropdown menus.',
          highLevelApplication: 'HighLevel could use content switchers for filtering contacts (All, Active, Inactive), campaigns (All, Active, Paused), or tasks (All, Open, Completed). This provides quick access to common filters.',
        },
        {
          title: 'Display Mode Switcher in Notion',
          description: 'Notion uses content switchers with icons to switch between different display modes (List, Board, Calendar, Gallery). The icons help users quickly identify each view type.',
          media: {
            type: 'image',
            url: '/examples/content-switcher/switcher-display-notion.png',
            alt: 'Display mode switcher in Notion',
          },
          productName: 'Notion',
          productUrl: 'https://www.notion.so',
          tags: ['display-modes', 'icons', 'view-switching'],
          critique: 'The icon-based switcher is intuitive and space-efficient. The icons are universally recognized. However, tooltips could help users understand what each view mode offers before switching.',
          highLevelApplication: 'HighLevel could use icon-based content switchers for switching between different display modes in contact lists, campaign views, or analytics dashboards. We should ensure icons are clear and provide tooltips.',
        },
        {
          title: 'Time Range Switcher in Analytics',
          description: 'Many analytics dashboards use content switchers for selecting time ranges (Today, Week, Month, Year). The switcher provides quick access to common time periods without opening a date picker.',
          media: {
            type: 'image',
            url: '/examples/content-switcher/switcher-time-analytics.png',
            alt: 'Time range switcher in analytics dashboard',
          },
          productName: 'Analytics Dashboard',
          tags: ['time-range', 'filtering', 'analytics'],
          critique: 'The content switcher makes time range selection quick and intuitive. The options are clearly labeled and the selected state is obvious. However, custom date ranges might still require a date picker.',
          highLevelApplication: 'HighLevel could use content switchers for time range selection in analytics dashboards, reports, and activity views. We should provide common ranges (Today, Week, Month, Year) and allow custom ranges via date picker.',
        },
      ]}
    />
  );
};
