import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const InlineTextAreaDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Inline Text Area"
      category="Form"
      description="A compact, inline-editable textarea component that allows users to edit multi-line text directly in place without switching to a separate edit mode. Perfect for inline editing of longer content, descriptions, and notes where space is limited."
      whenToUse={[
        'Editing multi-line text inline within content, cards, or tables',
        'Quick edits of descriptions, notes, or comments that don\'t require a full form context',
        'Settings pages with compact multi-line input fields',
        'Inline data editing in lists or cards for longer content',
        'Contexts where the textarea should blend with surrounding text',
        'Editable descriptions or content that users can click to modify',
        'Multi-line text editing in constrained spaces',
        'Inline editing of prompts, instructions, or longer text fields'
      ]}
      whenNotToUse={[
        'Complex forms requiring extensive validation and error states (use TextArea instead)',
        'Single-line text editing (use Inline Input instead)',
        'Inputs that need prominent visual distinction',
        'When users need clear visual indication of editable fields before interaction',
        'Forms requiring comprehensive helper text and guidance',
        'Rich text editing with formatting (use a rich text editor component)',
        'Very short text entries that fit on one line (use Inline Input)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label (Optional)',
          description: 'Optional text label displayed above, left, or right of the textarea. Can be positioned flexibly based on layout needs.'
        },
        {
          number: 2,
          name: 'Display Value',
          description: 'The current multi-line value displayed when not in edit mode. Shows placeholder text when empty. Preserves line breaks and formatting.'
        },
        {
          number: 3,
          name: 'Edit Icon (Optional)',
          description: 'Optional icon that appears on hover to indicate the field is editable.'
        },
        {
          number: 4,
          name: 'Textarea Field',
          description: 'The actual textarea field that appears when editing. Supports auto-resize, multi-line input, and preserves formatting.'
        },
        {
          number: 5,
          name: 'Focus Indicator',
          description: 'Visual indicator showing the textarea is active. Style depends on variant (ring, border, underline, or background change).'
        },
        {
          number: 6,
          name: 'Character Count (Optional)',
          description: 'Optional character count displayed when maxLength is set and showCharacterCount is enabled.'
        },
        {
          number: 7,
          name: 'Error Message (Optional)',
          description: 'Error text displayed below the textarea when validation fails.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard inline textarea with border that appears on focus. Most common variant for general inline editing.'
        },
        {
          name: 'Borderless',
          description: 'Textarea with no visible border until focused. Blends seamlessly with surrounding content.'
        },
        {
          name: 'Underline',
          description: 'Textarea with underline border style. Common for inline editing in text-heavy contexts.'
        },
        {
          name: 'Minimal',
          description: 'Minimal styling with subtle background change on focus. Most unobtrusive variant.'
        }
      ]}
      states={[
        {
          name: 'Display',
          description: 'Initial state showing the current multi-line value as formatted text. Appears as regular text until clicked, preserving line breaks.'
        },
        {
          name: 'Hover',
          description: 'When hovering over an editable field, an edit icon may appear to indicate editability.'
        },
        {
          name: 'Editing',
          description: 'Active editing state where the textarea field is visible and focused. User can type, add line breaks, and modify the value. Auto-resizes based on content if enabled.'
        },
        {
          name: 'Focused',
          description: 'Textarea has keyboard focus. Shows focus indicator based on variant (ring, border highlight, underline, or background).'
        },
        {
          name: 'Error',
          description: 'Textarea contains invalid data. Shows error styling (red border/underline) and error message if provided.'
        },
        {
          name: 'Disabled',
          description: 'Textarea is not editable. Appears grayed out and cannot receive focus or input.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting padding, font size, and minimum height. XS (60px) to LG (120px) minimum height.'
        },
        {
          name: 'variant',
          type: '"default" | "borderless" | "underline" | "minimal"',
          default: '"default"',
          description: 'Visual variant of the inline textarea component.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed with the textarea.'
        },
        {
          name: 'labelPosition',
          type: '"left" | "right" | "top"',
          default: '"top"',
          description: 'Position of the label relative to the textarea field.'
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled textarea value. Use with onChange for controlled components.'
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Default value for uncontrolled components.'
        },
        {
          name: 'onChange',
          type: '(e: ChangeEvent<HTMLTextAreaElement>) => void',
          description: 'Callback function invoked when textarea value changes during editing.'
        },
        {
          name: 'onSave',
          type: '(value: string) => void',
          description: 'Callback function invoked when the user saves changes (Cmd/Ctrl+Enter or blur).'
        },
        {
          name: 'onCancel',
          type: '() => void',
          description: 'Callback function invoked when the user cancels editing (Escape key).'
        },
        {
          name: 'editable',
          type: 'boolean',
          default: 'true',
          description: 'Whether the textarea can be edited. When false, behaves as read-only text.'
        },
        {
          name: 'showEditIcon',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show an edit icon on hover when not editing.'
        },
        {
          name: 'autoResize',
          type: 'boolean',
          default: 'true',
          description: 'Whether the textarea should automatically resize based on content length.'
        },
        {
          name: 'minRows',
          type: 'number',
          default: '3',
          description: 'Minimum number of rows for the textarea. Used for initial height and auto-resize calculations.'
        },
        {
          name: 'maxRows',
          type: 'number',
          description: 'Maximum number of rows for auto-resize. When exceeded, textarea becomes scrollable.'
        },
        {
          name: 'showCharacterCount',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display character count when maxLength is set.'
        },
        {
          name: 'maxLength',
          type: 'number',
          description: 'Maximum character length. When set with showCharacterCount, displays current/max count.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the textarea is in an error state. Shows error styling.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the textarea when error is true.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the textarea, preventing user interaction.'
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Whether the textarea should take full width of its container.'
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when textarea is empty and in display mode.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use for quick, inline edits of multi-line content where context is clear',
          'Provide clear placeholder text to indicate what can be edited',
          'Use appropriate variant based on context (borderless for text-heavy, underline for forms)',
          'Implement onSave callback to persist changes',
          'Use onCancel to handle cancellation gracefully',
          'Enable autoResize for better user experience with varying content lengths',
          'Set appropriate minRows and maxRows for content expectations',
          'Show edit icon for discoverability when appropriate',
          'Use appropriate size based on surrounding content density',
          'Provide error feedback when validation fails',
          'Use Cmd/Ctrl+Enter to save (Enter creates new line)',
          'Preserve line breaks and formatting in display mode'
        ],
        dont: [
          'Don\'t use for complex forms requiring extensive validation',
          'Don\'t use when users need to see all editable fields at once',
          'Don\'t hide editability - make it clear the field can be edited',
          'Don\'t use for single-line content (use Inline Input instead)',
          'Don\'t use borderless variant when textarea needs clear visual distinction',
          'Don\'t skip onSave implementation - changes should persist',
          'Don\'t disable autoResize unless you have a specific reason',
          'Don\'t make inline textareas too small to read comfortably',
          'Don\'t use when comprehensive helper text is needed',
          'Don\'t forget to handle Escape key for cancellation',
          'Don\'t use Enter key to save (use Cmd/Ctrl+Enter instead)'
        ]
      }}
      accessibility={{
        keyboard: [
          'Click or Tab to focus and enter edit mode',
          'Cmd/Ctrl+Enter saves changes and exits edit mode',
          'Escape key cancels changes and exits edit mode',
          'Enter key creates a new line (does not save)',
          'Tab key moves focus away and saves changes',
          'Arrow keys navigate within the textarea text',
          'All standard text editing shortcuts work (Ctrl/Cmd+A, etc.)'
        ],
        screenReader: [
          'Label is announced when textarea receives focus',
          'Placeholder text is announced as a hint when empty',
          'Edit mode state is communicated when entering edit mode',
          'Error state and error message are announced when present',
          'Disabled state is announced as "disabled" or "unavailable"',
          'Value changes are announced when saved',
          'Character count is announced when showCharacterCount is enabled'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for textareas without visible labels',
          'aria-describedby linking to error message when present',
          'aria-invalid="true" when textarea is in error state',
          'aria-disabled="true" when textarea is disabled',
          'aria-readonly="true" when editable is false',
          'Consider aria-live region for value change announcements'
        ]
      }}
      relatedComponents={[
        'Inline Input',
        'TextArea',
        'Input',
        'Input Form'
      ]}
      figmaDocumentation={{
        title: 'Inline Text Area Component Documentation',
        description: 'Complete visual reference showing all inline textarea sizes, variants, states, and configurations from the design system. Includes examples of all interactive states and editing behaviors.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=146-12059',
        figmaNodeId: '146-12059',
      }}
      examples={[
        {
          title: 'Inline Text Area Editor',
          description: 'Inline text area in edit mode: multi-line field appears in place for editing descriptions, notes, or longer content. Blends with the layout when not focused and shows a clear editing state when active.',
          media: {
            type: 'image',
            url: '/examples/inline text area/Inline Text Area Editor.png',
            alt: 'Inline text area editor',
          },
          tags: ['inline', 'editor', 'multi-line'],
        },
        {
          title: 'Inline Text Area Editor (Various States)',
          description: 'Multiple states of the inline text area: display, focus, filled, and optional error or helper text. Helps choose the right variant and understand behavior across states.',
          media: {
            type: 'image',
            url: '/examples/inline text area/Inline Text Area Editor  (Various States).png',
            alt: 'Inline text area various states',
          },
          tags: ['states', 'display', 'focus', 'variants'],
        },
        {
          title: 'Inline Text Area Active',
          description: 'Inline text area in active editing state with focus indicator. User can type and add line breaks; the field may auto-resize. Clear feedback that the field is being edited.',
          media: {
            type: 'image',
            url: '/examples/inline text area/Inline Text Area Active.png',
            alt: 'Inline text area active state',
          },
          tags: ['active', 'focus', 'editing'],
        },
        {
          title: 'Inline Text Area Filled',
          description: 'Inline text area with content filled in, shown in display mode. Text appears as formatted content until the user clicks to edit. Preserves line breaks and structure.',
          media: {
            type: 'image',
            url: '/examples/inline text area/Inline Text Area Filled.png',
            alt: 'Inline text area filled with content',
          },
          tags: ['filled', 'display', 'content'],
        },
      ]}
    />
  );
};
