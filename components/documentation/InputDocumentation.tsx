import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const InputDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Input"
      category="Form"
      description="A versatile input field component that supports multiple sizes, variants, and states. Includes support for icons, dropdowns, tags, leading/trailing elements, and comprehensive validation states."
      whenToUse={[
        'Collecting text, numeric, or formatted data from users',
        'Forms requiring validation and error states',
        'Inputs that need additional context (icons, dropdowns, prefixes)',
        'Multi-value inputs like tags or chips',
        'Payment or sensitive data entry with specialized formatting',
        'Phone number inputs with country code selection',
        'URL or domain inputs with protocol prefixes'
      ]}
      whenNotToUse={[
        'For selecting from a predefined list (use Select or Dropdown instead)',
        'For multi-line text input (use Textarea instead)',
        'For rich text editing (use a rich text editor component)',
        'For file uploads (use FileUpload component)',
        'When input needs to be hidden or masked (use PasswordInput component)',
        'For simple on/off toggles (use Switch or Checkbox instead)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label',
          description: 'Optional text label displayed above the input field. Can include an info tooltip icon for additional context.'
        },
        {
          number: 2,
          name: 'Leading Element',
          description: 'Optional element positioned before the input. Can be an icon, dropdown, or static text prefix.'
        },
        {
          number: 3,
          name: 'Input Field',
          description: 'The main text input area where users type. Supports placeholder text and value binding.'
        },
        {
          number: 4,
          name: 'Trailing Element',
          description: 'Optional element positioned after the input. Can be an icon, dropdown, button, or action element.'
        },
        {
          number: 5,
          name: 'Border & Focus Ring',
          description: 'Visual indicator showing the input state. Changes color for focus, error, and disabled states.'
        },
        {
          number: 6,
          name: 'Helper Text / Error Message',
          description: 'Text displayed below the input providing guidance or error feedback. Positioned consistently across all sizes.'
        },
        {
          number: 7,
          name: 'Tags Container (Optional)',
          description: 'When using tags variant, displays removable tag chips within the input area.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard text input with optional label and helper text. Most common variant for general text entry.'
        },
        {
          name: 'Leading Icon',
          description: 'Input with an icon positioned at the start. Useful for indicating input type (email, search, etc.).'
        },
        {
          name: 'Leading Dropdown',
          description: 'Input with a dropdown selector at the start. Common for country codes, currency symbols, or prefixes.'
        },
        {
          name: 'Trailing Dropdown',
          description: 'Input with a dropdown selector at the end. Often used for units, currency, or suffix selection.'
        },
        {
          name: 'Leading Text',
          description: 'Input with static text prefix. Useful for URLs (https://), phone formats, or other fixed prefixes.'
        },
        {
          name: 'Payment Input',
          description: 'Specialized input for payment information with card icon and formatted placeholder. Includes validation patterns.'
        },
        {
          name: 'Tags Input',
          description: 'Input that displays and manages multiple tag values. Supports adding and removing tags with visual chips.'
        },
        {
          name: 'Trailing Button',
          description: 'Input with an action button at the end. Useful for copy, search, or submit actions within the input.'
        },
        {
          name: 'Phone Number',
          description: 'Dedicated phone number input with country code dropdown and formatted number entry. Includes validation.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state with neutral border color. Placeholder text is visible when empty.'
        },
        {
          name: 'Placeholder',
          description: 'Empty input showing placeholder text in a lighter color. Provides guidance on expected input format.'
        },
        {
          name: 'Filled',
          description: 'Input containing user-entered value. Border remains neutral unless in error state.'
        },
        {
          name: 'Hover',
          description: 'User hovers over the input. Border color may darken slightly to indicate interactivity.'
        },
        {
          name: 'Focused',
          description: 'Input has keyboard focus. Shows primary color border and focus ring. Cursor is visible for text entry.'
        },
        {
          name: 'Error',
          description: 'Input contains invalid data or validation failed. Red border and error message displayed below.'
        },
        {
          name: 'Disabled',
          description: 'Input is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or input.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting height, padding, and font size. 3XS (24px) to LG (44px).'
        },
        {
          name: 'variant',
          type: '"default" | "leading-icon" | "leading-dropdown" | "trailing-dropdown" | "leading-text" | "payment" | "tags" | "trailing-button" | "phone"',
          default: '"default"',
          description: 'Visual and functional variant of the input component.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed above the input field.'
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when input is empty. Should provide format guidance.'
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled input value. Use with onChange for controlled components.'
        },
        {
          name: 'onChange',
          type: '(e: ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback function invoked when input value changes.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the input is in an error state. Shows red border and error styling.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the input when error is true.'
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text displayed below the input. Shown when not in error state.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the input, preventing user interaction.'
        },
        {
          name: 'leadingIcon',
          type: 'ReactNode',
          description: 'Icon element displayed at the start of the input field.'
        },
        {
          name: 'trailingIcon',
          type: 'ReactNode',
          description: 'Icon element displayed at the end of the input field.'
        },
        {
          name: 'leadingText',
          type: 'string',
          description: 'Static text prefix displayed before the input (e.g., "https://").'
        },
        {
          name: 'leadingDropdown',
          type: '{ options: Array<{label: string, value: string}>, value: string, onChange: (value: string) => void }',
          description: 'Dropdown selector positioned at the start of the input.'
        },
        {
          name: 'trailingDropdown',
          type: '{ options: Array<{label: string, value: string}>, value: string, onChange: (value: string) => void }',
          description: 'Dropdown selector positioned at the end of the input.'
        },
        {
          name: 'trailingButton',
          type: '{ label: string, onClick: () => void }',
          description: 'Action button positioned at the end of the input.'
        },
        {
          name: 'tags',
          type: 'Array<{id: string, label: string, icon?: ReactNode}>',
          description: 'Array of tag objects to display within the input field.'
        },
        {
          name: 'onTagRemove',
          type: '(id: string) => void',
          description: 'Callback function invoked when a tag is removed.'
        },
        {
          name: 'infoTooltip',
          type: 'string',
          description: 'Tooltip text shown when hovering over the info icon next to the label.'
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Whether the input should take full width of its container.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use appropriate size variants based on form density and importance (MD for most cases)',
          'Provide clear, helpful placeholder text that shows expected format',
          'Use labels for all inputs to improve accessibility',
          'Show error messages immediately after validation fails',
          'Use leading icons to provide visual context (email icon for email inputs)',
          'Use leading/trailing dropdowns for related selections (country codes, units)',
          'Provide helper text for complex inputs or format requirements',
          'Use tags variant when users need to add/remove multiple values',
          'Use trailing buttons for common actions (copy, search) that relate to the input',
          'Ensure placeholder text is distinguishable from actual values'
        ],
        dont: [
          'Don\'t use placeholder text as the only label (always include a visible label)',
          'Don\'t use error states for validation that hasn\'t occurred yet',
          'Don\'t overload inputs with too many trailing elements',
          'Don\'t use leading text for information that should be in the label',
          'Don\'t use tags variant for single-value inputs',
          'Don\'t use payment variant for non-payment related inputs',
          'Don\'t disable inputs without clear indication of why',
          'Don\'t use multiple input variants in the same form unnecessarily',
          'Don\'t truncate error messages (allow them to wrap or expand)',
          'Don\'t use placeholder text that disappears when user starts typing for critical format information'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the input field',
          'Enter key submits form if input is within a form',
          'Arrow keys navigate within dropdowns when open',
          'Escape key closes open dropdowns',
          'Delete/Backspace removes tags when focused on tags input',
          'Type-ahead works in dropdown selects for quick selection'
        ],
        screenReader: [
          'Label is announced when input receives focus',
          'Placeholder text is announced as a hint',
          'Error state and error message are announced when present',
          'Helper text is announced when input receives focus',
          'Disabled state is announced as "disabled" or "unavailable"',
          'Required state is announced if input is marked as required',
          'Dropdown options are announced when navigating with keyboard'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for inputs without visible labels',
          'aria-describedby linking to helper text or error message',
          'aria-invalid="true" when input is in error state',
          'aria-disabled="true" when input is disabled',
          'aria-required="true" for required inputs',
          'aria-expanded on dropdown triggers',
          'role="combobox" for inputs with dropdowns',
          'aria-autocomplete for autocomplete inputs'
        ]
      }}
      relatedComponents={[
        'Textarea',
        'Select',
        'Dropdown',
        'Form',
        'Label',
        'Button'
      ]}
      figmaDocumentation={{
        title: 'Input Component Documentation',
        description: 'Complete visual reference showing all input sizes, variants, states, and configurations from the design system. Includes examples of all interactive states and special features.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=135-667989',
        figmaNodeId: '135-667989',
      }}
      examples={[
        {
          title: 'Placeholder State',
          description: 'Input field in its initial placeholder state, showing helpful guidance text that indicates the expected input format or type. The placeholder text provides context without cluttering the interface.',
          media: {
            type: 'image',
            url: '/examples/input/Placeholder.png',
            alt: 'Input field with placeholder text',
          },
          tags: ['placeholder', 'guidance', 'state'],
          critique: 'The placeholder text clearly communicates what information is expected. The subtle styling ensures it doesn\'t compete with actual input for attention. Placeholder text should be concise and provide format examples when helpful.',
        },
        {
          title: 'Filled State',
          description: 'Input field displaying user-entered content. The filled state shows the actual value entered by the user, maintaining clear readability and proper spacing.',
          media: {
            type: 'image',
            url: '/examples/input/Filled.png',
            alt: 'Input field with filled content',
          },
          tags: ['filled', 'content', 'state'],
          critique: 'The filled state clearly displays user input with good contrast and readability. The text is easy to read and edit. The border and background styling help distinguish entered content from placeholder text.',
        },
        {
          title: 'Hover State',
          description: 'Input field in hover state, showing visual feedback when the user moves their cursor over the input area. The hover state provides clear indication of interactivity.',
          media: {
            type: 'image',
            url: '/examples/input/Hover.png',
            alt: 'Input field in hover state',
          },
          tags: ['hover', 'interaction', 'feedback'],
          critique: 'The hover state provides subtle visual feedback that indicates the input is interactive. The border color change is noticeable but not distracting. This helps users understand they can interact with the field.',
        },
        {
          title: 'Focus State',
          description: 'Input field in focus state when actively receiving input. The focus state includes a border highlight and focus ring to clearly indicate the active input field.',
          media: {
            type: 'image',
            url: '/examples/input/Focus.png',
            alt: 'Input field in focus state',
          },
          tags: ['focus', 'active', 'indicator'],
          critique: 'The focus state clearly indicates which input is active with a prominent border and focus ring. The visual feedback helps users understand where they are typing. The focus ring provides good accessibility support.',
        },
        {
          title: 'Disabled State',
          description: 'Input field in disabled state, preventing user interaction. Disabled inputs are visually distinct with reduced opacity and a grayed-out appearance to indicate they are not currently available.',
          media: {
            type: 'image',
            url: '/examples/input/Disabled.png',
            alt: 'Input field in disabled state',
          },
          tags: ['disabled', 'inactive', 'state'],
          critique: 'The disabled state is clearly distinguishable from active inputs with reduced opacity and neutral styling. Users can immediately understand that the field is not available for input. The visual treatment prevents accidental interaction attempts.',
        },
        {
          title: 'Auto-Fill Functionality',
          description: 'Input field with auto-fill suggestions that appear as the user types. Auto-fill helps users complete their input faster by suggesting relevant options based on context or previous entries.',
          media: {
            type: 'image',
            url: '/examples/input/Auto-Fill.png',
            alt: 'Input field with auto-fill suggestions',
          },
          tags: ['auto-fill', 'suggestions', 'productivity'],
          critique: 'Auto-fill functionality significantly improves user experience by reducing typing effort and ensuring consistency. The suggestions appear contextually and can be easily selected. This feature is particularly useful for repetitive data entry.',
        },
        {
          title: 'Number Input',
          description: 'Specialized input field for numeric values with appropriate formatting and validation. Number inputs may include increment/decrement controls and format the value according to the expected number type.',
          media: {
            type: 'image',
            url: '/examples/input/Input Number.png',
            alt: 'Number input field',
          },
          tags: ['number', 'numeric', 'validation'],
          critique: 'The number input provides appropriate controls for numeric data entry. The formatting helps users understand the expected input type. Consider adding increment/decrement buttons for better usability with numeric values.',
        },
      ]}
    />
  );
};

