import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const ToggleCardGroupDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Toggle Card Group"
      category="Form"
      description="A group component for displaying multiple toggle card components together with consistent styling and behavior. Each card contains an icon, label, optional description, and a toggle switch. Supports horizontal and vertical layouts, multiple states, and comprehensive state management."
      whenToUse={[
        'Displaying multiple related toggle options with rich visual context',
        'Settings panels requiring card-based toggle switches with descriptions',
        'Feature selection interfaces where each option needs detailed information',
        'Plan or tier selection with enable/disable toggles',
        'When you need visual distinction between toggle options',
        'Grouping related toggle cards with consistent styling',
        'When each toggle option benefits from additional context (icons, descriptions)'
      ]}
      whenNotToUse={[
        'For simple toggle switches without additional context (use Toggle Switch Group instead)',
        'For single toggle card (use ToggleCard component directly)',
        'When toggle options don\'t need visual distinction or additional information',
        'For single-selection scenarios (use Radio Card Group instead)',
        'When space is very limited and cards would be too cramped',
        'For simple binary settings without descriptions or icons'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Icon (Optional)',
          description: 'Visual icon displayed on the left side of the card. Can be a default icon with purple background or a custom icon.'
        },
        {
          number: 2,
          name: 'Label',
          description: 'Primary text label describing the toggle option. Displayed prominently at the top of the card content.'
        },
        {
          number: 3,
          name: 'Label Icon (Optional)',
          description: 'Small icon displayed next to the label. Used for additional context or information.'
        },
        {
          number: 4,
          name: 'Description (Optional)',
          description: 'Secondary text providing additional context or details about the toggle option. Displayed below the label.'
        },
        {
          number: 5,
          name: 'Toggle Switch',
          description: 'Toggle switch component positioned on the right side of the card. Indicates and controls the checked state.'
        },
        {
          number: 6,
          name: 'Card Border',
          description: 'Border around the card that changes color based on state (purple when selected, red when error, gray when disabled).'
        }
      ]}
      variants={[
        {
          name: 'Horizontal',
          description: 'Toggle cards arranged in a horizontal row with wrapping support. Best for compact layouts when space allows.'
        },
        {
          name: 'Vertical',
          description: 'Toggle cards arranged in a vertical column. Best for longer descriptions, mobile layouts, and better readability.'
        },
        {
          name: 'With Icon',
          description: 'Cards with default purple icon background or custom icons. Provides visual distinction and context.'
        },
        {
          name: 'Without Icon',
          description: 'Cards without icons. Used when visual distinction is not needed or space is limited.'
        },
        {
          name: 'With Description',
          description: 'Cards with descriptive text below the label. Provides additional context for each toggle option.'
        },
        {
          name: 'Without Description',
          description: 'Cards without descriptions. Used when labels are self-explanatory or space is limited.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state showing the card with gray border. Toggle switch is unchecked. Card is interactive and ready for user interaction.'
        },
        {
          name: 'Hover',
          description: 'State when user hovers over the card. Shows purple border tint and subtle shadow. Indicates the card is interactive.'
        },
        {
          name: 'Selected',
          description: 'State when toggle switch is checked. Shows purple border and toggle switch is in checked position. Indicates the option is enabled.'
        },
        {
          name: 'Disabled',
          description: 'Card is not interactive. Grayed out appearance with reduced opacity. Toggle switch is disabled and cannot be changed.'
        },
        {
          name: 'Error',
          description: 'Card has an error state indicated by red border. Can be combined with checked or unchecked states for validation feedback.'
        }
      ]}
      props={[
        {
          name: 'options',
          type: 'Array<ToggleCardOption>',
          description: 'Array of toggle card options to display. Each option includes value, label, optional description, icon, checked, disabled, and error properties.'
        },
        {
          name: 'direction',
          type: '"horizontal" | "vertical"',
          default: '"vertical"',
          description: 'Layout direction for the toggle card group. Horizontal arranges cards in a row, vertical stacks them.'
        },
        {
          name: 'value',
          type: 'string[]',
          default: '[]',
          description: 'Array of selected toggle card values. Controls which toggle cards are checked.'
        },
        {
          name: 'onChange',
          type: '(value: string[]) => void',
          description: 'Callback function invoked when any toggle card state changes. Receives updated array of selected values.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the toggle card group container. Allows layout and spacing customization.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use vertical layout for longer descriptions and better readability',
          'Use horizontal layout for compact spaces when cards have short content',
          'Provide clear, descriptive labels for each toggle option',
          'Use descriptions to provide additional context when needed',
          'Use icons to provide visual distinction and context',
          'Use selected state to clearly indicate enabled options',
          'Use error state with clear error messaging',
          'Group related toggle cards together logically',
          'Ensure consistent spacing between cards',
          'Use disabled state when toggle cannot be changed due to dependencies'
        ],
        dont: [
          'Don\'t use toggle card groups for simple toggle switches without context',
          'Don\'t use horizontal layout when cards have long descriptions',
          'Don\'t use error state without providing clear error messaging',
          'Don\'t mix unrelated toggle cards in the same group',
          'Don\'t use toggle card groups when each toggle needs completely independent behavior',
          'Don\'t hide important information in descriptions',
          'Don\'t use toggle card groups for single-selection scenarios (use Radio Card Group)',
          'Don\'t use toggle card groups without proper labels for accessibility',
          'Don\'t override default spacing unnecessarily',
          'Don\'t use too many cards in horizontal layout without wrapping'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus between toggle cards in the group',
          'Space key or Enter key toggles the switch when card receives focus',
          'Focus ring is visible for keyboard navigation',
          'Disabled toggle cards cannot receive focus',
          'Group maintains logical tab order'
        ],
        screenReader: [
          'Card label and description are announced when card receives focus',
          'Toggle switch state (checked/unchecked) is announced',
          'Error state is announced when error prop is true',
          'Disabled state is announced for disabled toggle cards',
          'Card role="switch" is used for proper screen reader support'
        ],
        ariaHints: [
          'role="switch" for each toggle card',
          'aria-checked="true" for checked cards, aria-checked="false" for unchecked',
          'aria-invalid="true" for cards with error state',
          'aria-disabled="true" for disabled cards',
          'Proper labels and descriptions for screen reader context'
        ]
      }}
      relatedComponents={[
        'ToggleCard',
        'Toggle',
        'ToggleSwitchGroup',
        'CheckboxCard',
        'RadioCard',
        'Form'
      ]}
      figmaDocumentation={{
        title: 'Toggle Card Group Component Documentation',
        description: 'Complete visual reference showing all toggle card group layouts, states, variants, and configurations from the design system. Includes examples of horizontal and vertical layouts, icon styles, and error states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5350-241774',
        figmaNodeId: '5350:241774',
      }}
      examples={[]}
    />
  );
};
