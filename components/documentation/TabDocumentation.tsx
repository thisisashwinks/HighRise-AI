import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const TabDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Tab"
      category="Navigation"
      description="A flexible tab component that organizes content into distinct sections. Supports multiple visual styles (Line, Segment, No Border), placements (Top, Bottom, Left, Right), sizes, and optional features like icons, badges, dropdowns, and removable tabs."
      whenToUse={[
        'Organizing related content into distinct, switchable sections',
        'Presenting multiple views or modes within the same context',
        'When users need to navigate between different data sets or filters',
        'Separating content that doesn\'t need to be visible simultaneously',
        'Providing a compact navigation pattern for secondary content areas',
        'When tab items need additional functionality like dropdowns or removal'
      ]}
      whenNotToUse={[
        'For primary navigation between major application sections',
        'When all content should be visible at once for comparison',
        'For sequential workflows requiring linear progression',
        'When there are more than 7-8 tabs (consider alternative patterns like dropdown)',
        'For actions or commands (use buttons or menus instead)',
        'When tabs would require horizontal scrolling on mobile devices'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Tab Container',
          description: 'The wrapper that holds all tab items. Manages layout direction (horizontal or vertical) and spacing between tabs.'
        },
        {
          number: 2,
          name: 'Tab Item',
          description: 'Individual clickable element representing a tab. Contains label, optional icon, badge, and interactive elements.'
        },
        {
          number: 3,
          name: 'Tab Label',
          description: 'Text content that identifies the tab. Can be accompanied by an icon or displayed as icon-only.'
        },
        {
          number: 4,
          name: 'Active Indicator',
          description: 'Visual marker that highlights the currently selected tab. Varies by type: underline for Line, background for Segment, or accent color for No Border.'
        },
        {
          number: 5,
          name: 'Icon (Optional)',
          description: 'Visual symbol displayed before or instead of text. Can be used alone (icon-only mode) or alongside text.'
        },
        {
          number: 6,
          name: 'Badge/Count (Optional)',
          description: 'Small indicator showing numeric count or status badge. Positioned adjacent to the label or icon.'
        },
        {
          number: 7,
          name: 'Remove Button (Optional)',
          description: 'Close icon that allows users to remove/dismiss a tab. Only shown when removable prop is enabled.'
        },
        {
          number: 8,
          name: 'Dropdown Menu (Optional)',
          description: 'Context menu that appears on hover or click, providing additional actions for the tab. Configurable trigger behavior.'
        },
        {
          number: 9,
          name: 'New Tab Button (Optional)',
          description: 'Action button at the start of the tab list that allows creating new tabs. Can display text or icon-only.'
        },
        {
          number: 10,
          name: 'End Actions (Optional)',
          description: 'Action buttons positioned at the end of the tab list. Supports multiple actions and can be text or icon-only.'
        }
      ]}
      variants={[
        {
          name: 'Line Type',
          description: 'Tabs with an underline indicator for the active state. Clean, minimal appearance suitable for most use cases.'
        },
        {
          name: 'Segment Type',
          description: 'Tabs with a filled background for the active state. More prominent visual distinction, similar to segmented controls.'
        },
        {
          name: 'No Border Type',
          description: 'Tabs without visible borders or backgrounds. Relies on color and typography changes for state indication. Most minimal style.'
        },
        {
          name: 'Icon Only',
          description: 'Tabs that display only icons without text labels. Useful for space-constrained interfaces or when icons are universally recognized.'
        },
        {
          name: 'Text with Icon',
          description: 'Tabs that combine text labels with icons. Provides both visual and textual context for better clarity.'
        },
        {
          name: 'Text Only',
          description: 'Tabs with text labels only. Standard pattern for most content organization scenarios.'
        },
        {
          name: 'Full-width Tabs',
          description: 'Tab items that expand to fill available width equally. Useful when tabs should have uniform sizing regardless of content length.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Tab is not selected and is ready for interaction. Appears with neutral styling, showing label and optional icon/badge.'
        },
        {
          name: 'Hover',
          description: 'User hovers over a tab. Provides visual feedback through background color change or subtle elevation. Dropdown menu may appear if enabled.'
        },
        {
          name: 'Active',
          description: 'Tab is currently selected. Content panel displays corresponding content. Visual indicator (underline, background, or accent) shows active state clearly.'
        },
        {
          name: 'Focus',
          description: 'Tab receives keyboard focus. Visible focus ring indicates the element can be activated with keyboard navigation.'
        },
        {
          name: 'Disabled',
          description: 'Tab is temporarily unavailable. Appears grayed out with reduced opacity. Not interactive and cannot be selected. Used when content is loading or unavailable.'
        }
      ]}
      props={[
        {
          name: 'tabs',
          type: 'TabItem[]',
          description: 'Array of tab objects, each containing id, label, content, and optional properties (icon, badge, removable, dropdown).'
        },
        {
          name: 'type',
          type: '"line" | "segment" | "no-border"',
          default: '"line"',
          description: 'Visual style variant of the tabs component.'
        },
        {
          name: 'placement',
          type: '"top" | "bottom" | "left" | "right"',
          default: '"top"',
          description: 'Position of tabs relative to content. Top and bottom are horizontal, left and right are vertical.'
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg" | "xl" | "2xl"',
          default: '"md"',
          description: 'Size variant affecting padding, font size, and icon dimensions.'
        },
        {
          name: 'iconOnly',
          type: 'boolean',
          default: 'false',
          description: 'Whether tabs should display only icons without text labels.'
        },
        {
          name: 'defaultTab',
          type: 'string',
          description: 'ID of the tab that should be selected by default.'
        },
        {
          name: 'onTabChange',
          type: '(tabId: string) => void',
          description: 'Callback function invoked when user switches to a different tab.'
        },
        {
          name: 'onTabRemove',
          type: '(tabId: string) => void',
          description: 'Callback function invoked when a removable tab is closed by the user.'
        },
        {
          name: 'moreTabs',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show a dropdown menu for tabs that overflow the container width.'
        },
        {
          name: 'newTab',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display a "New Tab" button at the start of the tab list.'
        },
        {
          name: 'endActions',
          type: 'boolean | ActionItem[]',
          default: 'false',
          description: 'Whether to display action buttons at the end of the tab list. Can be boolean or array of action items.'
        },
        {
          name: 'justifyContent',
          type: 'boolean',
          default: 'false',
          description: 'Whether tabs should be distributed evenly across the available width (full-width behavior).'
        },
        {
          name: 'tabBorderOffset',
          type: 'boolean',
          default: 'false',
          description: 'Whether the active tab border/indicator should be offset from the tab edges. Only applies to horizontal Line and No Border types.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables all tabs when true. Useful during loading states or when content is unavailable.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use clear, concise labels that accurately describe the tab\'s content',
          'Keep the number of tabs between 2-5 for optimal usability (use "more tabs" dropdown for additional items)',
          'Maintain consistent tab order across related views and sessions',
          'Provide visual feedback for all interactive states (hover, focus, active)',
          'Use icons to enhance recognition, especially for icon-only variants',
          'Enable removable tabs only when users can meaningfully dismiss content',
          'Use appropriate size variants based on content density and screen space',
          'Consider full-width tabs when all tabs should have equal visual weight',
          'Use dropdown menus for tabs that need additional actions without cluttering the interface'
        ],
        dont: [
          'Don\'t nest tabs within tabs (use alternative patterns like accordions or sidebars)',
          'Don\'t use tabs for actions or commands (use buttons or menus instead)',
          'Don\'t hide critical content behind tabs without clear indication or preview',
          'Don\'t change tab order dynamically based on user actions (maintain predictable order)',
          'Don\'t use tabs when content needs to be compared side-by-side',
          'Don\'t make tabs scroll horizontally on mobile (use dropdown or alternative patterns)',
          'Don\'t use too many visual variants in the same interface (maintain consistency)',
          'Don\'t enable removable tabs for essential navigation items',
          'Don\'t use icon-only tabs when icons are ambiguous or unfamiliar to users'
        ]
      }}
      accessibility={{
        keyboard: [
          'Arrow keys navigate between tabs: Left/Right for horizontal tabs, Up/Down for vertical tabs',
          'Enter or Space activates the focused tab',
          'Home key jumps to the first tab',
          'End key jumps to the last tab',
          'Tab key moves focus to the tab panel content after tab navigation',
          'Escape closes dropdown menus if open',
          'Delete or Backspace removes a tab if it is removable and focused'
        ],
        screenReader: [
          'Each tab button is announced with its label, state, and position (e.g., "Contacts tab, selected, 2 of 5")',
          'Tab panel content is announced when a tab is activated',
          'Removable tabs are announced with removal instructions',
          'Tabs with dropdowns are announced as having additional actions',
          'Disabled tabs are announced as "unavailable"',
          'Badge counts are announced as part of the tab label'
        ],
        ariaHints: [
          'role="tablist" on the container',
          'role="tab" on each tab button',
          'role="tabpanel" on each content panel',
          'aria-selected="true" on the active tab',
          'aria-controls linking tabs to their panels',
          'aria-label or aria-labelledby for tab panels',
          'aria-expanded on tabs with dropdowns',
          'aria-disabled on disabled tabs'
        ]
      }}
      relatedComponents={[
        'Button',
        'Dropdown',
        'Badge',
        'Accordion',
        'Sidebar'
      ]}
      figmaDocumentation={{
        title: 'Tab Component Documentation',
        description: 'Complete visual reference showing all tab types, placements, sizes, and configurations from the design system. This comprehensive view includes Line, Segment, and No Border types across all placements and sizes.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5004-211071',
        figmaNodeId: '5004-211071',
      }}
      examples={[
        {
          title: 'Mode Switching Tabs in Figma',
          description: 'Figma uses tabs to switch between Design, Prototype, and Dev modes. Each mode provides different tools and context, with smooth transitions and state preservation.',
          media: {
            type: 'video',
            url: '/examples/tab/tab-mode-figma-switching.mp4',
            alt: 'Figma mode switching between Design, Prototype, and Dev modes',
            thumbnailUrl: '/examples/tab/tab-mode-figma-thumb.png',
          },
          productName: 'Figma',
          productUrl: 'https://www.figma.com',
          tags: ['mode-switching', 'navigation', 'state-preservation'],
          critique: 'The clear labeling helps users understand the difference between modes. The active state indicator makes it obvious which mode is currently active. However, the transition between modes could be smoother, and users might benefit from a preview of what each mode offers.',
          highLevelApplication: 'HighLevel could use this pattern for switching between AI-assisted workflows and manual editing in campaign builders, funnel editors, and content creation tools. The tabs should clearly indicate what each mode does, and we could add tooltips or previews to help users understand the difference.',
        },
        {
          title: 'Repository Navigation Tabs in GitHub',
          description: 'GitHub uses tabs with icons and badges to organize repository content. The tabs show Code, Issues, Pull Requests, and more, with badge counts indicating activity levels.',
          media: {
            type: 'image',
            url: '/examples/tab/tab-navigation-github-repo.png',
            alt: 'GitHub repository tabs with icons and badges',
          },
          productName: 'GitHub',
          productUrl: 'https://github.com',
          tags: ['navigation', 'badges', 'icons', 'content-organization'],
          critique: 'Icons and badges add valuable context without cluttering the interface. The badge count helps users understand the importance or activity level of each tab. The icons are universally recognized. However, the badge counts could update in real-time.',
          highLevelApplication: 'HighLevel could use badges to show unread counts in inbox tabs, pending tasks in workflow tabs, or active campaigns in dashboard tabs. Icons could help users quickly identify different sections (contacts, campaigns, funnels, analytics).',
        },
        {
          title: 'Page Section Tabs in Notion',
          description: 'Notion uses tabs to organize page sections, allowing users to switch between different views without losing context. The tabs maintain state and provide smooth transitions.',
          media: {
            type: 'gif',
            url: '/examples/tab/tab-sections-notion.gif',
            alt: 'Notion page section tabs switching animation',
          },
          productName: 'Notion',
          productUrl: 'https://www.notion.so',
          tags: ['content-organization', 'sections', 'state-preservation'],
          critique: 'Tabs reduce cognitive load by showing one section at a time. The visual hierarchy helps users understand the relationship between different content areas. The tabs are clearly labeled and the active state is obvious.',
          highLevelApplication: 'HighLevel could use this pattern in contact detail pages (Overview, Activity, Notes, Tasks), campaign dashboards (Performance, Audience, Content), and funnel builders (Steps, Settings, Analytics). The tabs should maintain state when switching.',
        },
      ]}
    />
  );
};

