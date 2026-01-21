import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';
import { Checkbox } from '../Checkbox';

export const CheckboxDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Checkbox"
      category="Form"
      description="A versatile checkbox component supporting multiple sizes, states, and configurations. Includes support for checked, indeterminate, and error states with comprehensive interactive feedback."
      whenToUse={[
        'Selecting one or multiple options from a list',
        'Agreeing to terms and conditions',
        'Enabling or disabling features or settings',
        'Selecting items in tables or lists',
        'Multi-select scenarios where users can choose multiple options',
        'Indeterminate state for parent checkboxes in hierarchical selections',
        'Form validation with error states'
      ]}
      whenNotToUse={[
        'For selecting a single option from multiple choices (use Radio instead)',
        'For binary on/off toggles (use Switch/Toggle instead)',
        'For navigation or tab selection (use Tabs component instead)',
        'When only one option can be selected (use Radio group instead)',
        'For complex multi-level selections without clear parent-child relationships'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Checkbox Box',
          description: 'The square checkbox element that visually indicates the checked state. Size and border radius vary by size variant.'
        },
        {
          number: 2,
          name: 'Checkmark Icon',
          description: 'White checkmark icon displayed when checkbox is checked. Positioned centrally within the checkbox box.'
        },
        {
          number: 3,
          name: 'Indeterminate Icon',
          description: 'Horizontal line icon displayed when checkbox is in indeterminate state. Used for parent checkboxes in hierarchical selections.'
        },
        {
          number: 4,
          name: 'Label (Optional)',
          description: 'Text label associated with the checkbox. Can be positioned to the left or right of the checkbox.'
        },
        {
          number: 5,
          name: 'Helper Text (Optional)',
          description: 'Additional descriptive text displayed below the label. Provides context or guidance for the checkbox option.'
        },
        {
          number: 6,
          name: 'Focus Ring',
          description: 'Visual indicator shown when checkbox receives keyboard focus. Ensures accessibility compliance with purple accent color.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard checkbox with white background and gray border. Used for unchecked state in default, hover, and focus states.'
        },
        {
          name: 'Checked',
          description: 'Checkbox with purple background and white checkmark icon. Indicates the option is selected.'
        },
        {
          name: 'Indeterminate',
          description: 'Checkbox with purple background and white horizontal line icon. Used for parent checkboxes when some but not all child options are selected.'
        },
        {
          name: 'Error',
          description: 'Checkbox with red border indicating validation error. Can be combined with checked or unchecked states.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state showing the checkbox\'s base styling. Unchecked checkboxes have white background with gray border. Checked checkboxes have purple background.'
        },
        {
          name: 'Hover',
          description: 'State when user hovers over the checkbox. Unchecked checkboxes show purple background tint and purple border. Checked checkboxes show lighter purple background.'
        },
        {
          name: 'Focused',
          description: 'State when checkbox receives keyboard focus. Shows purple focus ring around the checkbox. Maintains hover styling if applicable.'
        },
        {
          name: 'Disabled',
          description: 'Checkbox is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or trigger state changes.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm" | "md" | "lg"',
          default: '"sm"',
          description: 'Size variant affecting checkbox dimensions. 3XS (10px), 2XS (12px), XS (14px), SM (16px), MD (18px), LG (20px).'
        },
        {
          name: 'checked',
          type: 'boolean',
          default: 'false',
          description: 'Whether the checkbox is checked. When true, displays checkmark icon and purple background.'
        },
        {
          name: 'indeterminate',
          type: 'boolean',
          default: 'false',
          description: 'Whether the checkbox is in indeterminate state. When true, displays horizontal line icon. Typically used for parent checkboxes in hierarchical selections.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the checkbox has an error state. When true, displays red border. Can be combined with checked or unchecked states.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Text label displayed next to the checkbox. Can be positioned to the left or right using labelPosition prop.'
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Additional descriptive text displayed below the label. Provides context or guidance for the checkbox option.'
        },
        {
          name: 'labelPosition',
          type: '"left" | "right"',
          default: '"right"',
          description: 'Position of the label relative to the checkbox. Right is the default and most common placement.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the checkbox, preventing user interaction and showing disabled styling.'
        },
        {
          name: 'onChange',
          type: '(e: ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback function invoked when checkbox state changes. Receives the change event as parameter.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the checkbox container. Allows layout and spacing customization.'
        },
        {
          name: 'labelClassName',
          type: 'string',
          description: 'Custom CSS classes applied to the label text. Allows font style overrides as specified in design system.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use appropriate size based on context (SM for most cases, larger sizes for prominent selections)',
          'Use indeterminate state for parent checkboxes in hierarchical selections',
          'Provide clear, descriptive labels for each checkbox option',
          'Use error state to indicate validation failures',
          'Use helper text to provide additional context when needed',
          'Ensure checkbox labels are concise but descriptive',
          'Use consistent checkbox styling within the same form or interface',
          'Group related checkboxes together with clear visual hierarchy',
          'Use checked state to clearly indicate selected options',
          'Provide keyboard navigation support for accessibility'
        ],
        dont: [
          'Don\'t use checkboxes for single-selection scenarios (use Radio instead)',
          'Don\'t use checkboxes for navigation (use Tabs or Links instead)',
          'Don\'t use indeterminate state without clear parent-child relationships',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t use multiple checkbox sizes unnecessarily within the same interface',
          'Don\'t use checkboxes for binary on/off toggles (use Switch instead)',
          'Don\'t hide checkboxes or make them too small to interact with easily',
          'Don\'t use checkboxes without labels or clear indication of what they control',
          'Don\'t use error state for informational messages',
          'Don\'t override default colors unless necessary for brand consistency'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the checkbox',
          'Space key toggles checkbox state when focused',
          'Focus ring is visible for keyboard navigation with purple accent color',
          'Disabled checkboxes cannot receive focus',
          'Checkboxes in forms can be navigated with Tab and activated with Space'
        ],
        screenReader: [
          'Checkbox label is announced when checkbox receives focus',
          'Checkbox state (checked, unchecked, indeterminate) is announced',
          'Error state is announced when error prop is true',
          'Disabled state is announced for disabled checkboxes',
          'Checkbox role is implicit for native checkbox input elements'
        ],
        ariaHints: [
          'aria-checked="mixed" for indeterminate checkboxes',
          'aria-invalid="true" for checkboxes with error state',
          'aria-describedby to link checkbox to helper text or error messages',
          'aria-label for checkboxes without visible labels (use sparingly)',
          'aria-disabled="true" for disabled checkboxes (though native disabled attribute is preferred)'
        ]
      }}
      relatedComponents={[
        'Radio',
        'Switch',
        'Toggle',
        'Input',
        'Form',
        'Select'
      ]}
      figmaDocumentation={{
        title: 'Checkbox Component Documentation',
        description: 'Complete visual reference showing all checkbox sizes, states, variants, and configurations from the design system. Includes examples of checked, indeterminate, error, and disabled states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5313-4402',
        figmaNodeId: '5313:4402',
      }}
      examples={[
        {
          title: 'Basic Checkbox States',
          description: 'Demonstrates all checkbox states: default unchecked, checked, indeterminate, and disabled. Shows how the checkbox appearance changes based on state.',
          code: `<Checkbox label="Option 1" />
<Checkbox label="Option 2" checked />
<Checkbox label="Option 3" indeterminate />
<Checkbox label="Option 4" disabled />`,
          tags: ['basic', 'states', 'interactive'],
        },
        {
          title: 'Checkbox Sizes',
          description: 'All available checkbox sizes from 3XS (10px) to LG (20px). Shows how checkbox dimensions scale while maintaining consistent styling.',
          code: `<Checkbox size="3xs" label="3XS" />
<Checkbox size="2xs" label="2XS" />
<Checkbox size="xs" label="XS" />
<Checkbox size="sm" label="SM" />
<Checkbox size="md" label="MD" />
<Checkbox size="lg" label="LG" />`,
          tags: ['sizes', 'variants'],
        },
        {
          title: 'Error States',
          description: 'Checkboxes with error state showing red border. Can be combined with checked or unchecked states to indicate validation errors.',
          code: `<Checkbox label="Invalid option" error />
<Checkbox label="Invalid checked option" checked error />`,
          tags: ['error', 'validation', 'states'],
        },
        {
          title: 'Label Positions',
          description: 'Checkboxes with labels positioned to the left or right. Right positioning is the default and most common.',
          code: `<Checkbox label="Label on right" labelPosition="right" />
<Checkbox label="Label on left" labelPosition="left" />`,
          tags: ['layout', 'label'],
        },
        {
          title: 'With Helper Text',
          description: 'Checkboxes with helper text providing additional context or guidance. Helper text appears below the label.',
          code: `<Checkbox 
  label="Enable notifications" 
  helperText="Receive updates about your account activity"
/>
<Checkbox 
  label="Share data" 
  helperText="Allow us to use your data for analytics"
  checked
/>`,
          tags: ['helper-text', 'guidance'],
        },
      ]}
    />
  );
};
