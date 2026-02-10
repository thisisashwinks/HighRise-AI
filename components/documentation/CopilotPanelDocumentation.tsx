import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const CopilotPanelDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Copilot Panel"
      category="Content"
      description="AI copilot panel component providing contextual assistance, suggestions, and interactive guidance within the application interface. Features expandable sidebar with recent queries, tabbed navigation, and flexible content display."
      whenToUse={[
        'Providing AI-powered assistance and suggestions within the application interface',
        'Displaying contextual help and guidance without leaving the current context',
        'Offering quick access to recent queries and conversation history',
        'When users need AI assistance that can be toggled on/off without disrupting workflow',
        'Providing multiple AI interaction modes (Assist, Build, etc.) through tabs',
        'When space efficiency is important - panel can be collapsed or expanded as needed',
        'For applications that benefit from persistent AI assistance alongside main content'
      ]}
      whenNotToUse={[
        'For primary navigation or core application functionality',
        'When AI assistance should be modal or full-screen rather than contextual',
        'For simple one-off AI interactions (use a modal or inline component instead)',
        'When the interface is already space-constrained and cannot accommodate a sidebar',
        'For applications that don\'t have AI functionality or assistance features',
        'When users need to focus exclusively on main content without distractions'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Panel Container',
          description: 'The main wrapper that positions the panel as a fixed sidebar (left or right). Manages overall layout, width, and z-index positioning.'
        },
        {
          number: 2,
          name: 'Recent Queries Panel (Optional)',
          description: 'Left-side panel that appears when expanded. Contains search functionality and a scrollable list of recent queries with dates and dismiss actions.'
        },
        {
          number: 3,
          name: 'Header',
          description: 'Top section containing the panel title, optional back button, "Start a new chat" action, and control icons (menu, swap, expand, dock, close).'
        },
        {
          number: 4,
          name: 'Tabs (Optional)',
          description: 'Tab navigation bar below the header for switching between different modes (e.g., Assist, Build). Only visible when showTabs is enabled.'
        },
        {
          number: 5,
          name: 'Content Area',
          description: 'Main scrollable content region. Displays either empty state with prompt and suggested actions, or conversation/content when not empty.'
        },
        {
          number: 6,
          name: 'Empty State',
          description: 'Initial view showing a prompt question, description text, and grid of suggested action buttons. Displayed when empty prop is true.'
        },
        {
          number: 7,
          name: 'Suggested Actions',
          description: 'Grid of action buttons displayed in the empty state. Provides quick access to common AI tasks or workflows.'
        },
        {
          number: 8,
          name: 'Footer (Optional)',
          description: 'Bottom section for additional content, links, or information. Only displayed when footer prop is provided.'
        },
        {
          number: 9,
          name: 'Control Icons',
          description: 'Header action buttons including menu dots, swap/pin, expand/collapse, dock, and close. Visibility controlled by respective boolean props.'
        }
      ]}
      variants={[
        {
          name: 'Expanded',
          description: 'Panel shows both Recent Queries sidebar and main content area. Provides full functionality with query history access.'
        },
        {
          name: 'Collapsed',
          description: 'Panel shows only the main content area without Recent Queries sidebar. More compact, suitable for space-constrained interfaces.'
        },
        {
          name: 'Empty State',
          description: 'Initial view with prompt and suggested actions. Guides users on how to interact with the AI copilot.'
        },
        {
          name: 'Content State',
          description: 'Panel displays conversation history, AI responses, or custom content. Used when users have already started interacting.'
        },
        {
          name: 'With Tabs',
          description: 'Panel includes tab navigation for switching between different AI modes or workflows (e.g., Assist vs Build).'
        },
        {
          name: 'Without Tabs',
          description: 'Single-mode panel without tab navigation. Simpler interface for focused AI interactions.'
        },
        {
          name: 'Left Position',
          description: 'Panel positioned on the left side of the screen. Useful when right side is occupied or for left-to-right reading patterns.'
        },
        {
          name: 'Right Position',
          description: 'Panel positioned on the right side of the screen. Default position, common for sidebar patterns.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Panel is visible and ready for interaction. Shows empty state with prompt and suggested actions if empty prop is true.'
        },
        {
          name: 'Expanded',
          description: 'Panel is in expanded mode, showing Recent Queries sidebar alongside main content. Provides access to query history.'
        },
        {
          name: 'Collapsed',
          description: 'Panel is in collapsed mode, showing only main content area. More compact layout for focused interactions.'
        },
        {
          name: 'With Content',
          description: 'Panel displays conversation history, AI responses, or custom content. Empty state is hidden.'
        },
        {
          name: 'Tab Active',
          description: 'A specific tab is selected and its content is displayed. Visual indicator shows active tab with accent color and border.'
        },
        {
          name: 'Loading',
          description: 'Panel is processing an AI request or loading content. Loading indicators should be displayed in the content area.'
        }
      ]}
      props={[
        {
          name: 'expanded',
          type: 'boolean',
          default: 'false',
          description: 'Whether the panel is expanded to show Recent Queries sidebar. When true, displays left-side query history panel.'
        },
        {
          name: 'empty',
          type: 'boolean',
          default: 'true',
          description: 'Whether to show the empty state with prompt and suggested actions. When false, displays content prop or tab content.'
        },
        {
          name: 'showTabs',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display tab navigation below the header. Enables switching between different AI modes or workflows.'
        },
        {
          name: 'showSwap',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show the swap/pin icon in the header. Allows users to toggle Recent Queries panel visibility.'
        },
        {
          name: 'showExpandable',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show the expand/collapse icon in the header. Enables manual expansion/collapse control.'
        },
        {
          name: 'showDock',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show the dock icon in the header. Allows users to dock/undock the panel.'
        },
        {
          name: 'showBack',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show the back button in the header. Enables navigation to previous view or state.'
        },
        {
          name: 'title',
          type: 'string',
          default: '"Ask AI"',
          description: 'The title displayed in the panel header. Typically identifies the AI assistant or copilot name.'
        },
        {
          name: 'prompt',
          type: 'string',
          default: '"What\'s on your mind?"',
          description: 'The main prompt question displayed in the empty state. Guides users on how to interact with the AI.'
        },
        {
          name: 'promptDescription',
          type: 'string',
          description: 'Additional descriptive text displayed below the prompt. Provides context or examples of what users can do.'
        },
        {
          name: 'suggestedActions',
          type: 'SuggestedAction[]',
          default: '[]',
          description: 'Array of suggested action buttons displayed in the empty state. Each action has an id, label, and onClick handler.'
        },
        {
          name: 'recentQueries',
          type: 'RecentQuery[]',
          default: '[]',
          description: 'Array of recent queries displayed in the left sidebar when expanded. Each query has id, title, date, and optional callbacks.'
        },
        {
          name: 'tabs',
          type: 'CopilotPanelTab[]',
          default: '[]',
          description: 'Array of tab objects for navigation. Each tab has id, label, and optional content. Only used when showTabs is true.'
        },
        {
          name: 'defaultTab',
          type: 'string',
          description: 'ID of the tab that should be active by default. If not provided, first tab is selected.'
        },
        {
          name: 'content',
          type: 'React.ReactNode',
          description: 'Custom content to display in the main content area when empty is false. Overrides tab content if provided.'
        },
        {
          name: 'footer',
          type: 'React.ReactNode',
          description: 'Optional footer content displayed at the bottom of the panel. Can contain links, information, or additional actions.'
        },
        {
          name: 'onClose',
          type: '() => void',
          description: 'Callback function invoked when the close button is clicked. Should handle closing or hiding the panel.'
        },
        {
          name: 'onSwap',
          type: '() => void',
          description: 'Callback function invoked when the swap/pin icon is clicked. Typically toggles Recent Queries panel visibility.'
        },
        {
          name: 'onExpand',
          type: '() => void',
          description: 'Callback function invoked when the expand/collapse icon is clicked. Should toggle expanded state.'
        },
        {
          name: 'onDock',
          type: '() => void',
          description: 'Callback function invoked when the dock icon is clicked. Should handle docking/undocking the panel.'
        },
        {
          name: 'onBack',
          type: '() => void',
          description: 'Callback function invoked when the back button is clicked. Should navigate to previous view or state.'
        },
        {
          name: 'onTabChange',
          type: '(tabId: string) => void',
          description: 'Callback function invoked when user switches to a different tab. Receives the ID of the newly selected tab.'
        },
        {
          name: 'onNewChat',
          type: '() => void',
          description: 'Callback function invoked when "Start a new chat" button is clicked. Should reset the panel to empty state.'
        },
        {
          name: 'onQuerySearch',
          type: '(query: string) => void',
          description: 'Callback function invoked when user types in the Recent Queries search input. Receives the search query string.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the panel container. Allows additional styling customization.'
        },
        {
          name: 'position',
          type: '"left" | "right"',
          default: '"right"',
          description: 'Position of the panel on the screen. Right is default, left is alternative for different layouts.'
        },
        {
          name: 'width',
          type: '"narrow" | "wide"',
          default: '"narrow"',
          description: 'Width variant of the panel. Narrow is default (400px collapsed, 600px expanded), wide is larger (800px expanded).'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use the empty state to guide users on how to interact with the AI copilot',
          'Provide clear, actionable suggested actions that demonstrate key capabilities',
          'Show Recent Queries panel when users benefit from accessing conversation history',
          'Use tabs to separate distinct AI modes or workflows (e.g., Assist vs Build)',
          'Implement proper keyboard navigation and focus management for accessibility',
          'Handle loading states gracefully when AI requests are processing',
          'Provide clear visual feedback for all interactive elements and state changes',
          'Use appropriate panel width based on content density and screen size',
          'Allow users to collapse the panel when they need more screen space',
          'Maintain conversation context when switching between tabs or views'
        ],
        dont: [
          'Don\'t use the panel for primary navigation or core application features',
          'Don\'t show too many suggested actions (keep to 4-6 for optimal usability)',
          'Don\'t block critical content with the panel - allow users to close or collapse it',
          'Don\'t use tabs for simple state changes (use conditional rendering instead)',
          'Don\'t show all control icons at once - only display relevant ones for the use case',
          'Don\'t make the panel too wide on smaller screens - ensure responsive behavior',
          'Don\'t forget to handle edge cases like empty query lists or failed AI requests',
          'Don\'t use the panel for one-off interactions that would be better as modals',
          'Don\'t show the panel by default if it\'s not essential - let users opt-in',
          'Don\'t ignore keyboard shortcuts for common actions (close, expand, etc.)'
        ]
      }}
      aiConsiderations={{
        invocation: 'The Copilot Panel can be invoked through various triggers: keyboard shortcut (e.g., Cmd/Ctrl+K), button click, or automatic display based on context. Consider providing multiple invocation methods to accommodate different user preferences and workflows.',
        latency: 'AI requests may take several seconds to process. Display loading indicators in the content area, show skeleton screens for expected content, and consider streaming responses for better perceived performance. Keep the panel responsive even while waiting for AI responses.',
        uncertainty: 'When AI responses are uncertain or low confidence, clearly indicate this to users. Use visual indicators, confidence scores, or disclaimers. Provide options to refine queries or request clarification. Never hide uncertainty from users.',
        manualOverride: 'Always allow users to manually edit AI-generated content, dismiss suggestions, or close the panel entirely. Provide clear controls for overriding AI behavior and ensure users maintain full control over their workflow.',
        context: 'The panel should receive relevant context from the current page or selection. Pass context about what the user is viewing, selected content, or current task to improve AI response quality. Consider showing what context is being used.',
        dataVisibility: 'Clearly communicate what data is being sent to AI services. Show users what context is included in requests, especially when accessing recent queries or conversation history. Provide transparency about data usage and privacy.'
      }}
      accessibility={{
        keyboard: [
          'Escape key closes the panel when onClose callback is provided',
          'Tab key navigates through interactive elements (header buttons, tabs, suggested actions)',
          'Arrow keys navigate between tabs when tabs are focused',
          'Enter or Space activates focused buttons, tabs, or suggested actions',
          'Home/End keys jump to first/last item in Recent Queries list',
          'Focus trap ensures keyboard navigation stays within the panel when open',
          'Focus returns to trigger element when panel is closed'
        ],
        screenReader: [
          'Panel is announced as "AI Copilot Panel" with role="complementary"',
          'Header title is announced clearly (e.g., "Ask AI, panel")',
          'Tabs are announced with their labels and active state (e.g., "Assist tab, selected, 1 of 2")',
          'Suggested actions are announced with their labels and purpose',
          'Recent queries are announced with title and date information',
          'Loading states are announced (e.g., "Processing request, please wait")',
          'Empty state prompt is announced to guide users',
          'Control buttons have descriptive aria-labels (e.g., "Close panel", "Expand panel")'
        ],
        ariaHints: [
          'role="complementary" on the panel container',
          'role="tablist" on tabs container when showTabs is true',
          'role="tab" on each tab button',
          'role="tabpanel" on content area when tabs are used',
          'aria-selected on active tab',
          'aria-label or aria-labelledby for all icon buttons',
          'aria-expanded on expand/collapse button',
          'aria-controls linking tabs to their panels',
          'aria-live="polite" region for AI response updates'
        ]
      }}
      relatedComponents={[
        'Button',
        'Tab',
        'Dropdown',
        'Accordion',
        'Input',
        'Text Area'
      ]}
      figmaDocumentation={{
        title: 'Copilot Panel Component Documentation',
        description: 'Complete visual reference showing all panel states, configurations, and variants from the design system. Includes expanded/collapsed states, empty/content states, tab navigation, and all control options.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5596-32466',
        figmaNodeId: '5596-32466',
      }}
      examples={[
        {
          title: 'Copilot Default',
          description: 'The Copilot Panel in its default state with the main content area visible. Shows the prompt question and empty state, ready for users to ask questions or use suggested actions. Clean, focused layout for AI assistance.',
          media: {
            type: 'image',
            url: '/examples/copilot/Copilot Default.png',
            alt: 'Copilot Panel default state',
          },
          tags: ['default', 'empty-state', 'prompt'],
        },
        {
          title: 'Copilot Expanded',
          description: 'The Copilot Panel in expanded mode with more space for content and conversation. Provides a comfortable reading and interaction area when users need to view longer AI responses or work through multi-step tasks.',
          media: {
            type: 'image',
            url: '/examples/copilot/Copilot Expanded.png',
            alt: 'Copilot Panel expanded view',
          },
          tags: ['expanded', 'content', 'conversation'],
        },
        {
          title: 'Copilot with Tabs',
          description: 'Copilot Panel with tab navigation allowing users to switch between different modes such as Assist and Build. Each tab provides distinct AI capabilities and workflows within the same panel.',
          media: {
            type: 'image',
            url: '/examples/copilot/Copilot (With Tabs).png',
            alt: 'Copilot Panel with tabs',
          },
          tags: ['tabs', 'assist', 'build', 'modes'],
        },
        {
          title: 'Copilot Resizable',
          description: 'The Copilot Panel with resizable width, allowing users to adjust how much screen space the panel uses. Supports narrow and wide variants to suit different tasks and screen sizes.',
          media: {
            type: 'image',
            url: '/examples/copilot/Copilot (Resizable).png',
            alt: 'Copilot Panel resizable width',
          },
          tags: ['resizable', 'width', 'flexible'],
        },
      ]}
    />
  );
};
