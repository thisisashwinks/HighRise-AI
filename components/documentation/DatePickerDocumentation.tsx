import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const DatePickerDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Date Picker"
      category="Form"
      description="A date selection component with calendar interface for choosing single dates or date ranges. Supports multiple sizes, validation states, and keyboard navigation."
      whenToUse={[
        'Selecting a single date for forms, filters, or scheduling',
        'Choosing date ranges for reports, analytics, or booking systems',
        'Forms requiring date input with visual calendar interface',
        'Applications needing date selection with validation and constraints',
        'When users need to see calendar context while selecting dates',
        'Filtering or searching by date ranges in dashboards'
      ]}
      whenNotToUse={[
        'For time selection only (use TimePicker component instead)',
        'When space is extremely limited (consider a compact date input)',
        'For selecting only month/year without specific dates (use MonthPicker)',
        'When dates need to be entered via keyboard only (use date input field)',
        'For recurring date patterns (use RecurringDatePicker component)',
        'When selecting multiple non-contiguous dates (use MultiDatePicker)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label',
          description: 'Optional text label displayed above the date picker input. Can include required indicator and info tooltip icon.'
        },
        {
          number: 2,
          name: 'Calendar Icon',
          description: 'Visual indicator positioned at the start of the input field, indicating this is a date picker.'
        },
        {
          number: 3,
          name: 'Input Field',
          description: 'Text input displaying the selected date(s) in formatted text. Can be clicked to open calendar popup.'
        },
        {
          number: 4,
          name: 'Clear Button',
          description: 'Optional button (X icon) displayed when a date is selected, allowing users to clear the selection.'
        },
        {
          number: 5,
          name: 'Calendar Popup',
          description: 'Dropdown calendar interface showing month view with navigation controls, day grid, and today button.'
        },
        {
          number: 6,
          name: 'Month Navigation',
          description: 'Previous/next month buttons and current month/year display for navigating between months.'
        },
        {
          number: 7,
          name: 'Day Grid',
          description: 'Grid of days in the current month with visual indicators for today, selected dates, and date ranges.'
        },
        {
          number: 8,
          name: 'Helper Text / Error Message',
          description: 'Text displayed below the input providing guidance or error feedback when validation fails.'
        }
      ]}
      variants={[
        {
          name: 'Single Date',
          description: 'Standard date picker for selecting a single date. Calendar closes automatically after selection.'
        },
        {
          name: 'Date Range',
          description: 'Date picker for selecting a start and end date. Shows visual range highlighting between selected dates.'
        },
        {
          name: 'With Min/Max Date',
          description: 'Date picker with constraints preventing selection of dates outside allowed range. Disabled dates are visually distinct.'
        },
        {
          name: 'With Validation',
          description: 'Date picker with error state and error message displayed when validation fails or invalid date is entered.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state with empty input showing placeholder text. Calendar icon indicates date picker functionality.'
        },
        {
          name: 'Placeholder',
          description: 'Empty input showing placeholder text in lighter color. Provides guidance on expected date format.'
        },
        {
          name: 'Filled',
          description: 'Input containing selected date(s) displayed in formatted text. Clear button appears when date is selected.'
        },
        {
          name: 'Hover',
          description: 'User hovers over the input. Border color may darken slightly to indicate interactivity.'
        },
        {
          name: 'Focused',
          description: 'Input has keyboard focus. Shows primary color border and focus ring. Calendar popup opens automatically.'
        },
        {
          name: 'Open',
          description: 'Calendar popup is visible. User can navigate months and select dates. Popup closes on outside click or date selection.'
        },
        {
          name: 'Error',
          description: 'Date picker contains invalid data or validation failed. Red border and error message displayed below.'
        },
        {
          name: 'Disabled',
          description: 'Date picker is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or open calendar.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting height, padding, font size, and calendar width. XS (32px) to LG (44px).'
        },
        {
          name: 'mode',
          type: '"single" | "range"',
          default: '"single"',
          description: 'Selection mode: single date or date range. Range mode allows selecting start and end dates.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed above the date picker input.'
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
          description: 'Controlled date value for single date mode. Use with onChange for controlled components.'
        },
        {
          name: 'onChange',
          type: '(date: Date | null) => void',
          description: 'Callback function invoked when a single date is selected or cleared.'
        },
        {
          name: 'rangeStart',
          type: 'Date | null',
          description: 'Controlled start date value for range mode. Use with onRangeChange for controlled components.'
        },
        {
          name: 'rangeEnd',
          type: 'Date | null',
          description: 'Controlled end date value for range mode. Use with onRangeChange for controlled components.'
        },
        {
          name: 'onRangeChange',
          type: '(start: Date | null, end: Date | null) => void',
          description: 'Callback function invoked when date range is selected or cleared in range mode.'
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
          description: 'Whether the date picker is in an error state. Shows red border and error styling.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the date picker when error is true.'
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text displayed below the date picker. Shown when not in error state.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the date picker, preventing user interaction and calendar opening.'
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
          'Use appropriate size variants based on form density and importance (MD for most cases)',
          'Provide clear placeholder text that shows expected date format (MM/DD/YYYY)',
          'Use labels for all date pickers to improve accessibility',
          'Set minDate and maxDate to prevent invalid date selections',
          'Show error messages immediately after validation fails',
          'Use range mode when users need to select start and end dates together',
          'Provide helper text for complex date requirements or format guidance',
          'Use single date mode for most common use cases (forms, filters)',
          'Ensure calendar popup is positioned correctly and doesn\'t overflow viewport',
          'Allow keyboard input for power users who prefer typing dates'
        ],
        dont: [
          'Don\'t use placeholder text as the only label (always include a visible label)',
          'Don\'t use error states for validation that hasn\'t occurred yet',
          'Don\'t disable dates without clear indication of why they\'re unavailable',
          'Don\'t use range mode for single date selection (use single mode instead)',
          'Don\'t open calendar automatically on page load (only on focus/click)',
          'Don\'t use date picker for time-only selection (use TimePicker component)',
          'Don\'t truncate error messages (allow them to wrap or expand)',
          'Don\'t use multiple date picker sizes in the same form unnecessarily',
          'Don\'t block calendar navigation without providing alternative date entry method',
          'Don\'t use date picker when space is extremely limited (consider compact alternatives)'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the date picker input field',
          'Enter or Space key opens the calendar popup when input is focused',
          'Arrow keys navigate between dates in the calendar grid',
          'Page Up/Page Down keys navigate between months',
          'Home key moves to first day of month, End key moves to last day',
          'Escape key closes the calendar popup',
          'Type date directly in input field using keyboard (MM/DD/YYYY format)',
          'Tab key moves focus through calendar navigation buttons'
        ],
        screenReader: [
          'Label is announced when date picker receives focus',
          'Placeholder text is announced as a hint for expected format',
          'Selected date is announced when calendar opens',
          'Current month and year are announced in calendar header',
          'Today\'s date is clearly identified in the calendar grid',
          'Selected dates are announced with their full date information',
          'Disabled dates are announced as "unavailable" or "disabled"',
          'Error state and error message are announced when present',
          'Date range start and end are announced separately in range mode'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for date pickers without visible labels',
          'aria-describedby linking to helper text or error message',
          'aria-invalid="true" when date picker is in error state',
          'aria-disabled="true" when date picker is disabled',
          'aria-required="true" for required date pickers',
          'aria-expanded on calendar trigger to indicate popup state',
          'role="combobox" or role="textbox" on the input element',
          'aria-haspopup="dialog" to indicate calendar popup',
          'aria-live="polite" for dynamic date announcements'
        ]
      }}
      relatedComponents={[
        'Input',
        'Select',
        'Form',
        'TimePicker',
        'MonthPicker'
      ]}
      figmaDocumentation={{
        title: 'Date Picker Component Documentation',
        description: 'Complete visual reference showing all date picker sizes, variants, states, and configurations from the design system. Includes examples of single date selection, date ranges, and all interactive states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5565-40176',
        figmaNodeId: '5565-40176',
      }}
      examples={[
        {
          title: 'Default Date Picker',
          description: 'Standard single-date picker with calendar icon, input field, and clear button. Users click the input or icon to open the calendar popup and select a date. Ideal for forms and filters requiring one date.',
          media: {
            type: 'image',
            url: '/examples/date picker/Default Date Picker.png',
            alt: 'Default date picker component',
          },
          tags: ['single', 'default', 'calendar'],
        },
        {
          title: 'Date Range Picker',
          description: 'Date picker in range mode for selecting a start and end date. Highlights the range between selected dates in the calendar and displays both dates in the input. Suited for reports, bookings, and filters.',
          media: {
            type: 'image',
            url: '/examples/date picker/Date Range Picker.png',
            alt: 'Date range picker',
          },
          tags: ['range', 'start', 'end'],
        },
        {
          title: 'Date Time Picker',
          description: 'Date picker extended with time selection. Allows users to choose both date and time in one flow, useful for scheduling, events, and timestamps.',
          media: {
            type: 'image',
            url: '/examples/date picker/Date Time Picker.png',
            alt: 'Date and time picker',
          },
          tags: ['datetime', 'time', 'scheduling'],
        },
        {
          title: 'Date Time Range Picker',
          description: 'Combined date and time range picker for selecting a start and end date and time. Supports use cases like booking slots, availability windows, and time-bounded reports.',
          media: {
            type: 'image',
            url: '/examples/date picker/Date Time Range Picker.png',
            alt: 'Date and time range picker',
          },
          tags: ['range', 'datetime', 'scheduling'],
        },
      ]}
    />
  );
};
