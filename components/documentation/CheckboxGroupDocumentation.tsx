import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const CheckboxGroupDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Checkbox Group"
      category="Form"
      description="A group component for displaying multiple checkboxes together with consistent styling and behavior. Supports horizontal and vertical layouts, optional labels and hint text, and comprehensive state management including disabled and error states."
      whenToUse={[
        'Displaying multiple related checkbox options together',
        'Forms requiring multiple selections from a set of options',
        'Settings panels with multiple toggleable options',
        'Filter interfaces with multiple selectable criteria',
        'Preference selection where users can choose multiple options',
        'When you need consistent spacing and alignment across multiple checkboxes',
        'Grouping related checkbox options with a shared label or context'
      ]}
      whenNotToUse={[
        'For single checkbox selection (use Checkbox component directly)',
        'For single-selection scenarios (use Radio group instead)',
        'When checkboxes are unrelated and don\'t need grouping',
        'For complex nested checkbox hierarchies (use CheckboxCard or custom layout)',
        'When each checkbox needs completely independent styling or behavior'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Group Label (Optional)',
          description: 'Text label displayed above the checkbox group. Provides context for the group of options.'
        },
        {
          number: 2,
          name: 'Checkbox Options',
          description: 'Individual checkbox components arranged in horizontal or vertical layout. Each checkbox can have its own label and helper text.'
        },
        {
          number: 3,
          name: 'Hint Text (Optional)',
          description: 'Additional descriptive text displayed below the checkbox group. Provides guidance or context for the entire group.'
        }
      ]}
      variants={[
        {
          name: 'Horizontal',
          description: 'Checkboxes arranged in a horizontal row with wrapping support. Best for compact layouts and when space allows.'
        },
        {
          name: 'Vertical',
          description: 'Checkboxes arranged in a vertical column. Best for longer labels, mobile layouts, and when vertical space is preferred.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state showing all checkboxes in their default unchecked state. Group label and hint text are displayed normally.'
        },
        {
          name: 'Disabled',
          description: 'Entire group is disabled, preventing interaction with all checkboxes. Individual options can also be disabled independently.'
        },
        {
          name: 'Error',
          description: 'Group has an error state indicated by red styling on checkboxes and hint text. Used for validation feedback.'
        },
        {
          name: 'Mixed Selection',
          description: 'Some checkboxes are checked while others are unchecked. Normal state for multi-select scenarios.'
        }
      ]}
      props={[
        {
          name: 'options',
          type: 'Array<CheckboxOption>',
          description: 'Array of checkbox options to display. Each option includes value, label, optional helperText, disabled, and checked properties.'
        },
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm"',
          default: '"sm"',
          description: 'Size variant affecting all checkboxes in the group. 3XS (10px), 2XS (12px), XS (14px), SM (16px).'
        },
        {
          name: 'direction',
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: 'Layout direction for the checkbox group. Horizontal arranges checkboxes in a row, vertical stacks them.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label displayed above the checkbox group. Provides context for the entire group of options.'
        },
        {
          name: 'hintText',
          type: 'string',
          description: 'Optional hint text displayed below the checkbox group. Provides guidance or additional context for the group.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the entire checkbox group, preventing interaction with all checkboxes.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Applies error styling to all checkboxes in the group. Used for validation feedback.'
        },
        {
          name: 'value',
          type: 'string[]',
          description: 'Array of selected checkbox values. Controls which checkboxes are checked.'
        },
        {
          name: 'onChange',
          type: '(value: string[]) => void',
          description: 'Callback function invoked when any checkbox state changes. Receives updated array of selected values.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the checkbox group container. Allows layout and spacing customization.'
        },
        {
          name: 'name',
          type: 'string',
          description: 'HTML name attribute for form submission. Applied to all checkboxes in the group.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use horizontal layout for compact spaces and when labels are short',
          'Use vertical layout for longer labels, mobile interfaces, and better accessibility',
          'Provide clear, descriptive labels for the group and individual options',
          'Use hint text to provide context or guidance for the entire group',
          'Use error state with clear error messaging in hint text',
          'Ensure consistent spacing between checkboxes',
          'Use appropriate size based on context and available space',
          'Group related options logically together',
          'Use disabled state for entire groups when appropriate',
          'Allow individual option disabling when some options are conditionally unavailable'
        ],
        dont: [
          'Don\'t use checkbox groups for single-selection scenarios (use Radio group)',
          'Don\'t mix unrelated checkboxes in the same group',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t use horizontal layout when labels are too long or space is limited',
          'Don\'t use multiple checkbox sizes within the same group',
          'Don\'t use checkbox groups when each checkbox needs completely independent behavior',
          'Don\'t hide the group label when it provides important context',
          'Don\'t use checkbox groups for navigation (use Tabs or Links instead)',
          'Don\'t use checkbox groups without proper form labels for accessibility',
          'Don\'t override default spacing unnecessarily'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus between checkboxes in the group',
          'Space key toggles checkbox state when focused',
          'Arrow keys can navigate between checkboxes (when implemented)',
          'Focus ring is visible for keyboard navigation',
          'Disabled checkboxes cannot receive focus',
          'Group maintains logical tab order'
        ],
        screenReader: [
          'Group label is announced when group receives focus',
          'Individual checkbox labels are announced when each checkbox receives focus',
          'Checkbox state (checked/unchecked) is announced',
          'Error state is announced when error prop is true',
          'Disabled state is announced for disabled checkboxes',
          'Hint text is associated with the group via aria-describedby'
        ],
        ariaHints: [
          'role="group" for the checkbox group container',
          'aria-labelledby linking group to label',
          'aria-describedby linking group to hint text',
          'aria-invalid="true" for groups with error state',
          'aria-disabled="true" for disabled groups',
          'Proper name attributes for form submission'
        ]
      }}
      relatedComponents={[
        'Checkbox',
        'CheckboxCard',
        'Radio',
        'Select',
        'Input',
        'Form'
      ]}
      figmaDocumentation={{
        title: 'Checkbox Group Component Documentation',
        description: 'Complete visual reference showing all checkbox group sizes, directions, states, and configurations from the design system. Includes examples of horizontal and vertical layouts, label and hint text variations, and error states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5328-24903',
        figmaNodeId: '5328:24903',
      }}
      examples={[]}
    />
  );
};
