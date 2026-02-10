import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const InlineDatePickerDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Inline Date Picker"
      category="Form"
      description="A compact, inline-editable date picker component that allows users to select dates directly in place without switching to a separate edit mode. Combines the convenience of inline editing with the visual calendar interface of a date picker."
      whenToUse={[
        'Selecting dates inline within content, tables, or cards',
        'Minimal forms where space is at a premium',
        'Quick date edits that don\'t require a full form context',
        'Settings pages with compact date fields',
        'Inline date editing in lists or data grids',
        'Contexts where the date picker should blend with surrounding text',
        'Editable date fields that users can click to modify',
        'When users need calendar visual context while selecting dates inline'
      ]}
      whenNotToUse={[
        'Complex forms requiring extensive validation and error states (use DatePicker instead)',
        'When users need to see all date fields at once in a traditional form',
        'For date range selection (use DatePicker with range mode)',
        'When space allows for a full date picker input field',
        'Forms requiring comprehensive helper text and guidance',
        'When dates need to be entered via keyboard only without calendar popup',
        'For selecting only month/year without specific dates (use MonthPicker)',
        'When selecting multiple non-contiguous dates (use MultiDatePicker)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label (Optional)',
          description: 'Optional text label displayed inline with the date picker. Can be positioned left, right, or inline with the value.'
        },
        {
          number: 2,
          name: 'Display Value',
          description: 'The current date displayed in formatted text when not in edit mode. Shows placeholder text when empty.'
        },
        {
          number: 3,
          name: 'Edit Icon (Optional)',
          description: 'Optional icon that appears on hover to indicate the field is editable.'
        },
        {
          number: 4,
          name: 'Calendar Icon',
          description: 'Visual indicator positioned at the start of the input field when editing, indicating this is a date picker.'
        },
        {
          number: 5,
          name: 'Input Field',
          description: 'The actual input field that appears when editing. Styling varies based on variant (borderless, underline, minimal, or default).'
        },
        {
          number: 6,
          name: 'Clear Button',
          description: 'Optional button (X icon) displayed when a date is selected, allowing users to clear the selection.'
        },
        {
          number: 7,
          name: 'Calendar Popup',
          description: 'Dropdown calendar interface showing month view with navigation controls, day grid, and today button. Appears when editing.'
        },
        {
          number: 8,
          name: 'Focus Indicator',
          description: 'Visual indicator showing the input is active. Style depends on variant (ring, border, underline, or background change).'
        },
        {
          number: 9,
          name: 'Error Message (Optional)',
          description: 'Error text displayed below the date picker when validation fails.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard inline date picker with border that appears on focus. Most common variant for general inline date editing.'
        },
        {
          name: 'Borderless',
          description: 'Date picker with no visible border until focused. Blends seamlessly with surrounding content.'
        },
        {
          name: 'Underline',
          description: 'Date picker with underline border style. Common for inline date editing in text-heavy contexts.'
        },
        {
          name: 'Minimal',
          description: 'Minimal styling with subtle background change on focus. Most unobtrusive variant.'
        }
      ]}
      states={[
        {
          name: 'Display',
          description: 'Initial state showing the current date as formatted text. Appears as regular text until clicked.'
        },
        {
          name: 'Hover',
          description: 'When hovering over an editable field, an edit icon may appear to indicate editability.'
        },
        {
          name: 'Editing',
          description: 'Active editing state where the input field is visible and focused. Calendar popup opens automatically.'
        },
        {
          name: 'Focused',
          description: 'Input has keyboard focus. Shows focus indicator based on variant (ring, border highlight, underline, or background). Calendar popup is visible.'
        },
        {
          name: 'Open',
          description: 'Calendar popup is visible. User can navigate months and select dates. Popup closes on outside click or date selection.'
        },
        {
          name: 'Error',
          description: 'Date picker contains invalid data. Shows error styling (red border/underline) and error message if provided.'
        },
        {
          name: 'Disabled',
          description: 'Date picker is not editable. Appears grayed out and cannot receive focus or open calendar.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting height, padding, font size, and calendar width. XS (24px) to LG (36px).'
        },
        {
          name: 'variant',
          type: '"default" | "borderless" | "underline" | "minimal"',
          default: '"default"',
          description: 'Visual variant of the inline date picker component.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed inline with the date picker.'
        },
        {
          name: 'labelPosition',
          type: '"left" | "right" | "inline"',
          default: '"left"',
          description: 'Position of the label relative to the date picker field.'
        },
        {
          name: 'placeholder',
          type: 'string',
          default: '"Select date"',
          description: 'Placeholder text shown when no date is selected. Should provide format guidance.'
        },
        {
          name: 'value',
          type: 'Date | null',
          description: 'Controlled date value. Use with onChange for controlled components.'
        },
        {
          name: 'onChange',
          type: '(date: Date | null) => void',
          description: 'Callback function invoked when a date is selected or cleared.'
        },
        {
          name: 'minDate',
          type: 'Date',
          description: 'Minimum selectable date. Dates before this are disabled and cannot be selected.'
        },
        {
          name: 'maxDate',
          type: 'Date',
          description: 'Maximum selectable date. Dates after this are disabled and cannot be selected.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the date picker is in an error state. Shows error styling.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the date picker when error is true.'
        },
        {
          name: 'editable',
          type: 'boolean',
          default: 'true',
          description: 'Whether the date picker can be edited. When false, behaves as read-only text.'
        },
        {
          name: 'showEditIcon',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show an edit icon on hover when not editing.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the date picker, preventing user interaction and calendar opening.'
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Whether the date picker should take full width of its container.'
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Marks the date picker as required. Shows asterisk next to label and enables HTML5 validation.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use for quick, inline date edits where context is clear',
          'Provide clear placeholder text to indicate what can be edited',
          'Use appropriate variant based on context (borderless for text-heavy, underline for forms)',
          'Implement onChange callback to persist date changes',
          'Show edit icon for discoverability when appropriate',
          'Use appropriate size based on surrounding content density',
          'Provide error feedback when validation fails',
          'Use inline label position when space is limited',
          'Ensure the date picker is clearly editable (hover states, edit icons)',
          'Set minDate and maxDate to prevent invalid date selections',
          'Use single date mode for most common use cases'
        ],
        dont: [
          'Don\'t use for complex forms requiring extensive validation',
          'Don\'t use when users need to see all date fields at once',
          'Don\'t hide editability - make it clear the field can be edited',
          'Don\'t use for date range selection (use DatePicker with range mode)',
          'Don\'t use borderless variant when date picker needs clear visual distinction',
          'Don\'t skip onChange implementation - changes should persist',
          'Don\'t use for inputs requiring time selection (use DateTimePicker)',
          'Don\'t make inline date pickers too small to read comfortably',
          'Don\'t use when comprehensive helper text is needed',
          'Don\'t forget to handle date validation and constraints',
          'Don\'t use when space allows for a full date picker input field'
        ]
      }}
      accessibility={{
        keyboard: [
          'Click or Tab to focus and enter edit mode',
          'Enter or Space key opens the calendar popup when input is focused',
          'Arrow keys navigate between dates in the calendar grid',
          'Page Up/Page Down keys navigate between months',
          'Home key moves to first day of month, End key moves to last day',
          'Escape key closes the calendar popup',
          'Type date directly in input field using keyboard (MM/DD/YYYY format)',
          'Tab key moves focus through calendar navigation buttons',
          'Enter key saves changes and exits edit mode when typing date'
        ],
        screenReader: [
          'Label is announced when date picker receives focus',
          'Placeholder text is announced as a hint when empty',
          'Edit mode state is communicated when entering edit mode',
          'Selected date is announced when calendar opens',
          'Current month and year are announced in calendar header',
          'Today\'s date is clearly identified in the calendar grid',
          'Selected dates are announced with their full date information',
          'Disabled dates are announced as "unavailable" or "disabled"',
          'Error state and error message are announced when present',
          'Disabled state is announced as "disabled" or "unavailable"',
          'Value changes are announced when saved'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for date pickers without visible labels',
          'aria-describedby linking to error message when present',
          'aria-invalid="true" when date picker is in error state',
          'aria-disabled="true" when date picker is disabled',
          'aria-required="true" for required date pickers',
          'aria-expanded on calendar trigger to indicate popup state',
          'role="combobox" or role="textbox" on the input element',
          'aria-haspopup="dialog" to indicate calendar popup',
          'aria-live="polite" for dynamic date announcements',
          'aria-readonly="true" when editable is false'
        ]
      }}
      relatedComponents={[
        'DatePicker',
        'Inline Input',
        'Input',
        'Form'
      ]}
      figmaDocumentation={{
        title: 'Inline Date Picker Component Documentation',
        description: 'Complete visual reference showing all inline date picker sizes, variants, states, and configurations from the design system. Includes examples of all interactive states and editing behaviors.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5565-10295',
        figmaNodeId: '5565-10295',
      }}
      examples={[
        {
          title: 'Inline Date Picker',
          description: 'Compact inline date picker for editing a date in place. The field shows the current date as text and switches to an input with calendar when focused. Fits naturally in tables, cards, and settings.',
          media: {
            type: 'image',
            url: '/examples/inline date picker/Inline Date Picker.png',
            alt: 'Inline date picker',
          },
          tags: ['inline', 'single-date', 'compact'],
        },
        {
          title: 'Inline Date Range Picker',
          description: 'Inline date picker in range mode for selecting start and end dates in place. Useful for inline editing of date ranges in lists or forms without a full date picker popup.',
          media: {
            type: 'image',
            url: '/examples/inline date picker/Inline Date Range Picker.png',
            alt: 'Inline date range picker',
          },
          tags: ['inline', 'range', 'compact'],
        },
      ]}
    />
  );
};
