import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const TabsDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Tabs"
      category="Navigation"
      description="A tabbed interface component that allows users to switch between different views or sections of content. Supports both Assist and Build modes with AI-powered suggestions."
      whenToUse={[
        'Organizing related content into distinct sections that users can switch between',
        'Presenting multiple views of the same data or context',
        'Separating Assist mode (AI suggestions) from Build mode (manual editing)',
        'Reducing cognitive load by showing one section at a time',
        'When users need to compare or reference content across different sections'
      ]}
      whenNotToUse={[
        'For sequential workflows that require linear progression',
        'When all content should be visible simultaneously',
        'For primary navigation between major sections of the application',
        'When there are more than 5-7 tabs (consider alternative patterns)',
        'For actions or commands (use buttons or menus instead)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Tab List Container',
          description: 'The horizontal container that holds all tab buttons. Provides visual grouping and manages focus order.'
        },
        {
          number: 2,
          name: 'Tab Button',
          description: 'Individual clickable element representing a tab. Shows the tab label and indicates the active state.'
        },
        {
          number: 3,
          name: 'Active Indicator',
          description: 'Visual marker (underline, background, or border) that highlights the currently selected tab.'
        },
        {
          number: 4,
          name: 'Tab Panel',
          description: 'The content area that displays the selected tab\'s content. Only one panel is visible at a time.'
        },
        {
          number: 5,
          name: 'Mode Badge (Optional)',
          description: 'Small indicator showing whether the tab is in Assist or Build mode, when applicable.'
        }
      ]}
      variants={[
        {
          name: 'Default Tabs',
          description: 'Standard horizontal tabs with text labels. Best for most use cases with 2-5 tabs.'
        },
        {
          name: 'Icon Tabs',
          description: 'Tabs with icons instead of or alongside text. Useful for space-constrained interfaces or when icons are more recognizable.'
        },
        {
          name: 'Pill Tabs',
          description: 'Rounded tab buttons with more padding. Provides a softer, more modern appearance.'
        },
        {
          name: 'Vertical Tabs',
          description: 'Tabs arranged vertically along the left or right side. Useful for longer lists of tabs or when horizontal space is limited.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Tab is not selected. Appears with neutral styling and is clickable.'
        },
        {
          name: 'Active',
          description: 'Tab is currently selected. Content panel displays corresponding content. Visual indicator shows active state.'
        },
        {
          name: 'Hover',
          description: 'User hovers over a tab. Provides visual feedback that the tab is interactive.'
        },
        {
          name: 'Focus',
          description: 'Tab receives keyboard focus. Visible focus ring indicates the element can be activated with keyboard.'
        },
        {
          name: 'Disabled',
          description: 'Tab is temporarily unavailable. Appears grayed out and is not interactive. Used when content is loading or unavailable.'
        }
      ]}
      props={[
        {
          name: 'tabs',
          type: 'TabItem[]',
          description: 'Array of tab objects, each containing id, label, content, and optional icon.'
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
          name: 'variant',
          type: '"default" | "pill" | "vertical"',
          default: '"default"',
          description: 'Visual style variant of the tabs component.'
        },
        {
          name: 'showModeBadge',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display Assist/Build mode indicators on tabs.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables all tabs when true. Useful during loading states.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use clear, concise labels that accurately describe the tab\'s content',
          'Keep the number of tabs between 2-5 for optimal usability',
          'Maintain consistent tab order across related views',
          'Provide visual feedback for active, hover, and focus states',
          'Ensure tab content is independent and doesn\'t require context from other tabs',
          'Use Assist/Build mode badges when tabs have different interaction modes'
        ],
        dont: [
          'Don\'t nest tabs within tabs (use alternative patterns instead)',
          'Don\'t use tabs for actions or commands',
          'Don\'t hide important content behind tabs without clear indication',
          'Don\'t change tab order dynamically based on user actions',
          'Don\'t use tabs when content needs to be compared side-by-side',
          'Don\'t make tabs scroll horizontally on mobile (use alternative patterns)'
        ]
      }}
      aiConsiderations={{
        invocation: 'Users switch between Assist and Build tabs by clicking the respective tab button. The mode change is immediate and does not require confirmation. AI suggestions are automatically loaded when switching to Assist mode.',
        latency: 'When switching to Assist mode, show a loading skeleton or spinner in the tab panel while AI suggestions are being generated. For streaming responses, display partial content as it arrives. If latency exceeds 3 seconds, show a progress indicator with estimated time remaining.',
        uncertainty: 'If AI suggestions cannot be generated, display an empty state with a clear message explaining why (e.g., "Unable to generate suggestions. Please try again."). Provide a retry button. For partial failures, show available suggestions with a note about what could not be generated.',
        manualOverride: 'Users can always switch to Build mode to manually edit content. Any changes made in Build mode persist when switching back to Assist mode. Users can also edit AI-generated suggestions directly in Assist mode, which updates the underlying data. An undo/redo system tracks changes across mode switches.',
        context: 'When generating suggestions in Assist mode, the AI receives the current content state, user\'s editing history, and any relevant metadata (project type, user preferences, etc.). The AI does not see content from inactive tabs unless explicitly relevant to the current context.',
        safety: 'AI suggestions are filtered to prevent inappropriate content. Certain operations (like deleting large sections) require explicit user confirmation even in Assist mode. Content guidelines are enforced before displaying suggestions.',
        dataVisibility: 'User edits and AI suggestions are stored locally until explicitly saved. Switching tabs does not trigger auto-save. Users can see a history of AI suggestions in Assist mode, but previous suggestions are not shown again after being dismissed or edited.'
      }}
      accessibility={{
        keyboard: [
          'Arrow keys (Left/Right or Up/Down for vertical) navigate between tabs',
          'Enter or Space activates the focused tab',
          'Home key jumps to the first tab',
          'End key jumps to the last tab',
          'Tab key moves focus to the tab panel content after tab navigation'
        ],
        screenReader: [
          'Each tab button is announced with its label and state (e.g., "Assist tab, selected, 1 of 2")',
          'Tab panel content is announced when a tab is activated',
          'ARIA live regions announce mode changes (Assist to Build)',
          'Disabled tabs are announced as "unavailable"'
        ],
        ariaHints: [
          'role="tablist" on the container',
          'role="tab" on each tab button',
          'role="tabpanel" on each content panel',
          'aria-selected="true" on the active tab',
          'aria-controls linking tabs to their panels',
          'aria-label or aria-labelledby for tab panels'
        ]
      }}
      relatedComponents={[
        'Button',
        'Accordion',
        'Modal',
        'Sidebar',
        'Navigation Menu'
      ]}
    />
  );
};

