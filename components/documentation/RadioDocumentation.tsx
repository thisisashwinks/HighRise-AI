import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const RadioDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Radio"
      category="Form"
      description="A versatile radio button component supporting multiple sizes, states, and configurations. Used for single-selection scenarios where only one option can be selected from a group. Includes support for checked, error, and disabled states with comprehensive interactive feedback."
      whenToUse={[
        'Selecting a single option from multiple choices',
        'Form fields requiring exclusive selection (e.g., gender, payment method)',
        'Settings or preferences where only one option applies',
        'Wizard or step-by-step forms with single-choice questions',
        'Filtering or sorting options where only one can be active',
        'Radio groups where selecting one option deselects others'
      ]}
      whenNotToUse={[
        'For selecting multiple options (use Checkbox instead)',
        'For binary on/off toggles (use Switch/Toggle instead)',
        'For navigation or tab selection (use Tabs component instead)',
        'When users need to select zero options (use Checkbox instead)',
        'For complex multi-level selections without clear single-choice requirement'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Radio Circle',
          description: 'The circular radio button element that visually indicates the selected state. Size varies by size variant.'
        },
        {
          number: 2,
          name: 'Radio Dot',
          description: 'White filled dot displayed in the center when radio is selected. Positioned centrally within the radio circle.'
        },
        {
          number: 3,
          name: 'Label (Optional)',
          description: 'Text label associated with the radio button. Can be positioned to the left or right of the radio.'
        },
        {
          number: 4,
          name: 'Helper Text (Optional)',
          description: 'Additional descriptive text displayed below the label. Provides context or guidance for the radio option.'
        },
        {
          number: 5,
          name: 'Focus Ring',
          description: 'Visual indicator shown when radio receives keyboard focus. Ensures accessibility compliance with purple accent color.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard radio button with white background and gray border. Used for unselected state in default, hover, and focus states.'
        },
        {
          name: 'Checked',
          description: 'Radio button with purple background and white dot in the center. Indicates the option is selected.'
        },
        {
          name: 'Error',
          description: 'Radio button with red border indicating validation error. Can be combined with checked or unchecked states.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state showing the radio button\'s base styling. Unselected radios have white background with gray border. Selected radios have purple background with white dot.'
        },
        {
          name: 'Hover',
          description: 'State when user hovers over the radio button. Unselected radios show purple background tint and purple border. Selected radios show lighter purple background.'
        },
        {
          name: 'Focused',
          description: 'State when radio receives keyboard focus. Shows purple focus ring around the radio. Maintains hover styling if applicable.'
        },
        {
          name: 'Disabled',
          description: 'Radio is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or trigger state changes.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm" | "md" | "lg"',
          default: '"sm"',
          description: 'Size variant affecting radio dimensions. 3XS (10px), 2XS (12px), XS (14px), SM (16px), MD (18px), LG (20px).'
        },
        {
          name: 'checked',
          type: 'boolean',
          default: 'false',
          description: 'Whether the radio button is checked. When true, displays white dot and purple background.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the radio button has an error state. When true, displays red border. Can be combined with checked or unchecked states.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Text label displayed next to the radio button. Can be positioned to the left or right using labelPosition prop.'
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Additional descriptive text displayed below the label. Provides context or guidance for the radio option.'
        },
        {
          name: 'labelPosition',
          type: '"left" | "right"',
          default: '"right"',
          description: 'Position of the label relative to the radio button. Right is the default and most common placement.'
        },
        {
          name: 'name',
          type: 'string',
          description: 'Required for radio groups. All radio buttons in the same group must share the same name attribute to ensure mutual exclusivity.'
        },
        {
          name: 'value',
          type: 'string',
          description: 'The value of the radio button. Used when the radio is part of a form to identify which option was selected.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the radio button, preventing user interaction and showing disabled styling.'
        },
        {
          name: 'onChange',
          type: '(e: ChangeEvent<HTMLInputElement>) => void',
          description: 'Callback function invoked when radio state changes. Receives the change event as parameter.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the radio container. Allows layout and spacing customization.'
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
          'Always use radio buttons in groups with the same name attribute',
          'Provide clear, descriptive labels for each radio option',
          'Use error state to indicate validation failures',
          'Use helper text to provide additional context when needed',
          'Ensure radio labels are concise but descriptive',
          'Use consistent radio styling within the same form or interface',
          'Group related radio buttons together with clear visual hierarchy',
          'Use checked state to clearly indicate selected option',
          'Provide keyboard navigation support for accessibility'
        ],
        dont: [
          'Don\'t use radio buttons for multiple-selection scenarios (use Checkbox instead)',
          'Don\'t use radio buttons without grouping them with the same name attribute',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t use multiple radio sizes unnecessarily within the same interface',
          'Don\'t use radio buttons for binary on/off toggles (use Switch instead)',
          'Don\'t hide radio buttons or make them too small to interact with easily',
          'Don\'t use radio buttons without labels or clear indication of what they control',
          'Don\'t use error state for informational messages',
          'Don\'t override default colors unless necessary for brand consistency',
          'Don\'t use radio buttons for navigation (use Tabs or Links instead)'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the radio button',
          'Arrow keys (Up/Down or Left/Right) navigate between radio buttons in the same group',
          'Space key selects the focused radio button',
          'Focus ring is visible for keyboard navigation with purple accent color',
          'Disabled radio buttons cannot receive focus',
          'Radio buttons in forms can be navigated with Tab and arrow keys'
        ],
        screenReader: [
          'Radio label is announced when radio receives focus',
          'Radio state (checked, unchecked) is announced',
          'Radio group name and position (e.g., "Option 1 of 3") is announced',
          'Error state is announced when error prop is true',
          'Disabled state is announced for disabled radio buttons',
          'Radio role is implicit for native radio input elements'
        ],
        ariaHints: [
          'aria-invalid="true" for radio buttons with error state',
          'aria-describedby to link radio to helper text or error messages',
          'aria-label for radio buttons without visible labels (use sparingly)',
          'aria-disabled="true" for disabled radio buttons (though native disabled attribute is preferred)',
          'fieldset and legend elements for grouping related radio buttons'
        ]
      }}
      relatedComponents={[
        'Checkbox',
        'Switch',
        'Toggle',
        'Input',
        'Form',
        'Select'
      ]}
      figmaDocumentation={{
        title: 'Radio Component Documentation',
        description: 'Complete visual reference showing all radio sizes, states, variants, and configurations from the design system. Includes examples of checked, error, and disabled states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5328-27167',
        figmaNodeId: '5328:27167',
      }}
      examples={[]}
    />
  );
};
