import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const PromptStencilDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Prompt Stencil (User Input Form)"
      category="Form"
      description="A focused user input form component designed for prompt-style input: a single text area with optional label, primary action button, and footer. Ideal for AI prompts, search commands, and single-field submission flows."
      whenToUse={[
        'AI chat or assistant prompt input areas',
        'Single-field forms where the user enters a prompt or command',
        'Search or query input with a submit action',
        'User feedback or message input with a send button',
        'Any flow that requires a multi-line prompt plus one primary action',
      ]}
      whenNotToUse={[
        'Multi-field forms (use Input Form instead)',
        'Single-line only input (use Input or Inline Input)',
        'Inline editing without a dedicated submit (use Inline Text Area)',
        'Complex forms with multiple sections and actions',
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label (Optional)',
          description: 'Optional label above the input describing what the user should enter.',
        },
        {
          number: 2,
          name: 'Prompt input (Text Area)',
          description: 'Multi-line text area with prompt-input variant. Supports auto-resize, character count, and error state.',
        },
        {
          number: 3,
          name: 'Primary action (Optional)',
          description: 'Optional submit button shown when onSubmit is provided. Typically "Submit" or "Send".',
        },
        {
          number: 4,
          name: 'Footer (Optional)',
          description: 'Optional footer slot for helper text, character count, or secondary actions.',
        },
      ]}
      variants={[
        {
          name: 'With label',
          description: 'Label above the input to clarify the prompt purpose.',
        },
        {
          name: 'With submit button',
          description: 'Primary action button below the input when onSubmit is provided.',
        },
        {
          name: 'With footer',
          description: 'Custom footer content such as hints, links, or secondary controls.',
        },
        {
          name: 'With character count',
          description: 'Shows current and max character count when maxLength and showCharacterCount are set.',
        },
        {
          name: 'Sizes',
          description: 'SM, MD, and LG sizes for input and button to match context.',
        },
      ]}
      states={[
        {
          name: 'Default',
          description: 'Ready for input. Text area is focusable and the submit button is enabled when provided.',
        },
        {
          name: 'Disabled',
          description: 'Input and submit button are disabled. Use when the flow is not yet available or after submission.',
        },
        {
          name: 'Error',
          description: 'Error state with error message below the input. Use for validation or server errors.',
        },
      ]}
      props={[
        {
          name: 'label',
          type: 'string',
          description: 'Optional label displayed above the input.',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: '"Enter your prompt..."',
          description: 'Placeholder text for the text area.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value for the input.',
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: 'Called when the input value changes. Receives the new string value.',
        },
        {
          name: 'onSubmit',
          type: '() => void',
          description: 'When provided, a primary action button is shown. Called when the user clicks the button.',
        },
        {
          name: 'submitLabel',
          type: 'string',
          default: '"Submit"',
          description: 'Label for the submit button when onSubmit is provided.',
        },
        {
          name: 'footer',
          type: 'ReactNode',
          description: 'Optional footer content below the input and button.',
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size of the input and submit button.',
        },
        {
          name: 'minRows',
          type: 'number',
          default: '3',
          description: 'Minimum number of visible rows for the text area.',
        },
        {
          name: 'maxRows',
          type: 'number',
          default: '8',
          description: 'Maximum rows when autoResize is true.',
        },
        {
          name: 'showCharacterCount',
          type: 'boolean',
          default: 'false',
          description: 'Show character count when maxLength is set.',
        },
        {
          name: 'maxLength',
          type: 'number',
          description: 'Maximum allowed character length. Use with showCharacterCount to display count.',
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text displayed below the input.',
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'When true, shows error styling and errorMessage.',
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message shown when error is true.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the input and submit button.',
        },
        {
          name: 'autoResize',
          type: 'boolean',
          default: 'true',
          description: 'Text area grows with content up to maxRows.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes for the container.',
        },
        {
          name: 'id',
          type: 'string',
          description: 'Optional id for the text area (for form association and accessibility).',
        },
      ]}
      usageGuidelines={{
        do: [
          'Use for single prompt/command input with one primary action',
          'Provide a clear label or placeholder so users know what to enter',
          'Use submitLabel that matches the action (e.g. "Send", "Search", "Generate")',
          'Use footer for hints, limits, or links when helpful',
          'Use error and errorMessage for validation or API errors',
          'Use disabled during submission or when the flow is unavailable',
        ],
        dont: [
          "Don't use for multi-field forms; use Input Form instead",
          "Don't use for single-line only; use Input or Inline Input",
          "Don't overload the footer; keep it short",
          "Don't use without placeholder or label unless context is obvious",
        ],
      }}
      accessibility={{
        keyboard: [
          'Tab moves focus to the text area, then to the submit button if present',
          'Enter in the text area inserts newline; use submit button or form submit to submit',
          'Standard text area keyboard navigation applies',
        ],
        screenReader: [
          'Label is associated with the input when id and label are provided',
          'Error message is announced when error is true',
          'Submit button has clear accessible name via submitLabel',
        ],
        ariaHints: [
          'Provide id and label for proper association',
          'Use aria-describedby for helper text or error message when appropriate',
          'Use aria-invalid on the text area when error is true',
        ],
      }}
      relatedComponents={['Text Area', 'Input', 'Input Form', 'Inline Text Area', 'Button', 'Voice Input']}
      figmaDocumentation={{
        title: 'Prompt Stencil (User Input Form)',
        description: 'Design reference for the Prompt Stencil component including layout, sizes, and states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5620-8676',
        figmaNodeId: '5620-8676',
      }}
      examples={[
        {
          title: 'Prompt Stencil Example',
          description: 'Focused prompt input form with a single text area and primary action button. Ideal for AI prompts, search commands, or single-field submission. Label and footer are optional.',
          media: {
            type: 'image',
            url: '/examples/prompt stencil/Prompt Stencil Example.png',
            alt: 'Prompt stencil example',
          },
          tags: ['prompt', 'form', 'submit'],
        },
        {
          title: 'Various Questions',
          description: 'Prompt Stencil used for different question types or placeholders. Shows how one component can support multiple prompt styles and contexts with consistent layout.',
          media: {
            type: 'image',
            url: '/examples/prompt stencil/Various Questions.png',
            alt: 'Prompt stencil various questions',
          },
          tags: ['questions', 'variants', 'placeholder'],
        },
        {
          title: 'Various Questions 2',
          description: 'Alternate prompt Stencil layout or placeholder set. Reinforces flexibility for AI chat, feedback, or command input with a single text area and action.',
          media: {
            type: 'image',
            url: '/examples/prompt stencil/Various Questions 2.png',
            alt: 'Prompt stencil various questions 2',
          },
          tags: ['questions', 'prompt', 'input'],
        },
        {
          title: 'Various Questions 3',
          description: 'Another variation of prompt-style input. Useful for comparing label, placeholder, and footer usage across different use cases.',
          media: {
            type: 'image',
            url: '/examples/prompt stencil/Various Questions 3.png',
            alt: 'Prompt stencil various questions 3',
          },
          tags: ['questions', 'variations', 'form'],
        },
        {
          title: 'Various Questions 4',
          description: 'Additional example of the Prompt Stencil in context. Demonstrates how the component fits into different flows and screen layouts.',
          media: {
            type: 'image',
            url: '/examples/prompt stencil/Various Questions 4.png',
            alt: 'Prompt stencil various questions 4',
          },
          tags: ['questions', 'context', 'layout'],
        },
      ]}
    />
  );
};
