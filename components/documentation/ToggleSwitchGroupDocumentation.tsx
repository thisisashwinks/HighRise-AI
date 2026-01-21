import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';
import { ToggleSwitchGroup } from '../ToggleSwitchGroup';

export const ToggleSwitchGroupDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Toggle Switch Group"
      category="Form"
      description="A group component for displaying multiple toggle switches together with consistent styling and behavior. Supports horizontal and vertical layouts, optional labels and hint text, and comprehensive state management including disabled and error states."
      whenToUse={[
        'Displaying multiple related toggle switches together',
        'Settings panels with multiple binary on/off options',
        'Preference selection where users can enable/disable multiple features',
        'When you need consistent spacing and alignment across multiple toggles',
        'Grouping related toggle switches with a shared label or context',
        'Forms requiring multiple binary settings selections',
        'Feature flag interfaces with multiple toggleable options'
      ]}
      whenNotToUse={[
        'For single toggle switch (use Toggle component directly)',
        'For single-selection scenarios (use Radio group instead)',
        'When toggles are unrelated and don\'t need grouping',
        'For complex nested toggle hierarchies (use custom layout)',
        'When each toggle needs completely independent styling or behavior',
        'For selecting multiple options from a list (use Checkbox group instead)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Group Label (Optional)',
          description: 'Text label displayed above the toggle switch group. Provides context for the group of options.'
        },
        {
          number: 2,
          name: 'Toggle Switch Options',
          description: 'Individual toggle switch components arranged in horizontal or vertical layout. Each toggle can have its own label.'
        },
        {
          number: 3,
          name: 'Hint Text (Optional)',
          description: 'Additional descriptive text displayed below the toggle switch group. Provides guidance or context for the entire group.'
        }
      ]}
      variants={[
        {
          name: 'Horizontal',
          description: 'Toggle switches arranged in a horizontal row with wrapping support. Best for compact layouts and when space allows.'
        },
        {
          name: 'Vertical',
          description: 'Toggle switches arranged in a vertical column. Best for longer labels, mobile layouts, and when vertical space is preferred.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state showing all toggle switches in their default unchecked state. Group label and hint text are displayed normally.'
        },
        {
          name: 'Disabled',
          description: 'Entire group is disabled, preventing interaction with all toggle switches. Individual options can also be disabled independently.'
        },
        {
          name: 'Error',
          description: 'Group has an error state indicated by red styling on toggle switches and hint text. Used for validation feedback.'
        },
        {
          name: 'Mixed Selection',
          description: 'Some toggle switches are checked while others are unchecked. Normal state for multi-select scenarios.'
        }
      ]}
      props={[
        {
          name: 'options',
          type: 'Array<ToggleSwitchOption>',
          description: 'Array of toggle switch options to display. Each option includes value, label, optional disabled, and checked properties.'
        },
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm" | "md" | "lg"',
          default: '"sm"',
          description: 'Size variant affecting all toggle switches in the group. 3XS (16px), 2XS (16px), XS (16px), SM (20px), MD (24px), LG (24px).'
        },
        {
          name: 'direction',
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: 'Layout direction for the toggle switch group. Horizontal arranges toggles in a row, vertical stacks them.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label displayed above the toggle switch group. Provides context for the entire group of options.'
        },
        {
          name: 'hintText',
          type: 'string',
          description: 'Optional hint text displayed below the toggle switch group. Provides guidance or additional context for the group.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the entire toggle switch group, preventing interaction with all toggle switches.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Applies error styling to all toggle switches in the group. Used for validation feedback.'
        },
        {
          name: 'value',
          type: 'string[]',
          default: '[]',
          description: 'Array of selected toggle switch values. Controls which toggle switches are checked.'
        },
        {
          name: 'onChange',
          type: '(value: string[]) => void',
          description: 'Callback function invoked when any toggle switch state changes. Receives updated array of selected values.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the toggle switch group container. Allows layout and spacing customization.'
        },
        {
          name: 'name',
          type: 'string',
          description: 'HTML name attribute for form submission. Applied to all toggle switches in the group.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use horizontal layout for compact spaces and when labels are short',
          'Use vertical layout for longer labels, mobile interfaces, and better accessibility',
          'Provide clear, descriptive labels for the group and individual options',
          'Use hint text to provide context or guidance for the entire group',
          'Use error state with clear error messaging in hint text',
          'Ensure consistent spacing between toggle switches',
          'Use appropriate size based on context and available space',
          'Group related options logically together',
          'Use disabled state for entire groups when appropriate',
          'Allow individual option disabling when some options are conditionally unavailable'
        ],
        dont: [
          'Don\'t use toggle switch groups for single-selection scenarios (use Radio group)',
          'Don\'t mix unrelated toggle switches in the same group',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t use horizontal layout when labels are too long or space is limited',
          'Don\'t use multiple toggle switch sizes within the same group',
          'Don\'t use toggle switch groups when each toggle needs completely independent behavior',
          'Don\'t hide the group label when it provides important context',
          'Don\'t use toggle switch groups for navigation (use Tabs or Links instead)',
          'Don\'t use toggle switch groups without proper form labels for accessibility',
          'Don\'t override default spacing unnecessarily'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus between toggle switches in the group',
          'Space key or Enter key toggles switch state when focused',
          'Focus ring is visible for keyboard navigation',
          'Disabled toggle switches cannot receive focus',
          'Group maintains logical tab order'
        ],
        screenReader: [
          'Group label is announced when group receives focus',
          'Individual toggle switch labels are announced when each toggle receives focus',
          'Toggle switch state (checked/unchecked) is announced',
          'Error state is announced when error prop is true',
          'Disabled state is announced for disabled toggle switches',
          'Hint text is associated with the group via aria-describedby'
        ],
        ariaHints: [
          'role="group" for the toggle switch group container',
          'aria-labelledby linking group to label',
          'aria-describedby linking group to hint text',
          'aria-invalid="true" for groups with error state',
          'aria-disabled="true" for disabled groups',
          'Proper role="switch" attributes on individual toggle switches'
        ]
      }}
      relatedComponents={[
        'Toggle',
        'CheckboxGroup',
        'Radio',
        'Select',
        'Input',
        'Form'
      ]}
      figmaDocumentation={{
        title: 'Toggle Switch Group Component Documentation',
        description: 'Complete visual reference showing all toggle switch group sizes, directions, states, and configurations from the design system. Includes examples of horizontal and vertical layouts, label and hint text variations, and error states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5335-36758',
        figmaNodeId: '5335:36758',
      }}
      examples={[
        {
          title: 'Basic Toggle Switch Group',
          description: 'Simple toggle switch group with multiple options in horizontal layout. Shows default unchecked state.',
          code: `<ToggleSwitchGroup
  options={[
    { value: '1', label: 'Email notifications' },
    { value: '2', label: 'SMS notifications' },
    { value: '3', label: 'Push notifications' }
  ]}
/>`,
          tags: ['basic', 'horizontal'],
        },
        {
          title: 'Vertical Layout',
          description: 'Toggle switch group arranged vertically. Best for longer labels and mobile interfaces.',
          code: `<ToggleSwitchGroup
  direction="vertical"
  options={[
    { value: '1', label: 'Email notifications' },
    { value: '2', label: 'SMS notifications' },
    { value: '3', label: 'Push notifications' }
  ]}
/>`,
          tags: ['vertical', 'layout'],
        },
        {
          title: 'With Label and Hint Text',
          description: 'Toggle switch group with group label and hint text providing context and guidance.',
          code: `<ToggleSwitchGroup
  label="Notification Preferences"
  hintText="Select which notifications you want to receive"
  options={[
    { value: '1', label: 'Email notifications' },
    { value: '2', label: 'SMS notifications' },
    { value: '3', label: 'Push notifications' }
  ]}
/>`,
          tags: ['label', 'hint-text', 'guidance'],
        },
        {
          title: 'With Selected Values',
          description: 'Toggle switch group with pre-selected values. Demonstrates controlled component usage.',
          code: `<ToggleSwitchGroup
  value={['1', '3']}
  options={[
    { value: '1', label: 'Email notifications' },
    { value: '2', label: 'SMS notifications' },
    { value: '3', label: 'Push notifications' }
  ]}
  onChange={(values) => console.log('Selected:', values)}
/>`,
          tags: ['controlled', 'selected'],
        },
        {
          title: 'Error State',
          description: 'Toggle switch group with error state. Used for validation feedback.',
          code: `<ToggleSwitchGroup
  label="Select at least one notification method"
  hintText="Please select at least one notification method"
  error
  options={[
    { value: '1', label: 'Email notifications' },
    { value: '2', label: 'SMS notifications' }
  ]}
/>`,
          tags: ['error', 'validation'],
        },
        {
          title: 'Disabled State',
          description: 'Toggle switch group with disabled state. Individual options can also be disabled.',
          code: `<ToggleSwitchGroup
  disabled
  options={[
    { value: '1', label: 'Email notifications' },
    { value: '2', label: 'SMS notifications' },
    { value: '3', label: 'Push notifications', disabled: true }
  ]}
/>`,
          tags: ['disabled', 'states'],
        },
        {
          title: 'Different Sizes',
          description: 'Toggle switch groups with different sizes. All toggle switches in a group use the same size.',
          code: `<ToggleSwitchGroup size="3xs" options={[...]} />
<ToggleSwitchGroup size="2xs" options={[...]} />
<ToggleSwitchGroup size="xs" options={[...]} />
<ToggleSwitchGroup size="sm" options={[...]} />
<ToggleSwitchGroup size="md" options={[...]} />
<ToggleSwitchGroup size="lg" options={[...]} />`,
          tags: ['sizes', 'variants'],
        },
        {
          title: 'Settings Panel',
          description: 'Multiple toggle switches grouped together in a settings panel. Shows how to organize related toggles.',
          code: `<ToggleSwitchGroup
  label="Account Settings"
  options={[
    { value: '1', label: 'Two-factor authentication', checked: true },
    { value: '2', label: 'Email notifications', checked: true },
    { value: '3', label: 'Marketing emails' },
    { value: '4', label: 'Weekly digest' }
  ]}
/>`,
          tags: ['settings', 'grouping'],
        },
      ]}
    />
  );
};
