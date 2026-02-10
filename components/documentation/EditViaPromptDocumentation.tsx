import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const EditViaPromptDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Edit Via Prompt (Inspect Prompt)"
      category="Form"
      description="A component that allows users to view prompts in read-only mode and edit them when needed. Also known as Inline AI Editor. Features inspect mode for viewing prompts and edit mode with textarea input, keyboard shortcuts, and validation support."
      whenToUse={[
        'Displaying prompts or instructions that users may need to inspect before editing',
        'When users need to view AI-generated prompts before making modifications',
        'For prompt libraries or templates where users want to preview before editing',
        'When you want to prevent accidental edits by defaulting to read-only view',
        'For displaying system prompts or configuration that requires careful review before changes',
        'When users need to inspect the exact prompt being used by AI systems',
        'For prompt debugging or troubleshooting workflows'
      ]}
      whenNotToUse={[
        'For simple text inputs that don\'t need read-only inspection mode',
        'When prompts should always be editable without a view mode',
        'For one-line inputs (use Input or InlineInput instead)',
        'When the prompt content is too long for comfortable viewing (consider a modal)',
        'For content that requires rich text editing capabilities',
        'When users need to edit multiple prompts simultaneously'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label',
          description: 'Optional label displayed above the component. When editable, includes an "Edit" button with optional inspect icon.'
        },
        {
          number: 2,
          name: 'Inspect Mode (Read-Only)',
          description: 'Default view showing the prompt in a read-only, styled container. Displays prompt content with monospace font in a neutral background. Shows placeholder text if prompt is empty.'
        },
        {
          number: 3,
          name: 'Edit Button',
          description: 'Button in the label area that switches to edit mode. Includes optional inspect/eye icon. Only visible when component is editable and not in edit mode.'
        },
        {
          number: 4,
          name: 'Edit Mode (Textarea)',
          description: 'Editable textarea that appears when edit mode is activated. Uses prompt-input variant with monospace font. Supports auto-resize, character count, and validation.'
        },
        {
          number: 5,
          name: 'Action Buttons',
          description: 'Save and Cancel buttons displayed in edit mode. Save button is primary, Cancel is secondary. Save is disabled if validation fails or maxLength is exceeded.'
        },
        {
          number: 6,
          name: 'Helper Text / Error Message',
          description: 'Optional helper text or error message displayed below the textarea in edit mode. Provides guidance or validation feedback.'
        },
        {
          number: 7,
          name: 'Character Count (Optional)',
          description: 'Character count indicator showing current length and maximum length when maxLength is set. Displayed in edit mode.'
        },
        {
          number: 8,
          name: 'Footer (Optional)',
          description: 'Custom footer content displayed below the inspect mode view. Can contain additional information or actions.'
        }
      ]}
      variants={[
        {
          name: 'Small Size',
          description: 'Compact variant with smaller text, padding, and buttons. Suitable for dense interfaces or when space is limited.'
        },
        {
          name: 'Medium Size',
          description: 'Default size variant with balanced spacing and readability. Suitable for most use cases.'
        },
        {
          name: 'Large Size',
          description: 'Spacious variant with larger text and padding. Suitable for prominent prompts or when readability is paramount.'
        },
        {
          name: 'With Character Count',
          description: 'Displays character count and maximum length when maxLength is set. Helps users stay within limits.'
        },
        {
          name: 'With Validation',
          description: 'Shows error state with error message when validation fails. Prevents saving invalid prompts.'
        },
        {
          name: 'Auto-Resize',
          description: 'Textarea automatically adjusts height based on content. Grows from minRows to maxRows as user types.'
        },
        {
          name: 'Fixed Height',
          description: 'Textarea maintains fixed height when autoResize is disabled. User can scroll for longer content.'
        }
      ]}
      states={[
        {
          name: 'Inspect Mode (Default)',
          description: 'Component displays prompt in read-only mode. Shows formatted prompt text in a styled container. Edit button is visible if editable.'
        },
        {
          name: 'Edit Mode',
          description: 'Component switches to editable textarea. User can modify the prompt. Save and Cancel buttons are displayed. Keyboard shortcuts are active.'
        },
        {
          name: 'Focused',
          description: 'Textarea receives focus in edit mode. Cursor is positioned at the end of the text. Ready for user input.'
        },
        {
          name: 'Error',
          description: 'Validation error is displayed. Error message appears below textarea. Save button is disabled. Border and text use error styling.'
        },
        {
          name: 'Disabled',
          description: 'Component is disabled and non-interactive. Edit button is hidden. Both inspect and edit modes are disabled.'
        },
        {
          name: 'Empty',
          description: 'Prompt value is empty. Inspect mode shows placeholder text in italic. Edit mode shows empty textarea with placeholder.'
        },
        {
          name: 'Saving',
          description: 'Save action is in progress. Save button may show loading state. Component may be disabled during save operation.'
        }
      ]}
      props={[
        {
          name: 'value',
          type: 'string',
          default: '""',
          description: 'The prompt content to display in inspect mode and edit in edit mode. Controlled component value.'
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: 'Callback function invoked whenever the prompt value changes in edit mode. Receives the new prompt value.'
        },
        {
          name: 'onSave',
          type: '(value: string) => void',
          description: 'Callback function invoked when user clicks Save button or uses Cmd/Ctrl+Enter. Receives the final edited prompt value.'
        },
        {
          name: 'onCancel',
          type: '() => void',
          description: 'Callback function invoked when user clicks Cancel button or presses Escape. Reverts changes to previous value.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label displayed above the component. When provided, includes space for the Edit button.'
        },
        {
          name: 'placeholder',
          type: 'string',
          default: '"Enter your prompt..."',
          description: 'Placeholder text shown in edit mode textarea and inspect mode when value is empty.'
        },
        {
          name: 'defaultEditMode',
          type: 'boolean',
          default: 'false',
          description: 'Whether the component should start in edit mode instead of inspect mode. Useful for creating new prompts.'
        },
        {
          name: 'editable',
          type: 'boolean',
          default: 'true',
          description: 'Whether the prompt can be edited. When false, Edit button is hidden and component is always in inspect mode.'
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting text size, padding, and button sizes. SM (compact), MD (default), LG (spacious).'
        },
        {
          name: 'minRows',
          type: 'number',
          default: '3',
          description: 'Minimum number of rows for the textarea. Also sets minimum height for inspect mode display.'
        },
        {
          name: 'maxRows',
          type: 'number',
          default: '8',
          description: 'Maximum number of rows when autoResize is enabled. Textarea will scroll if content exceeds this limit.'
        },
        {
          name: 'showCharacterCount',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display character count in edit mode. Only meaningful when maxLength is also set.'
        },
        {
          name: 'maxLength',
          type: 'number',
          description: 'Maximum character length allowed. When set, Save button is disabled if length exceeds limit. Character count is shown if showCharacterCount is true.'
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text displayed below the textarea in edit mode. Provides guidance or instructions to users.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the component is in an error state. When true, error styling is applied and errorMessage is displayed.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the textarea when error is true. Provides specific validation feedback.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the component is disabled. When true, Edit button is hidden and component cannot be edited.'
        },
        {
          name: 'autoResize',
          type: 'boolean',
          default: 'true',
          description: 'Whether the textarea should automatically resize based on content. Grows from minRows to maxRows as user types.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the component container. Allows additional styling customization.'
        },
        {
          name: 'editLabel',
          type: 'string',
          default: '"Edit"',
          description: 'Label text for the Edit button. Customize to match your application\'s terminology.'
        },
        {
          name: 'saveLabel',
          type: 'string',
          default: '"Save"',
          description: 'Label text for the Save button. Customize to match your application\'s terminology.'
        },
        {
          name: 'cancelLabel',
          type: 'string',
          default: '"Cancel"',
          description: 'Label text for the Cancel button. Customize to match your application\'s terminology.'
        },
        {
          name: 'showInspectIcon',
          type: 'boolean',
          default: 'true',
          description: 'Whether to show the inspect/eye icon next to the Edit button. Provides visual indication of inspect functionality.'
        },
        {
          name: 'footer',
          type: 'React.ReactNode',
          description: 'Optional footer content displayed below the inspect mode view. Can contain additional information, links, or actions.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use inspect mode as the default to prevent accidental edits',
          'Provide clear labels and helper text to guide users',
          'Set appropriate minRows and maxRows based on expected prompt length',
          'Use maxLength and showCharacterCount for prompts with length constraints',
          'Provide meaningful error messages when validation fails',
          'Use keyboard shortcuts (Cmd/Ctrl+Enter to save, Escape to cancel) for power users',
          'Consider using defaultEditMode=true for creating new prompts',
          'Set editable=false when prompts should be read-only',
          'Use appropriate size variant based on interface density',
          'Provide placeholder text that explains what kind of prompt is expected'
        ],
        dont: [
          'Don\'t use for simple one-line inputs (use Input or InlineInput instead)',
          'Don\'t make prompts too long - consider breaking into multiple components or using a modal',
          'Don\'t hide the Edit button unless the prompt is truly read-only',
          'Don\'t use for rich text editing (this component is for plain text prompts)',
          'Don\'t set maxLength without showCharacterCount - users need feedback',
          'Don\'t use error state without providing errorMessage',
          'Don\'t start in edit mode unless users are creating new prompts',
          'Don\'t use for content that requires formatting or markdown',
          'Don\'t make the component too small - prompts need readable display',
          'Don\'t forget to handle onSave and onCancel callbacks properly'
        ]
      }}
      aiConsiderations={{
        invocation: 'The Edit Via Prompt component can be used to display and edit AI-generated prompts. Users can inspect the exact prompt being used, understand how the AI interprets instructions, and refine prompts for better results. Consider providing context about how prompts are used by AI systems.',
        latency: 'When saving prompts, there may be latency if the save operation triggers AI processing. Show loading states on the Save button during save operations. Consider debouncing onChange if it triggers expensive operations.',
        uncertainty: 'If AI-generated prompts are uncertain or low quality, allow users to easily edit and improve them. The inspect mode helps users understand what prompt was used, which aids in debugging and refinement.',
        manualOverride: 'Always allow users to manually edit prompts. The component provides full editing capabilities with validation. Users maintain complete control over prompt content and can revert changes via Cancel.',
        context: 'When displaying prompts, consider showing what context or data is being used alongside the prompt. The footer prop can be used to display additional context information that helps users understand the full prompt context.',
        dataVisibility: 'The inspect mode makes prompts visible and transparent. Users can see exactly what prompt is being used, which is important for understanding AI behavior and ensuring prompts match expectations.'
      }}
      accessibility={{
        keyboard: [
          'Tab key navigates to Edit button when in inspect mode',
          'Tab key navigates through textarea and action buttons when in edit mode',
          'Enter activates Edit button when focused in inspect mode',
          'Cmd/Ctrl+Enter saves changes when textarea is focused in edit mode',
          'Escape key cancels editing and returns to inspect mode',
          'Arrow keys navigate within textarea content',
          'Home/End keys jump to start/end of textarea content',
          'Shift+Tab navigates backwards through interactive elements'
        ],
        screenReader: [
          'Component is announced as "Edit Via Prompt" or custom label',
          'Inspect mode is announced as "Read-only prompt" or "Prompt, read-only"',
          'Edit button is announced with label and purpose (e.g., "Edit prompt, button")',
          'Edit mode is announced when activated (e.g., "Editing prompt")',
          'Textarea is announced with label, placeholder, and current value',
          'Character count is announced when showCharacterCount is true (e.g., "150 of 500 characters")',
          'Error messages are announced when error state is active',
          'Save button state is announced (enabled/disabled)',
          'Keyboard shortcuts are announced (e.g., "Press Control Enter to save")'
        ],
        ariaHints: [
          'aria-label on Edit button describing its purpose',
          'aria-describedby linking textarea to helper text or error message',
          'aria-invalid on textarea when error is true',
          'aria-disabled on buttons when disabled',
          'role="textbox" on inspect mode display (implicit)',
          'aria-readonly="true" on inspect mode display',
          'aria-live="polite" for dynamic updates like character count'
        ]
      }}
      relatedComponents={[
        'Prompt Stencil',
        'Text Area',
        'Inline Text Area',
        'Input',
        'Button'
      ]}
      figmaDocumentation={{
        title: 'Edit Via Prompt Component Documentation',
        description: 'Complete visual reference showing all component states, variants, and configurations from the design system. Includes inspect mode, edit mode, validation states, and all size variants.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5625-16401',
        figmaNodeId: '5625-16401',
      }}
      examples={[
        {
          title: 'Default Edit Via Prompt',
          description: 'Edit Via Prompt in its default state: prompt is shown in read-only inspect mode. Users can view the prompt content and use the Edit action to switch to edit mode when they need to change it.',
          media: {
            type: 'image',
            url: '/examples/edit via prompt/Default Edit Via Prompt.png',
            alt: 'Default Edit Via Prompt (inspect mode)',
          },
          tags: ['default', 'inspect', 'read-only'],
        },
        {
          title: 'Edit Via Prompt In Focus',
          description: 'Edit Via Prompt with focus on the editable area or the Edit control. Highlights how the component behaves when the user is about to or is editing the prompt.',
          media: {
            type: 'image',
            url: '/examples/edit via prompt/In Focus.png',
            alt: 'Edit Via Prompt in focus',
          },
          tags: ['focus', 'edit', 'interaction'],
        },
        {
          title: 'Live Example',
          description: 'Edit Via Prompt in a real context: inspect and edit modes with Save and Cancel. Shows how users view and modify prompts in a typical workflow.',
          media: {
            type: 'image',
            url: '/examples/edit via prompt/Live Example.png',
            alt: 'Edit Via Prompt live example',
          },
          tags: ['live', 'workflow', 'inspect-edit'],
        },
        {
          title: 'Live Example 2',
          description: 'Another live usage of Edit Via Prompt, e.g. with different prompt length or layout. Reinforces how the component adapts to content and context.',
          media: {
            type: 'image',
            url: '/examples/edit via prompt/Live Example 2.png',
            alt: 'Edit Via Prompt live example 2',
          },
          tags: ['live', 'context', 'variation'],
        },
        {
          title: 'Live Example 3',
          description: 'Additional live example showing Edit Via Prompt with optional elements such as character count, validation, or footer. Useful for implementation reference.',
          media: {
            type: 'image',
            url: '/examples/edit via prompt/Live Example 3.png',
            alt: 'Edit Via Prompt live example 3',
          },
          tags: ['live', 'validation', 'options'],
        },
      ]}
    />
  );
};
