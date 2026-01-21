import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const InputSliderDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Input Slider"
      category="Form"
      description="A range slider component for selecting numeric values within a specified range. Supports multiple sizes, states, optional value display, and comprehensive interactive feedback with smooth animations."
      whenToUse={[
        'Selecting numeric values within a defined range',
        'Adjusting settings like volume, brightness, or opacity',
        'Filtering or setting thresholds with visual feedback',
        'When users need to see the relative position of a value',
        'For continuous value selection with smooth transitions',
        'Settings panels requiring precise numeric input',
        'When space is limited and a compact control is needed'
      ]}
      whenNotToUse={[
        'For selecting from a predefined list (use Select or Dropdown instead)',
        'For binary on/off states (use Toggle instead)',
        'When exact numeric input is required (use Input with type="number" instead)',
        'For discrete options (use Radio group or Checkbox group instead)',
        'When the range is very small (consider using buttons or toggles)',
        'For non-numeric values or text input',
        'When users need to input multiple unrelated values'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label',
          description: 'Optional text label displayed above the slider. Can include an info tooltip icon for additional context.'
        },
        {
          number: 2,
          name: 'Value Display (Optional)',
          description: 'Optional display of the current value, positioned to the right of the label. Can include prefix and suffix text.'
        },
        {
          number: 3,
          name: 'Track',
          description: 'The background track that represents the full range of values. Changes color based on state and error conditions.'
        },
        {
          number: 4,
          name: 'Fill',
          description: 'The filled portion of the track indicating the current value position. Uses primary color and extends from left to current value.'
        },
        {
          number: 5,
          name: 'Thumb',
          description: 'The draggable handle that represents the current value. Can be dragged along the track or clicked on the track to jump to a position.'
        },
        {
          number: 6,
          name: 'Helper Text / Error Message',
          description: 'Text displayed below the slider providing guidance or error feedback. Positioned consistently across all sizes.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard slider with track, fill, and thumb. Most common variant for general value selection.'
        },
        {
          name: 'With Value Display',
          description: 'Slider with current value displayed next to the label. Useful when users need to see exact numeric values.'
        },
        {
          name: 'With Prefix/Suffix',
          description: 'Value display with prefix or suffix text (e.g., "$50", "50%", "50px"). Helps provide context for the value.'
        },
        {
          name: 'Without Label',
          description: 'Slider without a label. Used when context is clear from surrounding content or when space is limited.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state with neutral track color and primary color fill/thumb. Shows the current value position.'
        },
        {
          name: 'Hover',
          description: 'State when user hovers over the slider. Track and thumb show darker primary color. Cursor changes to indicate interactivity.'
        },
        {
          name: 'Focus',
          description: 'State when slider receives keyboard focus. Shows primary color focus ring around thumb. Maintains hover styling if applicable.'
        },
        {
          name: 'Dragging',
          description: 'State when user is actively dragging the thumb. Shows enhanced shadow and darker colors for visual feedback during interaction.'
        },
        {
          name: 'Error',
          description: 'Slider has an error state indicated by red track fill and red thumb border. Used for validation feedback.'
        },
        {
          name: 'Disabled',
          description: 'Slider is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or trigger value changes.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting track height, thumb size, and text sizes. XS (4px track), SM (6px track), MD (8px track), LG (10px track).'
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: 'Minimum value of the slider range. Value cannot go below this number.'
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'Maximum value of the slider range. Value cannot go above this number.'
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: 'Step increment for value changes. Value will snap to multiples of this step.'
        },
        {
          name: 'value',
          type: 'number',
          description: 'Controlled slider value. Use with onChange for controlled components. If not provided, uses defaultValue.'
        },
        {
          name: 'defaultValue',
          type: 'number',
          default: '0',
          description: 'Initial value for uncontrolled slider. Ignored if value prop is provided.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed above the slider field.'
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text displayed below the slider. Shown when not in error state.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the slider is in an error state. Shows red track fill and thumb border.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the slider when error is true.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the slider, preventing user interaction.'
        },
        {
          name: 'showValue',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display the current value next to the label.'
        },
        {
          name: 'valuePrefix',
          type: 'string',
          default: '""',
          description: 'Prefix text displayed before the value (e.g., "$", "€").'
        },
        {
          name: 'valueSuffix',
          type: 'string',
          default: '""',
          description: 'Suffix text displayed after the value (e.g., "%", "px", "kg").'
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
          description: 'Whether the slider should take full width of its container.'
        },
        {
          name: 'onChange',
          type: '(value: number) => void',
          description: 'Callback function invoked when slider value changes. Receives the new value as parameter. Called continuously during dragging.'
        },
        {
          name: 'onChangeEnd',
          type: '(value: number) => void',
          description: 'Callback function invoked when user finishes changing the value (on mouse up or blur). Receives the final value as parameter.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use slider for continuous numeric value selection within a range',
          'Provide clear labels and helper text explaining the value being adjusted',
          'Use appropriate min/max values that match the use case',
          'Set reasonable step values for the context (1 for integers, 0.1 for decimals)',
          'Use showValue when exact numeric feedback is important',
          'Use valuePrefix/valueSuffix to provide context (currency, units, percentages)',
          'Use error state to indicate validation failures',
          'Use onChangeEnd for expensive operations that should only run when user finishes adjusting',
          'Use onChange for real-time updates when value changes',
          'Ensure slider is accessible with keyboard navigation',
          'Use consistent slider styling within the same form or interface',
          'Group related sliders together with clear visual hierarchy'
        ],
        dont: [
          'Don\'t use sliders for discrete options (use Radio or Checkbox group instead)',
          'Don\'t use sliders for binary states (use Toggle instead)',
          'Don\'t use sliders without clear labels or value indicators',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t use multiple slider sizes unnecessarily within the same interface',
          'Don\'t set step values that are too small (causes precision issues)',
          'Don\'t use sliders for ranges that are too large (consider logarithmic scales)',
          'Don\'t hide sliders or make them too small to interact with easily',
          'Don\'t use sliders for non-numeric values',
          'Don\'t override default colors unless necessary for brand consistency',
          'Don\'t use onChange for expensive operations (use onChangeEnd instead)'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the slider',
          'Arrow keys (Left/Right) decrease/increase value by step amount',
          'Page Up/Page Down keys change value by larger increments',
          'Home key sets value to minimum',
          'End key sets value to maximum',
          'Focus ring is visible for keyboard navigation with primary color accent',
          'Disabled sliders cannot receive focus',
          'Slider value is announced when changed via keyboard'
        ],
        screenReader: [
          'Slider label is announced when slider receives focus',
          'Current value, minimum, and maximum are announced',
          'Error state and error message are announced when present',
          'Helper text is announced when slider receives focus',
          'Disabled state is announced for disabled sliders',
          'Slider role="slider" is used for proper screen reader support'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for sliders without visible labels',
          'aria-describedby linking to helper text or error message',
          'aria-valuemin, aria-valuemax, aria-valuenow for value range information',
          'aria-invalid="true" when slider is in error state',
          'aria-disabled="true" when slider is disabled',
          'Proper role="slider" attribute for slider semantics'
        ]
      }}
      relatedComponents={[
        'Input',
        'Toggle',
        'Select',
        'Radio',
        'Checkbox',
        'Form'
      ]}
      figmaDocumentation={{
        title: 'Input Slider Component Documentation',
        description: 'Complete visual reference showing all slider sizes, states, variants, and configurations from the design system. Includes examples of all interactive states and value display options.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5351-251549',
        figmaNodeId: '5351:251549',
      }}
      examples={[
        {
          title: 'Basic Slider',
          description: 'Standard slider component with default settings. Shows the basic track, fill, and thumb elements.',
          code: `<InputSlider 
  label="Volume"
  min={0}
  max={100}
  defaultValue={50}
/>`,
          tags: ['basic', 'default'],
        },
        {
          title: 'Slider with Value Display',
          description: 'Slider with current value displayed next to the label. Useful when users need to see exact numeric values.',
          code: `<InputSlider 
  label="Brightness"
  min={0}
  max={100}
  defaultValue={75}
  showValue
/>`,
          tags: ['value', 'display'],
        },
        {
          title: 'Slider with Prefix/Suffix',
          description: 'Slider with value display including prefix or suffix text to provide context for the value.',
          code: `<InputSlider 
  label="Price"
  min={0}
  max={1000}
  defaultValue={500}
  showValue
  valuePrefix="$"
/>

<InputSlider 
  label="Opacity"
  min={0}
  max={100}
  defaultValue={50}
  showValue
  valueSuffix="%"
/>`,
          tags: ['value', 'formatting', 'prefix', 'suffix'],
        },
        {
          title: 'Slider Sizes',
          description: 'All available slider sizes from XS to LG. Shows how track height and thumb size scale while maintaining consistent styling.',
          code: `<InputSlider size="xs" label="XS" defaultValue={50} />
<InputSlider size="sm" label="SM" defaultValue={50} />
<InputSlider size="md" label="MD" defaultValue={50} />
<InputSlider size="lg" label="LG" defaultValue={50} />`,
          tags: ['sizes', 'variants'],
        },
        {
          title: 'Slider States',
          description: 'Slider in different states: default, disabled, and error. Shows how appearance changes based on state.',
          code: `<InputSlider label="Default" defaultValue={50} />
<InputSlider label="Disabled" defaultValue={50} disabled />
<InputSlider 
  label="Error" 
  defaultValue={50} 
  error 
  errorMessage="Value must be between 0 and 100"
/>`,
          tags: ['states', 'disabled', 'error'],
        },
        {
          title: 'Slider with Step',
          description: 'Slider with custom step value. Value snaps to multiples of the step amount.',
          code: `<InputSlider 
  label="Rating"
  min={0}
  max={5}
  step={0.5}
  defaultValue={2.5}
  showValue
/>`,
          tags: ['step', 'precision'],
        },
        {
          title: 'Controlled Slider',
          description: 'Slider with controlled state management. Demonstrates how to manage slider value in parent components.',
          code: `const [value, setValue] = useState(50);

<InputSlider 
  label="Volume"
  min={0}
  max={100}
  value={value}
  onChange={setValue}
  showValue
/>`,
          tags: ['controlled', 'state-management'],
        },
        {
          title: 'Slider with onChangeEnd',
          description: 'Slider using onChangeEnd callback for expensive operations that should only run when user finishes adjusting.',
          code: `<InputSlider 
  label="Filter Range"
  min={0}
  max={1000}
  defaultValue={500}
  onChangeEnd={(value) => {
    // Only called when user finishes dragging
    performExpensiveOperation(value);
  }}
/>`,
          tags: ['callbacks', 'performance'],
        },
        {
          title: 'Settings Panel',
          description: 'Multiple sliders grouped together in a settings panel. Shows how to organize related sliders.',
          code: `<div className="space-y-6">
  <InputSlider 
    label="Volume" 
    defaultValue={75} 
    showValue 
    valueSuffix="%" 
  />
  <InputSlider 
    label="Brightness" 
    defaultValue={80} 
    showValue 
    valueSuffix="%" 
  />
  <InputSlider 
    label="Contrast" 
    defaultValue={60} 
    showValue 
    valueSuffix="%" 
  />
</div>`,
          tags: ['grouping', 'settings'],
        },
      ]}
    />
  );
};
