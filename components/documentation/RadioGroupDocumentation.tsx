import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';
import { RadioGroup } from '../RadioGroup';

export const RadioGroupDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Radio Group"
      category="Form"
      description="A group component for displaying multiple radio buttons together with consistent styling and behavior. Supports horizontal and vertical layouts, optional labels and hint text, and comprehensive state management including disabled and error states. Ensures only one option can be selected at a time."
      whenToUse={[
        'Displaying multiple related radio options together',
        'Forms requiring single selection from a set of options',
        'Settings panels with mutually exclusive options',
        'Filter interfaces with single-select criteria',
        'Preference selection where only one option can be chosen',
        'When you need consistent spacing and alignment across multiple radio buttons',
        'Grouping related radio options with a shared label or context'
      ]}
      whenNotToUse={[
        'For single radio button selection (use Radio component directly)',
        'For multi-select scenarios (use Checkbox group instead)',
        'When radio buttons are unrelated and don\'t need grouping',
        'For complex nested radio hierarchies (use RadioCard or custom layout)',
        'When each radio button needs completely independent styling or behavior'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Group Label (Optional)',
          description: 'Text label displayed above the radio group. Provides context for the group of options.'
        },
        {
          number: 2,
          name: 'Radio Options',
          description: 'Individual radio button components arranged in horizontal or vertical layout. Each radio can have its own label and helper text. All radios share the same name attribute for mutual exclusivity.'
        },
        {
          number: 3,
          name: 'Hint Text (Optional)',
          description: 'Additional descriptive text displayed below the radio group. Provides guidance or context for the entire group.'
        }
      ]}
      variants={[
        {
          name: 'Horizontal',
          description: 'Radio buttons arranged in a horizontal row with wrapping support. Best for compact layouts and when space allows.'
        },
        {
          name: 'Vertical',
          description: 'Radio buttons arranged in a vertical column. Best for longer labels, mobile layouts, and when vertical space is preferred.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state showing all radio buttons in their default unselected state. Group label and hint text are displayed normally.'
        },
        {
          name: 'Selected',
          description: 'One radio button is selected. Only one radio in the group can be selected at a time. Selecting a new radio automatically deselects the previously selected one.'
        },
        {
          name: 'Disabled',
          description: 'Entire group is disabled, preventing interaction with all radio buttons. Individual options can also be disabled independently.'
        },
        {
          name: 'Error',
          description: 'Group has an error state indicated by red styling on radio buttons and hint text. Used for validation feedback.'
        }
      ]}
      props={[
        {
          name: 'options',
          type: 'Array<RadioOption>',
          description: 'Array of radio options to display. Each option includes value, label, optional helperText, and disabled properties.'
        },
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm" | "md" | "lg"',
          default: '"sm"',
          description: 'Size variant affecting all radio buttons in the group. 3XS (10px), 2XS (12px), XS (14px), SM (16px), MD (18px), LG (20px).'
        },
        {
          name: 'direction',
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: 'Layout direction for the radio group. Horizontal arranges radio buttons in a row, vertical stacks them.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label displayed above the radio group. Provides context for the entire group of options.'
        },
        {
          name: 'hintText',
          type: 'string',
          description: 'Optional hint text displayed below the radio group. Provides guidance or additional context for the group.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the entire radio group, preventing interaction with all radio buttons.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Applies error styling to all radio buttons in the group. Used for validation feedback.'
        },
        {
          name: 'value',
          type: 'string',
          description: 'The value of the currently selected radio button. Controls which radio is checked. Only one value can be selected at a time.'
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: 'Callback function invoked when any radio button selection changes. Receives the value of the newly selected radio.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the radio group container. Allows layout and spacing customization.'
        },
        {
          name: 'name',
          type: 'string',
          description: 'Required HTML name attribute for form submission and radio group behavior. All radio buttons in the group share this name to ensure mutual exclusivity.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Always provide a name attribute to group radio buttons together',
          'Use horizontal layout for compact spaces and when labels are short',
          'Use vertical layout for longer labels, mobile interfaces, and better accessibility',
          'Provide clear, descriptive labels for the group and individual options',
          'Use hint text to provide context or guidance for the entire group',
          'Use error state with clear error messaging in hint text',
          'Ensure consistent spacing between radio buttons',
          'Use appropriate size based on context and available space',
          'Group related options logically together',
          'Use disabled state for entire groups when appropriate',
          'Allow individual option disabling when some options are conditionally unavailable',
          'Ensure only one option can be selected at a time'
        ],
        dont: [
          'Don\'t use radio groups for multi-select scenarios (use Checkbox group)',
          'Don\'t use radio groups without providing a name attribute',
          'Don\'t mix unrelated radio buttons in the same group',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t use multiple radio groups with the same name on the same page',
          'Don\'t allow multiple selections within a single radio group',
          'Don\'t use inconsistent spacing or sizing within a group',
          'Don\'t disable groups without explaining why they\'re unavailable',
          'Don\'t use radio groups when a single radio button would suffice',
          'Don\'t create groups with too many options - consider using Select or Dropdown instead'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the radio group',
          'Arrow keys (Up/Down or Left/Right) navigate between radio buttons in the group',
          'Space key selects the focused radio button',
          'Focus ring is visible for keyboard navigation',
          'Disabled groups cannot receive focus',
          'Radio buttons are keyboard accessible and properly grouped'
        ],
        screenReader: [
          'Group label is announced when group receives focus',
          'Radio label and state are announced when individual radio receives focus',
          'Radio group name and position (e.g., "Option 1 of 3") is announced',
          'Error state is announced when present',
          'Disabled state is announced when group or individual option is disabled',
          'Selected state is clearly announced'
        ],
        ariaHints: [
          'role="radiogroup" on the container',
          'aria-labelledby links group to label',
          'aria-describedby links group to hint text',
          'aria-invalid indicates error state',
          'aria-disabled indicates disabled state',
          'name attribute groups radio buttons for mutual exclusivity',
          'fieldset and legend elements can be used for semantic grouping'
        ]
      }}
      relatedComponents={[
        'Radio',
        'Radio Card',
        'Checkbox Group',
        'Select',
        'Dropdown'
      ]}
      figmaDocumentation={{
        title: 'Radio Group Component Documentation',
        description: 'Complete visual reference showing all radio group variants, states, and configurations from the design system. Includes examples with horizontal/vertical layouts, labels, hint text, and error states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5332-32052',
        figmaNodeId: '5332:32052',
      }}
      examples={[
        {
          title: 'Basic Radio Group',
          description: 'Simple radio group with three options. Only one option can be selected at a time.',
          code: `<RadioGroup
  name="payment"
  options={[
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' }
  ]}
  value={selectedPayment}
  onChange={setSelectedPayment}
/>`,
          tags: ['basic', 'selection'],
        },
        {
          title: 'With Label and Hint Text',
          description: 'Radio group with a group label and hint text providing context for the selection.',
          code: `<RadioGroup
  name="notification"
  label="Notification Preference"
  hintText="Choose how you want to receive notifications"
  options={[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notifications' }
  ]}
  value={selectedNotification}
  onChange={setSelectedNotification}
/>`,
          tags: ['label', 'hint-text', 'guidance'],
        },
        {
          title: 'Vertical Layout',
          description: 'Radio group arranged vertically, ideal for longer labels or mobile interfaces.',
          code: `<RadioGroup
  name="plan"
  direction="vertical"
  options={[
    { value: 'basic', label: 'Basic Plan', helperText: 'Perfect for individuals' },
    { value: 'pro', label: 'Pro Plan', helperText: 'Best for small teams' },
    { value: 'enterprise', label: 'Enterprise Plan', helperText: 'For large organizations' }
  ]}
  value={selectedPlan}
  onChange={setSelectedPlan}
/>`,
          tags: ['layout', 'vertical'],
        },
        {
          title: 'Error State',
          description: 'Radio group with error state indicating validation failure.',
          code: `<RadioGroup
  name="gender"
  label="Gender"
  error={true}
  hintText="Please select a gender"
  options={[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ]}
  value={selectedGender}
  onChange={setSelectedGender}
/>`,
          tags: ['error', 'validation'],
        },
        {
          title: 'Disabled State',
          description: 'Radio group with some options disabled. Entire group can also be disabled.',
          code: `<RadioGroup
  name="subscription"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Premium', disabled: true },
    { value: 'enterprise', label: 'Enterprise' }
  ]}
  disabled={isLoading}
  value={selectedSubscription}
  onChange={setSelectedSubscription}
/>`,
          tags: ['disabled', 'states'],
        },
      ]}
    />
  );
};
