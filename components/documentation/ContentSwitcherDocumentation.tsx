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
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=4-290512',
        figmaNodeId: '4:290512',
      }}
      examples={[
        {
          title: 'As a Form Element',
          description: 'Content switcher used as a form element to select between different options or values. This pattern integrates seamlessly into forms, providing a compact and intuitive way for users to make selections without using dropdowns or radio buttons. The visual grouping helps users understand that these options are related and mutually exclusive.',
          media: {
            type: 'image',
            url: '/examples/content-switcher/As a Form Element.png',
            alt: 'Content switcher used as a form element',
          },
          tags: ['form', 'selection', 'input'],
        },
        {
          title: 'Different Actions in Text Area',
          description: 'Content switcher integrated within a text area interface to switch between different action modes or content types. This pattern allows users to quickly toggle between related functionalities without leaving the text input context, providing a seamless editing experience with multiple action options.',
          media: {
            type: 'image',
            url: '/examples/content-switcher/Different actions in Text Area.png',
            alt: 'Content switcher showing different actions in text area',
          },
          tags: ['text-area', 'actions', 'modes'],
        },
        {
          title: 'Rating Feedback',
          description: 'Content switcher used for rating and feedback collection, allowing users to select their rating level or feedback category. This pattern provides an intuitive way to capture user sentiment or satisfaction levels through a visually connected set of options, making it easy for users to express their opinions.',
          media: {
            type: 'image',
            url: '/examples/content-switcher/Rating/Feedback.png',
            alt: 'Content switcher for rating and feedback',
          },
          tags: ['rating', 'feedback', 'evaluation'],
        },
      ]}
    />
  );
};
