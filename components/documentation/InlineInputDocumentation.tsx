import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const InlineInputDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Inline Input"
      category="Form"
      description="A compact, inline-editable input component that allows users to edit text directly in place without switching to a separate edit mode. Perfect for inline editing, minimal forms, and contexts where space is limited."
      whenToUse={[
        'Editing text inline within content or tables',
        'Minimal forms where space is at a premium',
        'Quick edits that don\'t require a full form context',
        'Settings pages with compact input fields',
        'Inline data editing in lists or cards',
        'Contexts where the input should blend with surrounding text',
        'Editable labels or titles that users can click to modify'
      ]}
      whenNotToUse={[
        'Complex forms requiring validation and error states (use Input instead)',
        'Multi-line text editing (use Textarea or Inline Text Area Editor)',
        'Inputs that need prominent visual distinction',
        'When users need clear visual indication of editable fields before interaction',
        'Forms requiring comprehensive helper text and guidance',
        'Inputs that need leading/trailing icons or dropdowns (use Input component)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label (Optional)',
          description: 'Optional text label displayed inline with the input. Can be positioned left, right, or inline with the value.'
        },
        {
          number: 2,
          name: 'Display Value',
          description: 'The current value displayed when not in edit mode. Shows placeholder text when empty.'
        },
        {
          number: 3,
          name: 'Edit Icon (Optional)',
          description: 'Optional icon that appears on hover to indicate the field is editable.'
        },
        {
          number: 4,
          name: 'Input Field',
          description: 'The actual input field that appears when editing. Styling varies based on variant (borderless, underline, minimal, or default).'
        },
        {
          number: 5,
          name: 'Focus Indicator',
          description: 'Visual indicator showing the input is active. Style depends on variant (ring, border, underline, or background change).'
        },
        {
          number: 6,
          name: 'Error Message (Optional)',
          description: 'Error text displayed below the input when validation fails.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard inline input with border that appears on focus. Most common variant for general inline editing.'
        },
        {
          name: 'Borderless',
          description: 'Input with no visible border until focused. Blends seamlessly with surrounding content.'
        },
        {
          name: 'Underline',
          description: 'Input with underline border style. Common for inline editing in text-heavy contexts.'
        },
        {
          name: 'Minimal',
          description: 'Minimal styling with subtle background change on focus. Most unobtrusive variant.'
        }
      ]}
      states={[
        {
          name: 'Display',
          description: 'Initial state showing the current value as text. Appears as regular text until clicked.'
        },
        {
          name: 'Hover',
          description: 'When hovering over an editable field, an edit icon may appear to indicate editability.'
        },
        {
          name: 'Editing',
          description: 'Active editing state where the input field is visible and focused. User can type and modify the value.'
        },
        {
          name: 'Focused',
          description: 'Input has keyboard focus. Shows focus indicator based on variant (ring, border highlight, underline, or background).'
        },
        {
          name: 'Error',
          description: 'Input contains invalid data. Shows error styling (red border/underline) and error message if provided.'
        },
        {
          name: 'Disabled',
          description: 'Input is not editable. Appears grayed out and cannot receive focus or input.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting height, padding, and font size. XS (24px) to LG (36px).'
        },
        {
          name: 'variant',
          type: '"default" | "borderless" | "underline" | "minimal"',
          default: '"default"',
          description: 'Visual variant of the inline input component.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed inline with the input.'
        },
        {
          name: 'labelPosition',
          type: '"left" | "right" | "inline"',
          default: '"left"',
          description: 'Position of the label relative to the input field.'
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled input value. Use with onChange for controlled components.'
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'Default value for uncontrolled components.'
        },
        {
          name: 'onChange',
          type: '(e: ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback function invoked when input value changes during editing.'
        },
        {
          name: 'onSave',
          type: '(value: string) => void',
          description: 'Callback function invoked when the user saves changes (Enter key or blur).'
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
          description: 'Whether the input can be edited. When false, behaves as read-only text.'
        },
        {
          name: 'showEditIcon',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show an edit icon on hover when not editing.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the input is in an error state. Shows error styling.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the input when error is true.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the input, preventing user interaction.'
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Whether the input should take full width of its container.'
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when input is empty and in display mode.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use for quick, inline edits where context is clear',
          'Provide clear placeholder text to indicate what can be edited',
          'Use appropriate variant based on context (borderless for text-heavy, underline for forms)',
          'Implement onSave callback to persist changes',
          'Use onCancel to handle cancellation gracefully',
          'Show edit icon for discoverability when appropriate',
          'Use appropriate size based on surrounding content density',
          'Provide error feedback when validation fails',
          'Use inline label position when space is limited',
          'Ensure the input is clearly editable (hover states, edit icons)'
        ],
        dont: [
          'Don\'t use for complex forms requiring extensive validation',
          'Don\'t use when users need to see all editable fields at once',
          'Don\'t hide editability - make it clear the field can be edited',
          'Don\'t use for multi-line content (use Textarea instead)',
          'Don\'t use borderless variant when input needs clear visual distinction',
          'Don\'t skip onSave implementation - changes should persist',
          'Don\'t use for inputs requiring dropdowns or icons (use Input component)',
          'Don\'t make inline inputs too small to read comfortably',
          'Don\'t use when comprehensive helper text is needed',
          'Don\'t forget to handle Escape key for cancellation'
        ]
      }}
      accessibility={{
        keyboard: [
          'Click or Tab to focus and enter edit mode',
          'Enter key saves changes and exits edit mode',
          'Escape key cancels changes and exits edit mode',
          'Tab key moves focus away and saves changes',
          'Arrow keys navigate within the input text',
          'All standard text editing shortcuts work (Ctrl/Cmd+A, etc.)'
        ],
        screenReader: [
          'Label is announced when input receives focus',
          'Placeholder text is announced as a hint when empty',
          'Edit mode state is communicated when entering edit mode',
          'Error state and error message are announced when present',
          'Disabled state is announced as "disabled" or "unavailable"',
          'Value changes are announced when saved'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for inputs without visible labels',
          'aria-describedby linking to error message when present',
          'aria-invalid="true" when input is in error state',
          'aria-disabled="true" when input is disabled',
          'aria-readonly="true" when editable is false',
          'Consider aria-live region for value change announcements'
        ]
      }}
      relatedComponents={[
        'Input',
        'Textarea',
        'Inline Text Area Editor',
        'Input Form'
      ]}
      figmaDocumentation={{
        title: 'Inline Input Component Documentation',
        description: 'Complete visual reference showing all inline input sizes, variants, states, and configurations from the design system. Includes examples of all interactive states and editing behaviors.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=50-10307',
        figmaNodeId: '50-10307',
      }}
      examples={[
        {
          title: 'Inline Text Editor',
          description: 'Inline text editor for editing a single line of text in place. The value appears as text until focused, then becomes an editable input. Fits tables, lists, and compact forms.',
          media: {
            type: 'image',
            url: '/examples/inline text editor/Inline Text Editor.png',
            alt: 'Inline text editor',
          },
          tags: ['inline', 'editor', 'single-line'],
        },
        {
          title: 'Inline Text Editor (Various States)',
          description: 'Inline text editor in multiple states: display, hover, focus, filled, and optional error. Shows how the component looks and behaves across the full interaction cycle.',
          media: {
            type: 'image',
            url: '/examples/inline text editor/Inline Text Editor  (Various States).png',
            alt: 'Inline text editor various states',
          },
          tags: ['states', 'display', 'focus', 'variants'],
        },
        {
          title: 'Inline Badge',
          description: 'Inline-editable badge or label. Short text can be edited in place, useful for tags, names, or small labels that need quick updates without opening a form.',
          media: {
            type: 'image',
            url: '/examples/inline text editor/Inline Badge.png',
            alt: 'Inline badge editable',
          },
          tags: ['badge', 'inline', 'label'],
        },
        {
          title: 'Inline Phone Number',
          description: 'Inline text editor used for a phone number or other formatted single-line value. Same inline-edit behavior with context-appropriate placeholder or formatting.',
          media: {
            type: 'image',
            url: '/examples/inline text editor/Inline Phone Number.png',
            alt: 'Inline phone number editor',
          },
          tags: ['phone', 'inline', 'formatted'],
        },
      ]}
    />
  );
};
