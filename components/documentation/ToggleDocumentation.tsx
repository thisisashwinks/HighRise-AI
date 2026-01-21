import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';
import { Toggle } from '../Toggle';

export const ToggleDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Toggle"
      category="Form"
      description="A toggle switch component for binary on/off states and settings. Supports multiple sizes, states, optional labels, and error states with smooth animations and comprehensive interactive feedback."
      whenToUse={[
        'Enabling or disabling features or settings',
        'Binary on/off toggles for user preferences',
        'Settings panels requiring quick enable/disable actions',
        'Feature flags and configuration toggles',
        'When you need immediate visual feedback for binary state changes',
        'For settings that don\'t require additional confirmation',
        'When space is limited and a compact control is needed'
      ]}
      whenNotToUse={[
        'For selecting multiple options (use Checkbox group instead)',
        'For selecting a single option from multiple choices (use Radio instead)',
        'For actions that require confirmation (use Button with modal)',
        'When the state change has significant consequences without undo',
        'For navigation or tab selection (use Tabs component instead)',
        'When you need intermediate states (use Checkbox with indeterminate)',
        'For complex multi-step settings (use form with multiple inputs)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Track',
          description: 'The background track that contains the thumb. Changes color based on checked state (purple when checked, gray when unchecked).'
        },
        {
          number: 2,
          name: 'Thumb',
          description: 'The circular button that slides left and right within the track. Always white and moves smoothly between positions.'
        },
        {
          number: 3,
          name: 'Label (Optional)',
          description: 'Text label displayed next to the toggle. Provides context for what the toggle controls.'
        }
      ]}
      variants={[
        {
          name: 'Unchecked',
          description: 'Default state with gray track and thumb positioned on the left. Indicates the feature is disabled or off.'
        },
        {
          name: 'Checked',
          description: 'Active state with purple track and thumb positioned on the right. Indicates the feature is enabled or on.'
        },
        {
          name: 'With Label',
          description: 'Toggle with an optional text label positioned to the right of the switch. Label size adapts to toggle size.'
        },
        {
          name: 'Without Label',
          description: 'Toggle without a label. Used when context is clear from surrounding content or when space is limited.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state showing the toggle\'s base styling. Unchecked toggles have gray background. Checked toggles have purple background.'
        },
        {
          name: 'Hover',
          description: 'State when user hovers over the toggle. Unchecked toggles show darker gray background. Checked toggles show darker purple background.'
        },
        {
          name: 'Focus',
          description: 'State when toggle receives keyboard focus. Shows purple focus ring around the toggle. Maintains hover styling if applicable.'
        },
        {
          name: 'Disabled',
          description: 'Toggle is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or trigger state changes.'
        },
        {
          name: 'Error',
          description: 'Toggle has an error state indicated by red border. Can be combined with checked or unchecked states for validation feedback.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm" | "md" | "lg"',
          default: '"sm"',
          description: 'Size variant affecting toggle dimensions. 3XS (16px), 2XS (16px), XS (16px), SM (20px), MD (24px), LG (24px).'
        },
        {
          name: 'checked',
          type: 'boolean',
          default: 'false',
          description: 'Whether the toggle is checked (on). When true, displays purple background and thumb on the right.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the toggle has an error state. When true, displays red border. Can be combined with checked or unchecked states.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Text label displayed next to the toggle. Provides context for what the toggle controls. Label size adapts to toggle size.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the toggle, preventing user interaction and showing disabled styling.'
        },
        {
          name: 'onChange',
          type: '(checked: boolean) => void',
          description: 'Callback function invoked when toggle state changes. Receives the new checked state as parameter.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the toggle container. Allows layout and spacing customization.'
        },
        {
          name: 'labelClassName',
          type: 'string',
          description: 'Custom CSS classes applied to the label text. Allows font style overrides as specified in design system.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use toggle for binary on/off states and settings',
          'Provide clear, descriptive labels for toggles',
          'Use appropriate size based on context and available space',
          'Use error state to indicate validation failures',
          'Ensure toggle labels are concise but descriptive',
          'Use consistent toggle styling within the same form or interface',
          'Group related toggles together with clear visual hierarchy',
          'Use checked state to clearly indicate enabled features',
          'Provide keyboard navigation support for accessibility',
          'Use disabled state when toggle cannot be changed due to dependencies'
        ],
        dont: [
          'Don\'t use toggles for single-selection scenarios (use Radio instead)',
          'Don\'t use toggles for multiple selections (use Checkbox group instead)',
          'Don\'t use toggles for navigation (use Tabs or Links instead)',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t use multiple toggle sizes unnecessarily within the same interface',
          'Don\'t use toggles for actions that require confirmation',
          'Don\'t hide toggles or make them too small to interact with easily',
          'Don\'t use toggles without labels or clear indication of what they control',
          'Don\'t use error state for informational messages',
          'Don\'t override default colors unless necessary for brand consistency'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the toggle',
          'Space key or Enter key toggles the state when focused',
          'Focus ring is visible for keyboard navigation with purple accent color',
          'Disabled toggles cannot receive focus',
          'Toggles in forms can be navigated with Tab and activated with Space or Enter'
        ],
        screenReader: [
          'Toggle label is announced when toggle receives focus',
          'Toggle state (checked/unchecked) is announced',
          'Error state is announced when error prop is true',
          'Disabled state is announced for disabled toggles',
          'Toggle role="switch" is used for proper screen reader support'
        ],
        ariaHints: [
          'aria-checked="true" for checked toggles, aria-checked="false" for unchecked',
          'aria-invalid="true" for toggles with error state',
          'aria-disabled="true" for disabled toggles',
          'aria-label for toggles without visible labels (use sparingly)',
          'Proper role="switch" attribute for toggle semantics'
        ]
      }}
      relatedComponents={[
        'Checkbox',
        'Radio',
        'Switch',
        'Input',
        'Form',
        'Button'
      ]}
      figmaDocumentation={{
        title: 'Toggle Component Documentation',
        description: 'Complete visual reference showing all toggle sizes, states, variants, and configurations from the design system. Includes examples of checked, unchecked, error, and disabled states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5335-35520',
        figmaNodeId: '5335:35520',
      }}
      examples={[
        {
          title: 'Basic Toggle States',
          description: 'Demonstrates all toggle states: default unchecked, checked, and disabled. Shows how the toggle appearance changes based on state.',
          code: `<Toggle label="Enable notifications" />
<Toggle label="Enable notifications" checked />
<Toggle label="Enable notifications" disabled />`,
          tags: ['basic', 'states', 'interactive'],
        },
        {
          title: 'Toggle Sizes',
          description: 'All available toggle sizes from 3XS (16px) to LG (24px). Shows how toggle dimensions scale while maintaining consistent styling.',
          code: `<Toggle size="3xs" label="3XS" />
<Toggle size="2xs" label="2XS" />
<Toggle size="xs" label="XS" />
<Toggle size="sm" label="SM" />
<Toggle size="md" label="MD" />
<Toggle size="lg" label="LG" />`,
          tags: ['sizes', 'variants'],
        },
        {
          title: 'Error States',
          description: 'Toggles with error state showing red border. Can be combined with checked or unchecked states to indicate validation errors.',
          code: `<Toggle label="Invalid setting" error />
<Toggle label="Invalid checked setting" checked error />`,
          tags: ['error', 'validation', 'states'],
        },
        {
          title: 'Without Label',
          description: 'Toggles without labels. Used when context is clear from surrounding content or when space is limited.',
          code: `<Toggle />
<Toggle checked />`,
          tags: ['label', 'compact'],
        },
        {
          title: 'Controlled Toggle',
          description: 'Toggle with controlled state management. Demonstrates how to manage toggle state in parent components.',
          code: `const [enabled, setEnabled] = useState(false);

<Toggle 
  checked={enabled}
  onChange={setEnabled}
  label="Enable feature"
/>`,
          tags: ['controlled', 'state-management'],
        },
        {
          title: 'Settings Panel',
          description: 'Multiple toggles grouped together in a settings panel. Shows how to organize related toggles.',
          code: `<div className="space-y-4">
  <Toggle label="Email notifications" checked />
  <Toggle label="SMS notifications" />
  <Toggle label="Push notifications" checked />
</div>`,
          tags: ['grouping', 'settings'],
        },
      ]}
    />
  );
};
