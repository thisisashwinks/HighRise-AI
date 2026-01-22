import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const RadioCardDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Radio Card"
      category="Form"
      description="A card-based radio button component that combines visual content with single-selection functionality. Perfect for selecting one option from multiple choices that need additional context, such as plan selection, feature selection, or single-choice scenarios. The card format allows for richer content including icons, descriptions, and custom slots."
      whenToUse={[
        'Selecting a single option from multiple choices that need visual distinction (e.g., pricing plans, feature sets)',
        'When options require additional context or descriptions to help users make informed choices',
        'For single-select scenarios where users need to see all options clearly',
        'When options benefit from visual icons or custom content to differentiate them',
        'For settings or configuration screens where only one option can be selected',
        'When grouping related options in a card-based layout improves comprehension'
      ]}
      whenNotToUse={[
        'For simple binary choices (use standard Radio instead)',
        'When space is extremely limited (use compact Radio buttons)',
        'For multi-select scenarios (use Checkbox Card instead)',
        'When options don\'t need additional visual context or descriptions',
        'For inline form selections where card format would be disruptive',
        'When the selection mechanism should be less prominent than the content'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Icon (Optional)',
          description: 'Visual icon that represents the option. Can be a default icon or a custom icon slot for brand-specific content.'
        },
        {
          number: 2,
          name: 'Label',
          description: 'Primary text describing the option. Should be concise and clearly identify what is being selected.'
        },
        {
          number: 3,
          name: 'Label Icon (Optional)',
          description: 'Small icon next to the label, typically used for additional information or help indicators.'
        },
        {
          number: 4,
          name: 'Description (Optional)',
          description: 'Secondary text providing additional context about the option. Helps users understand the implications of their selection.'
        },
        {
          number: 5,
          name: 'Custom Slot (Optional)',
          description: 'Flexible area for custom content such as badges, additional information, or interactive elements specific to the option.'
        },
        {
          number: 6,
          name: 'Radio Button',
          description: 'Selection control positioned on the right side of the card. Indicates the selected state and allows users to select this option.'
        },
        {
          number: 7,
          name: 'Card Border',
          description: 'Visual boundary that changes color based on state (default, hover, selected, error, disabled). Provides clear visual feedback for interaction.'
        }
      ]}
      variants={[
        {
          name: 'With Icon',
          description: 'Card includes a featured icon to visually distinguish the option. Icons can be colored or neutral based on state.'
        },
        {
          name: 'With Custom Icon',
          description: 'Card includes a custom icon slot for brand-specific or context-specific visual content.'
        },
        {
          name: 'With Description',
          description: 'Card includes descriptive text below the label to provide additional context about the option.'
        },
        {
          name: 'With Custom Content',
          description: 'Card includes a custom content slot for additional information, badges, or interactive elements.'
        },
        {
          name: 'With Label Icon',
          description: 'Card includes a small icon next to the label, typically for help or information purposes.'
        },
        {
          name: 'Minimal',
          description: 'Card with only label and radio button, no additional visual elements or descriptions.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial unselected state with neutral border. Ready for interaction.'
        },
        {
          name: 'Hover',
          description: 'State when user hovers over the card. Border color changes to blue and shadow appears to indicate interactivity.'
        },
        {
          name: 'Selected',
          description: 'State when the option is selected. Border changes to blue (#155eef) and radio button is checked. Only one card in a group can be selected at a time.'
        },
        {
          name: 'Disabled',
          description: 'Card is not interactive. All text and icons are grayed out, border remains neutral, and radio button is disabled.'
        },
        {
          name: 'Error',
          description: 'Card shows error state with red border. Can be combined with selected state. Used for validation feedback.'
        }
      ]}
      props={[
        {
          name: 'label',
          type: 'string',
          description: 'Primary text displayed on the card. Required and should clearly identify the option.'
        },
        {
          name: 'description',
          type: 'string',
          description: 'Optional secondary text displayed below the label. Provides additional context about the option.'
        },
        {
          name: 'checked',
          type: 'boolean',
          default: 'false',
          description: 'Whether the radio button is checked. Controls the selected state of the card. Only one card in a group should be checked.'
        },
        {
          name: 'state',
          type: '"Default" | "Hover" | "Selected" | "Disabled"',
          description: 'Manual state override. If not provided, state is automatically determined from checked, disabled, and hover props.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the card is in an error state. Shows red border and error styling on radio button.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the card, preventing interaction and showing disabled styling.'
        },
        {
          name: 'name',
          type: 'string',
          description: 'Required for radio groups. All radio cards in the same group must share the same name attribute to ensure mutual exclusivity.'
        },
        {
          name: 'value',
          type: 'string',
          description: 'The value of the radio card. Used when the card is part of a form to identify which option was selected.'
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description: 'Default icon element displayed in the featured icon area. Typically an SVG or icon component.'
        },
        {
          name: 'customIcon',
          type: 'ReactNode',
          description: 'Custom icon element displayed in the custom icon slot. Takes precedence over icon prop when provided.'
        },
        {
          name: 'labelIcon',
          type: 'ReactNode',
          description: 'Small icon displayed next to the label. Often used for help or information indicators.'
        },
        {
          name: 'custom',
          type: 'ReactNode',
          description: 'Custom content displayed in the custom slot area below the label. Can include badges, additional info, or interactive elements.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes applied to the card container.'
        },
        {
          name: 'onChange',
          type: '(checked: boolean) => void',
          description: 'Callback function invoked when radio state changes. Receives the new checked state.'
        },
        {
          name: 'onClick',
          type: '(e: MouseEvent<HTMLDivElement>) => void',
          description: 'Callback function invoked when the card is clicked. Can be used for additional interactions beyond radio selection.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use for single-selection scenarios where options need visual distinction',
          'Always use the same name attribute for all radio cards in a group',
          'Include descriptions when options need clarification or additional information',
          'Use icons to help users quickly identify and differentiate options',
          'Group related radio cards together with consistent spacing',
          'Use error state to provide clear validation feedback',
          'Ensure labels are concise but descriptive (typically 1-3 words)',
          'Use custom slots for dynamic content that enhances decision-making',
          'Maintain consistent card sizing within a group',
          'Use selected state to clearly indicate user choice',
          'Provide clear visual hierarchy between label and description'
        ],
        dont: [
          'Don\'t use for multi-select scenarios (use Checkbox Card instead)',
          'Don\'t use radio cards without grouping them with the same name attribute',
          'Don\'t use for simple binary choices that don\'t need card format',
          'Don\'t mix radio cards with standard radio buttons in the same selection group',
          'Don\'t use overly long descriptions that make cards difficult to scan',
          'Don\'t use error state without clear indication of what needs to be fixed',
          'Don\'t disable cards without explaining why they\'re unavailable',
          'Don\'t use inconsistent icon styles or sizes within a group',
          'Don\'t make cards too wide or too narrow - maintain readable proportions',
          'Don\'t use custom content that distracts from the selection purpose',
          'Don\'t overload cards with too much information - keep them scannable'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the card',
          'Space or Enter key selects the radio button when card is focused',
          'Arrow keys navigate between radio cards in the same group',
          'Focus ring is visible for keyboard navigation',
          'Disabled cards cannot receive focus',
          'Card is keyboard accessible as a whole, not just the radio button'
        ],
        screenReader: [
          'Card label and description are announced when card receives focus',
          'Radio state (checked/unchecked) is announced',
          'Radio group name and position (e.g., "Option 1 of 3") is announced',
          'Error state is announced when present',
          'Disabled state is announced when card is disabled',
          'Custom content should be properly labeled if it contains important information'
        ],
        ariaHints: [
          'role="radio" on the card container',
          'aria-checked indicates the checked state',
          'aria-disabled indicates the disabled state',
          'aria-invalid indicates error state',
          'aria-describedby can link card to additional descriptive text',
          'name attribute groups radio cards together for mutual exclusivity'
        ]
      }}
      relatedComponents={[
        'Radio',
        'Checkbox Card',
        'Select',
        'Dropdown',
        'Input Form'
      ]}
      figmaDocumentation={{
        title: 'Radio Card Component Documentation',
        description: 'Complete visual reference showing all radio card variants, states, and configurations from the design system. Includes examples with icons, descriptions, custom content, and error states.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5329-29954',
        figmaNodeId: '5329:29954',
      }}
      examples={[]}
    />
  );
};
