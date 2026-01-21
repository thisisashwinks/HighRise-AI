import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const CheckboxCardDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Checkbox Card"
      category="Form"
      description="A card-based checkbox component that combines visual content with selection functionality. Perfect for selecting options that need additional context, such as plan selection, feature toggles, or multi-step choices. The card format allows for richer content including icons, descriptions, and custom slots."
      whenToUse={[
        'Selecting from multiple options that need visual distinction (e.g., pricing plans, feature sets)',
        'When options require additional context or descriptions to help users make informed choices',
        'For multi-select scenarios where users need to see all options clearly',
        'When options benefit from visual icons or custom content to differentiate them',
        'For settings or configuration screens where options need clear visual representation',
        'When grouping related options in a card-based layout improves comprehension'
      ]}
      whenNotToUse={[
        'For simple binary choices (use standard Checkbox instead)',
        'When space is extremely limited (use compact Checkbox or Radio buttons)',
        'For single-select scenarios (use Radio Card or Select component instead)',
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
          name: 'Checkbox',
          description: 'Selection control positioned on the right side of the card. Indicates the selected state and allows users to toggle selection.'
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
          description: 'Card with only label and checkbox, no additional visual elements or descriptions.'
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
          description: 'State when the option is selected. Border changes to blue (#155eef) and checkbox is checked. Card remains interactive for deselection.'
        },
        {
          name: 'Disabled',
          description: 'Card is not interactive. All text and icons are grayed out, border remains neutral, and checkbox is disabled.'
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
          description: 'Whether the checkbox is checked. Controls the selected state of the card.'
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
          description: 'Whether the card is in an error state. Shows red border and error styling on checkbox.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the card, preventing interaction and showing disabled styling.'
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
          description: 'Callback function invoked when checkbox state changes. Receives the new checked state.'
        },
        {
          name: 'onClick',
          type: '(e: MouseEvent<HTMLDivElement>) => void',
          description: 'Callback function invoked when the card is clicked. Can be used for additional interactions beyond checkbox toggle.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use for options that benefit from visual distinction and additional context',
          'Include descriptions when options need clarification or additional information',
          'Use icons to help users quickly identify and differentiate options',
          'Group related checkbox cards together with consistent spacing',
          'Use error state to provide clear validation feedback',
          'Ensure labels are concise but descriptive (typically 1-3 words)',
          'Use custom slots for dynamic content that enhances decision-making',
          'Maintain consistent card sizing within a group',
          'Use selected state to clearly indicate user choices',
          'Provide clear visual hierarchy between label and description'
        ],
        dont: [
          'Don\'t use for simple binary choices that don\'t need card format',
          'Don\'t mix checkbox cards with standard checkboxes in the same selection group',
          'Don\'t use overly long descriptions that make cards difficult to scan',
          'Don\'t use error state without clear indication of what needs to be fixed',
          'Don\'t disable cards without explaining why they\'re unavailable',
          'Don\'t use inconsistent icon styles or sizes within a group',
          'Don\'t make cards too wide or too narrow - maintain readable proportions',
          'Don\'t use custom content that distracts from the selection purpose',
          'Don\'t use for single-select scenarios (use Radio Card instead)',
          'Don\'t overload cards with too much information - keep them scannable'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the card',
          'Space or Enter key toggles the checkbox when card is focused',
          'Focus ring is visible for keyboard navigation',
          'Disabled cards cannot receive focus',
          'Card is keyboard accessible as a whole, not just the checkbox'
        ],
        screenReader: [
          'Card label and description are announced when card receives focus',
          'Checkbox state (checked/unchecked) is announced',
          'Error state is announced when present',
          'Disabled state is announced when card is disabled',
          'Custom content should be properly labeled if it contains important information'
        ],
        ariaHints: [
          'role="checkbox" on the card container',
          'aria-checked indicates the checked state',
          'aria-disabled indicates the disabled state',
          'aria-invalid indicates error state',
          'aria-describedby can link card to additional descriptive text'
        ]
      }}
      relatedComponents={[
        'Checkbox',
        'Radio Card',
        'Select',
        'Dropdown',
        'Input Form'
      ]}
      figmaDocumentation={{
        title: 'Checkbox Card Component Documentation',
        description: 'Complete visual reference showing all checkbox card variants, states, and configurations from the design system. Includes examples with icons, descriptions, custom content, and error states.',
        figmaUrl: 'https://www.figma.com/design/QSeD9oVn66FWPsndpW6INE/HighRise-AI-1.1?node-id=26951-12512',
        figmaNodeId: '26951:12512',
      }}
      examples={[]}
    />
  );
};
