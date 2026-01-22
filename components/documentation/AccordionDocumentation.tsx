import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const AccordionDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Accordion"
      category="Content"
      description="A collapsible content component for organizing and displaying information in expandable sections. Supports single or multiple panel expansion, keyboard navigation, and comprehensive accessibility features."
      whenToUse={[
        'Organizing related content into distinct, collapsible sections',
        'Displaying FAQs or help documentation where users may only need specific information',
        'Conserving vertical space while keeping content accessible',
        'Grouping settings or configuration options into logical categories',
        'Presenting hierarchical information that can be progressively disclosed',
        'When users need to compare content across multiple sections (multiple expansion mode)',
        'Organizing long forms or content-heavy pages into manageable sections'
      ]}
      whenNotToUse={[
        'For critical information that must be immediately visible without interaction',
        'When all content needs to be visible simultaneously for comparison',
        'For primary navigation between major sections (use Navigation or Tabs instead)',
        'When there are only 1-2 sections (consider displaying content directly)',
        'For sequential workflows requiring linear progression',
        'When accordion items would require horizontal scrolling on mobile',
        'For actions or commands (use buttons or menus instead)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Accordion Container',
          description: 'The wrapper that holds all accordion items. Manages overall layout and spacing between items.'
        },
        {
          number: 2,
          name: 'Accordion Header',
          description: 'Clickable button that toggles the visibility of the content panel. Contains the header text and expand/collapse icon.'
        },
        {
          number: 3,
          name: 'Header Label',
          description: 'Text content that describes what information is contained in the accordion panel. Should be clear and descriptive.'
        },
        {
          number: 4,
          name: 'Expand/Collapse Icon',
          description: 'Visual indicator (typically a chevron) that rotates to show the current state. Points down when expanded, right when collapsed.'
        },
        {
          number: 5,
          name: 'Content Panel',
          description: 'The collapsible content area that appears when the accordion item is expanded. Contains the actual content or information.'
        },
        {
          number: 6,
          name: 'Border Separator',
          description: 'Visual divider between accordion items and between header and content. Helps distinguish individual sections.'
        },
        {
          number: 7,
          name: 'Focus Ring',
          description: 'Visual indicator shown when accordion header receives keyboard focus. Ensures accessibility compliance.'
        }
      ]}
      variants={[
        {
          name: 'Single Expansion',
          description: 'Only one panel can be open at a time. Opening a new panel automatically closes the previously open one. Ideal for FAQs and mutually exclusive content.'
        },
        {
          name: 'Multiple Expansion',
          description: 'Multiple panels can be open simultaneously. Users can expand several sections to compare content or view related information together.'
        },
        {
          name: 'Allow Collapse All',
          description: 'When enabled, users can collapse all panels. When disabled, at least one panel must remain open (typically the first enabled item).'
        },
        {
          name: 'Default Expanded',
          description: 'Specific panels can be set to expand by default, either through individual item props or a defaultExpanded array prop.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Accordion item is collapsed and ready for interaction. Header displays with neutral styling, chevron points right.'
        },
        {
          name: 'Expanded',
          description: 'Accordion item is open and content panel is visible. Header maintains styling, chevron rotates to point down. Content animates in smoothly.'
        },
        {
          name: 'Hover',
          description: 'User hovers over the accordion header. Background color changes to provide visual feedback that the element is interactive.'
        },
        {
          name: 'Focused',
          description: 'Accordion header receives keyboard focus. Visible focus ring appears around the header button for accessibility.'
        },
        {
          name: 'Disabled',
          description: 'Accordion item is temporarily unavailable. Appears grayed out with reduced opacity. Not interactive and cannot be expanded.'
        }
      ]}
      props={[
        {
          name: 'items',
          type: 'AccordionItem[]',
          description: 'Array of accordion items, each containing id, header, content, and optional properties (disabled, defaultExpanded).'
        },
        {
          name: 'type',
          type: '"single" | "multiple"',
          default: '"single"',
          description: 'Whether only one panel can be open at a time (single) or multiple panels can be open simultaneously (multiple).'
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: 'Size variant affecting padding, font size, and icon dimensions. SM (compact) to XL (spacious).'
        },
        {
          name: 'allowCollapseAll',
          type: 'boolean',
          default: 'true',
          description: 'Whether all panels can be collapsed. When false, at least one panel must remain open (typically the first enabled item).'
        },
        {
          name: 'defaultExpanded',
          type: 'string[]',
          description: 'Array of item IDs that should be expanded by default. Overrides individual item defaultExpanded props.'
        },
        {
          name: 'onExpandedChange',
          type: '(expandedIds: string[]) => void',
          description: 'Callback function invoked when the set of expanded panels changes. Receives array of currently expanded item IDs.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the accordion container. Allows layout and spacing customization.'
        },
        {
          name: 'headerClassName',
          type: 'string',
          description: 'Custom CSS classes applied to all accordion headers. Allows styling customization for headers.'
        },
        {
          name: 'contentClassName',
          type: 'string',
          description: 'Custom CSS classes applied to all accordion content panels. Allows styling customization for content areas.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use clear, descriptive headers that accurately describe the content within each panel',
          'Keep accordion items logically grouped and related to each other',
          'Use single expansion mode for FAQs and mutually exclusive content',
          'Use multiple expansion mode when users may want to compare content across sections',
          'Set appropriate default expanded items to show the most important or commonly accessed content',
          'Ensure headers are concise but informative (typically 1-5 words)',
          'Use consistent sizing within the same accordion',
          'Provide smooth animations for expand/collapse transitions',
          'Consider mobile responsiveness when designing accordion layouts',
          'Use disabled state sparingly and provide clear indication of why content is unavailable'
        ],
        dont: [
          'Don\'t hide critical information behind accordion panels that users must see immediately',
          'Don\'t use accordions for primary navigation (use Navigation or Tabs instead)',
          'Don\'t nest accordions within accordions (can cause confusion and accessibility issues)',
          'Don\'t use vague or ambiguous header labels',
          'Don\'t create accordions with too many items (consider pagination or alternative patterns)',
          'Don\'t disable accordion items without clear indication of why',
          'Don\'t use accordions when all content should be visible simultaneously',
          'Don\'t mix single and multiple expansion behaviors in the same accordion',
          'Don\'t use accordions for actions or commands (use buttons or menus instead)',
          'Don\'t make accordion headers too long (they should fit on one line)'
        ]
      }}
      accessibility={{
        keyboard: [
          'Enter or Space key toggles the expansion state of the focused accordion header',
          'Arrow Down moves focus to the next accordion header',
          'Arrow Up moves focus to the previous accordion header',
          'Home key moves focus to the first accordion header',
          'End key moves focus to the last accordion header',
          'Tab key moves focus to the next interactive element outside the accordion',
          'Shift + Tab moves focus to the previous interactive element',
          'Focus ring is visible for keyboard navigation'
        ],
        screenReader: [
          'Accordion header is announced with its label and current state (expanded or collapsed)',
          'Content panel is associated with its header via aria-labelledby',
          'Expanded state is announced when panel opens or closes',
          'Disabled accordion items are announced as unavailable',
          'Accordion structure is communicated through proper ARIA roles and properties',
          'Screen readers can navigate between accordion headers using arrow keys'
        ],
        ariaHints: [
          'role="region" on the accordion container',
          'role="button" is implicit for native button elements used as headers',
          'aria-expanded="true/false" on each accordion header indicating current state',
          'aria-controls linking each header to its content panel',
          'aria-labelledby on content panels linking back to their headers',
          'aria-disabled on disabled accordion items',
          'role="region" on content panels for better screen reader support'
        ]
      }}
      relatedComponents={[
        'Tabs',
        'Dropdown',
        'Collapsible',
        'Sidebar',
        'Navigation'
      ]}
      figmaDocumentation={{
        title: 'Accordion Component Documentation',
        description: 'Complete visual reference showing all accordion variants, sizes, states, and configurations from the design system. Includes examples of single and multiple expansion modes, different sizes, and all interactive states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=68-46906',
        figmaNodeId: '68:46906',
      }}
      examples={[
        {
          title: 'Accordion - Collapsed State',
          description: 'Accordion component in its default collapsed state, showing multiple sections with clear headers and chevron indicators. This state conserves vertical space while keeping all section titles visible, allowing users to quickly scan available content and choose which sections to expand. The collapsed state is ideal for content-heavy pages where users may only need specific information.',
          media: {
            type: 'image',
            url: '/examples/accordion/Accordion - Collapsed.png',
            alt: 'Accordion component showing collapsed state with multiple sections',
          },
          tags: ['collapsed', 'default-state', 'space-efficient'],
          critique: 'The collapsed accordion effectively organizes content into scannable sections. The clear headers and consistent chevron indicators provide visual hierarchy and communicate the collapsible nature of each section. The spacing between items helps distinguish individual sections, and the neutral styling ensures the component doesn\'t compete with other page elements for attention.',
        },
        {
          title: 'Accordion - Expanded with Slot & Footer',
          description: 'Accordion component in expanded state, demonstrating the use of content slots and footer sections within accordion panels. This example shows how accordions can accommodate rich content layouts with custom footer actions or additional information. The expanded panel reveals the full content while maintaining clear visual separation from other accordion items.',
          media: {
            type: 'image',
            url: '/examples/accordion/Accordion - Expanded with Slot & Footer.png',
            alt: 'Accordion component expanded showing content with slot and footer sections',
          },
          tags: ['expanded', 'slots', 'footer', 'rich-content'],
          critique: 'The expanded accordion with slots and footer demonstrates flexibility in content organization. The footer section provides a clear area for actions or additional context without cluttering the main content. The visual separation between content and footer helps users distinguish between informational content and actionable elements. The smooth expansion animation and clear borders maintain visual hierarchy.',
        },
        {
          title: 'ToDos Accordion - Completed State',
          description: 'Specialized accordion implementation for managing todo items, showing completed tasks with visual indicators. This example demonstrates how accordions can be enhanced with additional functionality like checkboxes, completion tracking, and status indicators. The accordion organizes todos into logical groups while providing clear visual feedback on completion status.',
          media: {
            type: 'image',
            url: '/examples/accordion/ToDos Accordion - Completed.png',
            alt: 'ToDos accordion showing completed tasks with checkboxes and status indicators',
          },
          tags: ['todos', 'completed', 'task-management', 'checkboxes'],
          critique: 'The todos accordion effectively combines the space-saving benefits of accordions with task management functionality. The completion indicators provide immediate visual feedback, and the checkbox pattern is familiar and intuitive. The grouping of todos into accordion sections helps users organize tasks by category or project. The completed state styling (strikethrough, reduced opacity) clearly communicates task status without removing the items from view.',
        },
      ]}
    />
  );
};
