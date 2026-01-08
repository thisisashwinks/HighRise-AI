import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const InputFormDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Input Form"
      category="Form"
      description="A comprehensive form component that arranges multiple Input fields in organized sections with flexible column layouts. Supports headers, footers, dividers, section labels with icons, and various loading states."
      whenToUse={[
        'Creating multi-field forms with organized sections',
        'Forms requiring flexible column layouts (1, 2, or 3 columns)',
        'Forms that need visual separation between sections',
        'Complex forms with multiple related input groups',
        'Forms requiring loading or error states',
        'Forms that need consistent spacing and alignment across fields',
        'Forms with optional headers and footers for context'
      ]}
      whenNotToUse={[
        'Single input fields (use Input component directly)',
        'Simple forms with only 1-2 fields',
        'Forms requiring custom layouts not supported by the grid system',
        'Forms that need dynamic field addition/removal (use a form builder)',
        'Forms requiring complex validation logic (wrap InputForm in a form library)',
        'Forms with non-input elements mixed in (use custom layout)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Header (Optional)',
          description: 'Optional header component displayed at the top of the form. Typically uses Header Lite component for consistent styling.'
        },
        {
          number: 2,
          name: 'Section Label',
          description: 'Optional label for each section, displayed above the input fields. Can include an icon for visual context.'
        },
        {
          number: 3,
          name: 'Input Fields Grid',
          description: 'Grid layout containing Input components. Supports 1, 2, or 3 column layouts that adapt responsively.'
        },
        {
          number: 4,
          name: 'Divider (Optional)',
          description: 'Optional horizontal divider between sections. Provides visual separation when dividers prop is enabled.'
        },
        {
          number: 5,
          name: 'Footer (Optional)',
          description: 'Optional footer component displayed at the bottom of the form. Typically uses Section Footer component.'
        }
      ]}
      variants={[
        {
          name: 'Single Column',
          description: 'All input fields arranged in a single column. Best for narrow containers or when fields need full width.'
        },
        {
          name: 'Two Column',
          description: 'Input fields arranged in two columns. Ideal for forms with multiple related fields that can be displayed side-by-side.'
        },
        {
          name: 'Three Column',
          description: 'Input fields arranged in three columns. Useful for compact forms with many short fields like address forms.'
        },
        {
          name: 'With Header',
          description: 'Form includes a header section for title, description, or contextual information.'
        },
        {
          name: 'With Footer',
          description: 'Form includes a footer section for actions, help text, or additional information.'
        },
        {
          name: 'With Dividers',
          description: 'Visual dividers between sections provide clear separation for better organization.'
        },
        {
          name: 'With Section Icons',
          description: 'Section labels include icons to provide visual context and improve scannability.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Normal form state displaying all input fields in their configured layout. All fields are interactive and ready for user input.'
        },
        {
          name: 'Loading',
          description: 'Form is loading data. Shows a spinner and loading message. Input fields are hidden during this state.'
        },
        {
          name: 'Error Loading',
          description: 'Form failed to load. Shows an error icon and message. User can retry or contact support.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting input field sizes and spacing throughout the form. SM (36px), MD (40px), LG (44px).'
        },
        {
          name: 'columns',
          type: '1 | 2 | 3 | number',
          default: '1',
          description: 'Number of columns for the input field grid. Supports 1, 2, 3, or custom number. Responsive breakpoints apply.'
        },
        {
          name: 'header',
          type: 'ReactNode',
          description: 'Optional header component to display at the top of the form. Typically a Header Lite component.'
        },
        {
          name: 'footer',
          type: 'ReactNode',
          description: 'Optional footer component to display at the bottom of the form. Typically a Section Footer component.'
        },
        {
          name: 'sections',
          type: 'Array<InputFormSection>',
          description: 'Array of form sections, each containing a label, optional icon, and array of input field configurations.'
        },
        {
          name: 'dividers',
          type: 'boolean',
          default: 'false',
          description: 'Whether to show dividers between sections. Provides visual separation for better organization.'
        },
        {
          name: 'showIcons',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display icons in section labels when provided. Icons are hidden when false.'
        },
        {
          name: 'state',
          type: '"default" | "loading" | "error"',
          default: '"default"',
          description: 'Current state of the form. Loading shows spinner, error shows error message, default shows form fields.'
        },
        {
          name: 'loadingMessage',
          type: 'string',
          default: '"Loading form..."',
          description: 'Message displayed during loading state. Shown below the loading spinner.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          default: '"Failed to load form"',
          description: 'Error message displayed when state is "error". Shown with an error icon.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to the form container.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use appropriate column layouts based on field count and container width (2 columns for most forms)',
          'Group related fields into logical sections with descriptive labels',
          'Use dividers when forms have multiple distinct sections',
          'Include icons in section labels for better visual hierarchy and scannability',
          'Use headers to provide context about the form\'s purpose',
          'Use footers for form actions, help text, or legal disclaimers',
          'Match form size to the importance and context of the form (MD for most cases)',
          'Use loading state when fetching initial form data',
          'Use error state with helpful error messages when form fails to load',
          'Ensure consistent spacing and alignment across all fields'
        ],
        dont: [
          'Don\'t use more than 3 columns unless absolutely necessary (becomes hard to scan)',
          'Don\'t create sections with only one field unless it needs visual separation',
          'Don\'t use dividers for forms with only one section',
          'Don\'t mix different input sizes within the same form',
          'Don\'t use loading state for form submission (use button loading state instead)',
          'Don\'t show error state for field-level validation errors (use Input error prop)',
          'Don\'t overload forms with too many sections (consider multi-step forms)',
          'Don\'t use icons that don\'t add meaningful context',
          'Don\'t create forms wider than the viewport without responsive breakpoints',
          'Don\'t use headers/footers for content that should be in the page layout'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key navigates through input fields in order',
          'Enter key submits form if within a form element',
          'Arrow keys navigate within dropdown selects when open',
          'Escape key closes open dropdowns',
          'All standard HTML form keyboard navigation applies'
        ],
        screenReader: [
          'Section labels are announced when navigating to fields within that section',
          'Icons in section labels are announced with appropriate alt text',
          'Form structure and organization are clear to screen readers',
          'Loading and error states are announced appropriately',
          'Header and footer content is announced in logical order'
        ],
        ariaHints: [
          'Use aria-labelledby to associate section labels with their fields',
          'Use aria-describedby for form-level help text',
          'Use role="group" for each section when appropriate',
          'Use aria-live="polite" for loading and error state announcements',
          'Ensure proper form element nesting for semantic HTML'
        ]
      }}
      relatedComponents={[
        'Input',
        'Select',
        'Dropdown',
        'Button',
        'Textarea',
        'Checkbox',
        'Radio'
      ]}
      figmaDocumentation={{
        title: 'Input Form Component Documentation',
        description: 'Complete visual reference showing all Input Form sizes, column layouts, states, and configurations from the design system. Includes examples of all interactive states and layout variations.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5112-71173',
        figmaNodeId: '5112-71173',
      }}
      examples={[
        {
          title: 'Input Form Label',
          description: 'Input form with clear section labels that help organize and categorize form fields. Labels provide context and improve form scannability, making it easier for users to understand the purpose of each section and complete the form efficiently.',
          media: {
            type: 'image',
            url: '/examples/input-form/Input Form Label.png',
            alt: 'Input form with section labels',
          },
          tags: ['labels', 'sections', 'organization'],
        },
        {
          title: 'Input Form with Different Input Types',
          description: 'Input form showcasing various input field types integrated within a single form layout. This demonstrates how different input types (text, number, select, etc.) can be seamlessly combined in a cohesive form structure with consistent styling and spacing.',
          media: {
            type: 'image',
            url: '/examples/input-form/Input Form (With Different Input Types).png',
            alt: 'Input form with different input types',
          },
          tags: ['input-types', 'variety', 'integration'],
        },
        {
          title: 'Input Form in Cards',
          description: 'Input form displayed within card containers, providing visual separation and elevated presentation. Cards help group related form sections and create a more structured, organized appearance that enhances the user experience and makes complex forms feel more manageable.',
          media: {
            type: 'image',
            url: '/examples/input-form/Input Form in Cards.png',
            alt: 'Input form displayed in card layout',
          },
          tags: ['cards', 'layout', 'visual-separation'],
        },
      ]}
    />
  );
};
