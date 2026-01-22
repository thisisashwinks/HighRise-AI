import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const RadioGroupDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Radio Group"
      category="Form"
      description="A group component for displaying multiple radio buttons together with consistent styling and behavior. Supports horizontal and vertical layouts, optional labels and hint text, and comprehensive state management including disabled and error states. Only one radio button in a group can be selected at a time."
      whenToUse={[
        'Displaying multiple related radio button options together',
        'Forms requiring single selection from a set of options',
        'Settings panels with mutually exclusive choices',
        'Filter interfaces with single-selectable criteria',
        'Preference selection where only one option can be chosen',
        'When you need consistent spacing and alignment across multiple radio buttons',
        'Grouping related radio button options with a shared label or context'
      ]}
      whenNotToUse={[
        'For single radio button selection (use Radio component directly)',
        'For multiple-selection scenarios (use Checkbox group instead)',
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
          name: 'Radio Button Options',
          description: 'Individual radio button components arranged in horizontal or vertical layout. Each radio can have its own label and helper text.'
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
          description: 'One radio button in the group is selected. Selecting a new option automatically deselects the previously selected one.'
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
          description: 'Array of radio button options to display. Each option includes value, label, optional helperText, and disabled properties.'
        },
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm"',
          default: '"sm"',
          description: 'Size variant affecting all radio buttons in the group. 3XS (10px), 2XS (12px), XS (14px), SM (16px).'
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
          description: 'Selected radio button value. Controls which radio button is checked. Only one value can be selected at a time.'
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: 'Callback function invoked when any radio button state changes. Receives the newly selected value.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the radio group container. Allows layout and spacing customization.'
        },
        {
          name: 'name',
          type: 'string',
          description: 'Required HTML name attribute for form submission. All radio buttons in the group share this name to ensure mutual exclusivity.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use horizontal layout for compact spaces and when labels are short',
          'Use vertical layout for longer labels, mobile interfaces, and better accessibility',
          'Provide clear, descriptive labels for the group and individual options',
          'Use hint text to provide context or guidance for the entire group',
          'Use error state with clear error messaging in hint text',
          'Ensure consistent spacing between radio buttons',
          'Use appropriate size based on context and available space',
          'Group related options logically together',
          'Always provide a name attribute for proper form behavior',
          'Use disabled state for entire groups when appropriate'
        ],
        dont: [
          'Don\'t use radio groups for multiple-selection scenarios (use Checkbox group)',
          'Don\'t mix unrelated radio buttons in the same group',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t use horizontal layout when labels are too long or space is limited',
          'Don\'t use multiple radio sizes within the same group',
          'Don\'t use radio groups without a name attribute',
          'Don\'t hide the group label when it provides important context',
          'Don\'t use radio groups for navigation (use Tabs or Links instead)',
          'Don\'t use radio groups without proper form labels for accessibility',
          'Don\'t override default spacing unnecessarily'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the radio group',
          'Arrow keys (Up/Down or Left/Right) navigate between radio buttons in the group',
          'Space key selects the focused radio button',
          'Focus ring is visible for keyboard navigation',
          'Disabled radio buttons cannot receive focus',
          'Group maintains logical tab order'
        ],
        screenReader: [
          'Group label is announced when group receives focus',
          'Individual radio button labels are announced when each radio receives focus',
          'Radio state (checked/unchecked) is announced',
          'Radio group name and position (e.g., "Option 1 of 3") is announced',
          'Error state is announced when error prop is true',
          'Disabled state is announced for disabled radio buttons',
          'Hint text is associated with the group via aria-describedby'
        ],
        ariaHints: [
          'role="group" or fieldset for the radio group container',
          'aria-labelledby linking group to label',
          'aria-describedby linking group to hint text',
          'aria-invalid="true" for groups with error state',
          'aria-disabled="true" for disabled groups',
          'Proper name attributes for form submission and mutual exclusivity'
        ]
      }}
      relatedComponents={[
        'Radio',
        'RadioCard',
        'Checkbox',
        'Select',
        'Input',
        'Form'
      ]}
      figmaDocumentation={{
        title: 'Radio Group Component Documentation',
        description: 'Complete visual reference showing all radio group sizes, directions, states, and configurations from the design system. Includes examples of horizontal and vertical layouts, label and hint text variations, and error states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5328-27167',
        figmaNodeId: '5328:27167',
      }}
      examples={[]}
    />
  );
};
