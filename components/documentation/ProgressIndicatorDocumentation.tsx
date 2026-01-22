import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const ProgressIndicatorDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Progress Indicator"
      category="Feedback"
      description="Progress indicators provide visual feedback about the status of ongoing processes, task completion, or loading states. Supports multiple variants including linear progress bars, circular indicators, stepper progress, and loading animations."
      whenToUse={[
        'Showing progress of file uploads, downloads, or data processing',
        'Indicating loading states during asynchronous operations',
        'Displaying task completion status in multi-step workflows',
        'Showing progress through a multi-step form or wizard',
        'Displaying completion percentage for long-running operations',
        'Providing feedback during AI processing or generation tasks',
        'Showing progress of batch operations or bulk actions',
        'Indicating system status or background task progress'
      ]}
      whenNotToUse={[
        'For operations that complete in less than 1 second (use simple loading spinner instead)',
        'When progress cannot be accurately measured or estimated',
        'For indeterminate operations where completion time is unknown (use indeterminate spinner)',
        'As a decorative element without functional purpose',
        'For navigation or wayfinding (use breadcrumbs or stepper navigation instead)',
        'When the operation is so fast that progress would flicker',
        'For error states (use error messages or alerts instead)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Track/Background',
          description: 'The background element that represents the total progress capacity. Typically uses a neutral color to show the full range.'
        },
        {
          number: 2,
          name: 'Fill/Progress Bar',
          description: 'The filled portion indicating completed progress. Uses primary color and extends proportionally based on completion percentage.'
        },
        {
          number: 3,
          name: 'Label/Text (Optional)',
          description: 'Optional text displaying progress percentage, status message, or step information. Can be positioned inside or outside the indicator.'
        },
        {
          number: 4,
          name: 'Icon/Spinner (Optional)',
          description: 'Optional icon or animated spinner for loading states. Used in circular indicators and indeterminate progress states.'
        },
        {
          number: 5,
          name: 'Step Markers (Stepper Variant)',
          description: 'Visual markers indicating individual steps in a multi-step process. Shows completed, current, and upcoming steps.'
        }
      ]}
      variants={[
        {
          name: 'Linear Progress Bar',
          description: 'Horizontal bar showing progress from left to right. Most common variant for file uploads, downloads, and general progress tracking.'
        },
        {
          name: 'Circular Progress',
          description: 'Circular indicator showing progress around a circle. Useful for compact spaces and when progress is a percentage value.'
        },
        {
          name: 'Pie/Donut Progress',
          description: 'Circular progress displayed as a filled pie chart or donut shape. Provides visual representation of completion percentage.'
        },
        {
          name: 'Stepper Progress',
          description: 'Step-by-step progress indicator showing completion through discrete stages. Ideal for multi-step forms, wizards, and workflows.'
        },
        {
          name: 'Loading Spinner',
          description: 'Animated circular spinner for indeterminate loading states. Used when progress cannot be measured or estimated.'
        },
        {
          name: 'With Label',
          description: 'Progress indicator with text label showing percentage, status, or descriptive text. Provides additional context about the progress.'
        }
      ]}
      states={[
        {
          name: 'Determinate',
          description: 'Progress indicator showing specific completion percentage. Fill extends proportionally based on progress value (0-100%).'
        },
        {
          name: 'Indeterminate',
          description: 'Animated progress indicator for operations where completion cannot be measured. Shows continuous animation without specific percentage.'
        },
        {
          name: 'Loading',
          description: 'Active loading state with animation. Used during ongoing operations to indicate the system is processing.'
        },
        {
          name: 'Completed',
          description: 'Progress indicator at 100% completion. May show checkmark or success state. Used when operation finishes successfully.'
        },
        {
          name: 'Error',
          description: 'Progress indicator showing error state. Typically uses error color and may display error message. Used when operation fails.'
        },
        {
          name: 'Paused',
          description: 'Progress indicator in paused state. Shows current progress but indicates operation is temporarily halted.'
        }
      ]}
      props={[
        {
          name: 'value',
          type: 'number',
          description: 'Current progress value (0-100). Required for determinate progress indicators. Controls the fill percentage.'
        },
        {
          name: 'variant',
          type: '"linear" | "circular" | "stepper" | "spinner"',
          default: '"linear"',
          description: 'Visual variant of the progress indicator. Linear shows horizontal bar, circular shows ring, stepper shows steps, spinner shows animated loading.'
        },
        {
          name: 'size',
          type: '"xs" | "sm" | "md" | "lg" | "xl"',
          default: '"md"',
          description: 'Size variant affecting dimensions. XS (compact) to XL (prominent). Affects bar height, circle diameter, or step marker size.'
        },
        {
          name: 'indeterminate',
          type: 'boolean',
          default: 'false',
          description: 'Whether progress is indeterminate. When true, shows animated progress without specific value. Ignores value prop when true.'
        },
        {
          name: 'showLabel',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display progress percentage or label text. Can show percentage, custom text, or status message.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Custom label text to display. Overrides default percentage display when showLabel is true. Can include status messages or descriptions.'
        },
        {
          name: 'color',
          type: '"primary" | "success" | "warning" | "error" | "neutral"',
          default: '"primary"',
          description: 'Color variant for the progress fill. Primary (blue), success (green), warning (orange), error (red), or neutral (gray).'
        },
        {
          name: 'steps',
          type: 'number',
          description: 'Total number of steps for stepper variant. Required when variant is "stepper". Defines the number of step markers.'
        },
        {
          name: 'currentStep',
          type: 'number',
          description: 'Current step number for stepper variant (1-indexed). Required when variant is "stepper". Determines which steps are completed.'
        },
        {
          name: 'stepLabels',
          type: 'string[]',
          description: 'Optional labels for each step in stepper variant. Array length should match steps prop. Provides context for each stage.'
        },
        {
          name: 'animated',
          type: 'boolean',
          default: 'true',
          description: 'Whether progress fill animates smoothly when value changes. Provides smooth transitions between progress states.'
        },
        {
          name: 'thickness',
          type: 'number',
          description: 'Thickness of circular progress ring or linear bar. Overrides default size-based thickness. Measured in pixels.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the progress indicator container. Allows layout and styling customization.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use determinate progress when you can accurately measure or estimate completion',
          'Use indeterminate progress for operations where completion time is unknown',
          'Show progress for operations longer than 1-2 seconds',
          'Provide clear labels or percentages when progress is determinate',
          'Use appropriate color variants (success for completion, error for failures)',
          'Update progress smoothly and frequently enough to feel responsive',
          'Use stepper variant for multi-step workflows with clear stages',
          'Provide context about what operation is in progress',
          'Use circular indicators in compact spaces or when space is limited',
          'Show completion state (100% or success indicator) when operation finishes',
          'Use consistent progress indicator styling throughout the application',
          'Consider accessibility with proper ARIA labels and screen reader support'
        ],
        dont: [
          'Don\'t use determinate progress when you cannot accurately measure completion',
          'Don\'t show progress for operations that complete instantly',
          'Don\'t update progress too frequently (can cause performance issues)',
          'Don\'t use progress indicators as decorative elements without functional purpose',
          'Don\'t show progress percentages that don\'t accurately reflect actual progress',
          'Don\'t use progress indicators for navigation (use breadcrumbs or steppers instead)',
          'Don\'t hide progress indicators during critical operations',
          'Don\'t use multiple progress indicators for the same operation',
          'Don\'t use progress indicators for error states (use error messages instead)',
          'Don\'t make progress indicators too small to be easily visible',
          'Don\'t use inconsistent progress indicator styles within the same interface',
          'Don\'t forget to handle error and completion states appropriately'
        ]
      }}
      accessibility={{
        keyboard: [
          'Progress indicators are not directly keyboard interactive',
          'Focus management should be handled by parent components',
          'Progress updates should be announced to screen readers',
          'Status changes should be communicated via ARIA live regions'
        ],
        screenReader: [
          'Progress value and status are announced via aria-valuenow, aria-valuemin, aria-valuemax',
          'Progress label or description is announced via aria-label or aria-labelledby',
          'Indeterminate progress is announced as "loading" or "in progress"',
          'Completion state is announced when progress reaches 100%',
          'Error state is announced when progress operation fails',
          'Stepper progress announces current step and total steps'
        ],
        ariaHints: [
          'role="progressbar" for determinate progress indicators',
          'role="status" or aria-live="polite" for progress updates',
          'aria-valuenow, aria-valuemin, aria-valuemax for determinate progress',
          'aria-label or aria-labelledby for progress description',
          'aria-busy="true" for indeterminate progress',
          'aria-label on stepper steps indicating step status'
        ]
      }}
      relatedComponents={[
        'Loading States',
        'Spinner',
        'Stepper Navigation',
        'Status Badge',
        'Toast Notification'
      ]}
      examples={[
        {
          title: 'Progress Indicator - Standard Linear',
          description: 'A standard linear progress bar showing completion percentage in a horizontal format. This is the most common variant used for file uploads, downloads, and general progress tracking. The filled portion extends from left to right proportionally based on the completion percentage.',
          media: {
            type: 'image',
            url: '/examples/progress indicator/Progress Indicator.png',
            alt: 'Standard linear progress indicator',
          },
          tags: ['linear', 'standard', 'progress-bar'],
          critique: 'The linear progress bar provides clear visual feedback with the filled track indicating completion. The design maintains good contrast and is easily scannable. The horizontal format works well for most use cases and provides a familiar pattern for users.',
        },
        {
          title: 'Progress Indicator - Circular Variant',
          description: 'A circular progress indicator displaying completion as a ring around a circle. This variant is ideal for compact spaces and provides a modern, clean appearance. The circular format is particularly effective when showing percentage values or when space is limited.',
          media: {
            type: 'image',
            url: '/examples/progress indicator/Progress Indicator - Circle.png',
            alt: 'Circular progress indicator',
          },
          tags: ['circular', 'compact', 'ring'],
          critique: 'The circular progress indicator offers a space-efficient alternative to linear bars. The ring design is visually appealing and works well in dashboards, cards, or areas where horizontal space is limited. The circular format naturally suggests completion percentage.',
        },
        {
          title: 'Progress Circle - Pie & Donut',
          description: 'A circular progress indicator displayed as a filled pie chart or donut shape. This variant provides a more prominent visual representation of completion percentage, making it easy to understand progress at a glance. The filled area grows proportionally as progress increases.',
          media: {
            type: 'image',
            url: '/examples/progress indicator/Progress Circle - Pie & Donut.png',
            alt: 'Circular progress with pie and donut visualization',
          },
          tags: ['circular', 'pie', 'donut', 'visual'],
          critique: 'The pie and donut variants provide strong visual impact and make completion percentage immediately apparent. The filled area creates a clear sense of progress, and the design works well for displaying completion in a visually engaging way. The donut variant allows for additional information in the center.',
        },
        {
          title: 'Progress Circle with Label',
          description: 'A circular progress indicator with a text label displaying the completion percentage or status message. The label provides additional context and makes the progress value immediately readable without requiring users to estimate from the visual indicator alone.',
          media: {
            type: 'image',
            url: '/examples/progress indicator/Progress Circle with Label.png',
            alt: 'Circular progress indicator with label',
          },
          tags: ['circular', 'label', 'percentage', 'text'],
          critique: 'Adding a label to the circular progress indicator significantly improves usability by providing exact progress values. The combination of visual progress and numeric label gives users both quick visual feedback and precise information. The label placement is well-integrated with the circular design.',
        },
        {
          title: 'Progress Indicator - Stepper',
          description: 'A stepper-style progress indicator showing completion through discrete stages or steps. This variant is ideal for multi-step workflows, forms, or processes where progress moves through defined stages. Each step is clearly marked as completed, current, or upcoming.',
          media: {
            type: 'image',
            url: '/examples/progress indicator/Progress Indicator - Stepper.png',
            alt: 'Stepper progress indicator',
          },
          tags: ['stepper', 'steps', 'workflow', 'multi-step'],
          critique: 'The stepper progress indicator excels at showing progress through defined stages. The visual connection between steps helps users understand their position in a process and what comes next. This pattern is particularly effective for multi-step forms and workflows where each stage has distinct meaning.',
        },
        {
          title: 'Loader Circle - Indeterminate',
          description: 'A circular loading spinner for indeterminate operations where completion cannot be measured or estimated. This animated indicator provides visual feedback that the system is processing without showing specific progress percentage. Used for operations with unknown duration.',
          media: {
            type: 'image',
            url: '/examples/progress indicator/Loader Circle.png',
            alt: 'Circular loading spinner',
          },
          tags: ['spinner', 'loading', 'indeterminate', 'animation'],
          critique: 'The circular loader provides clear visual feedback for indeterminate operations. The animation is smooth and indicates active processing without making false promises about completion time. This is the appropriate pattern when progress cannot be accurately measured.',
        },
      ]}
    />
  );
};
