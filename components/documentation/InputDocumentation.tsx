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
          title: 'Command Palette Search in Linear',
          description: 'Linear uses a command palette (Cmd+K) for quick navigation and actions. The search input appears as an overlay and provides instant results as you type, with keyboard navigation support.',
          media: {
            type: 'video',
            url: '/examples/input/input-search-linear-cmdk.mp4',
            alt: 'Linear command palette search interaction',
            thumbnailUrl: '/examples/input/input-search-linear-cmdk-thumb.png',
          },
          productName: 'Linear',
          productUrl: 'https://linear.app',
          tags: ['search', 'command-palette', 'keyboard-shortcuts'],
          critique: 'The command palette is discoverable via Cmd+K and provides instant feedback. The fuzzy search works well, but could benefit from recent searches or favorites. The keyboard navigation is excellent.',
          highLevelApplication: 'HighLevel could implement a similar command palette for quick navigation between contacts, campaigns, and funnels. We could enhance it with AI-powered suggestions based on user behavior and recent activity.',
        },
        {
          title: 'Payment Form Input with Validation',
          description: 'Stripe\'s payment form demonstrates real-time validation with clear error states. The inputs format automatically and provide immediate feedback when invalid data is entered.',
          media: {
            type: 'image',
            url: '/examples/input/input-form-stripe-payment.png',
            alt: 'Stripe payment form with validation states',
          },
          productName: 'Stripe',
          productUrl: 'https://stripe.com',
          tags: ['form', 'validation', 'payment', 'error-states'],
          critique: 'Clear error messaging helps users understand what went wrong. The helper text provides format guidance before errors occur. The inline validation reduces form abandonment by catching errors early.',
          highLevelApplication: 'HighLevel forms could benefit from this validation pattern, especially in lead capture forms and onboarding flows. We could implement real-time validation for email addresses, phone numbers, and custom field formats.',
        },
        {
          title: 'Search with Autocomplete in Notion',
          description: 'Notion\'s search input provides contextual suggestions as you type, with filtering options and recent searches. The input expands to show a full search interface.',
          media: {
            type: 'gif',
            url: '/examples/input/input-search-notion.gif',
            alt: 'Notion search with autocomplete suggestions',
          },
          productName: 'Notion',
          productUrl: 'https://www.notion.so',
          tags: ['search', 'autocomplete', 'suggestions'],
          critique: 'The search suggestions are contextual and helpful. The ability to filter by page type is excellent. However, the search could benefit from keyboard shortcuts for power users.',
          highLevelApplication: 'HighLevel could use this pattern for searching across contacts, campaigns, and content. We could enhance it with AI-powered suggestions and smart filtering based on user context.',
        },
      ]}
    />
  );
};

