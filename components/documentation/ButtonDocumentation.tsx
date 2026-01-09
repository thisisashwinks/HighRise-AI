import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const ButtonDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Button"
      category="Action"
      description="A versatile button component supporting multiple variants, themes, sizes, and states. Includes support for icons, icon-only buttons, customizable widths, and comprehensive interactive states."
      whenToUse={[
        'Triggering primary actions in forms, modals, or workflows',
        'Navigating to different pages or sections',
        'Confirming or canceling actions',
        'Performing destructive actions (delete, remove) with appropriate theme',
        'Secondary actions that need less visual emphasis',
        'Icon-only buttons for toolbar actions or compact interfaces',
        'Link-style buttons for less prominent actions',
        'Buttons that need to adapt to different container widths'
      ]}
      whenNotToUse={[
        'For navigation between major sections (use Navigation component instead)',
        'For toggling states on/off (use Switch or Toggle instead)',
        'For selecting from a list (use Select or Dropdown instead)',
        'For text links within content (use Link component instead)',
        'For icon-only actions in toolbars without labels (consider IconButton for better accessibility)',
        'When action is not immediately clear from button text or icon'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Leading Icon (Optional)',
          description: 'Icon positioned before the button label. Provides visual context for the action.'
        },
        {
          number: 2,
          name: 'Label',
          description: 'Text content describing the button action. Should be concise and action-oriented.'
        },
        {
          number: 3,
          name: 'Trailing Icon (Optional)',
          description: 'Icon positioned after the button label. Often used for actions like "open" or "next".'
        },
        {
          number: 4,
          name: 'Background & Border',
          description: 'Visual styling that indicates button variant and theme. Changes based on state (hover, focus, active, disabled).'
        },
        {
          number: 5,
          name: 'Focus Ring',
          description: 'Visual indicator shown when button receives keyboard focus. Ensures accessibility compliance.'
        }
      ]}
      variants={[
        {
          name: 'Primary',
          description: 'Filled button with solid background. Used for primary actions. Most prominent variant.'
        },
        {
          name: 'Secondary',
          description: 'Button with light background and border. Used for secondary actions that need less emphasis than primary.'
        },
        {
          name: 'Tertiary',
          description: 'Outlined button with transparent background and border. Used for less prominent actions.'
        },
        {
          name: 'Ghost',
          description: 'Button with transparent background, no border. Used for subtle actions or when space is limited.'
        },
        {
          name: 'Link',
          description: 'Text-only button styled like a link. Used for less prominent actions or when space is very limited.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state showing the button\'s base styling based on variant and theme. Ready for interaction.'
        },
        {
          name: 'Hover',
          description: 'State when user hovers over the button. Background color darkens or changes to indicate interactivity.'
        },
        {
          name: 'Focused',
          description: 'State when button receives keyboard focus. Shows focus ring for accessibility. Maintains hover styling if applicable.'
        },
        {
          name: 'Active',
          description: 'State when button is being pressed (mouse down or keyboard activation). Background darkens further to provide tactile feedback.'
        },
        {
          name: 'Disabled',
          description: 'Button is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or trigger actions.'
        }
      ]}
      props={[
        {
          name: 'variant',
          type: '"primary" | "secondary" | "tertiary" | "ghost" | "link"',
          default: '"primary"',
          description: 'Visual variant of the button affecting background, border, and text styling.'
        },
        {
          name: 'theme',
          type: '"primary" | "neutral" | "destructive" | "warning" | "success"',
          default: '"primary"',
          description: 'Color theme of the button. Primary (blue), Neutral (gray), Destructive (red), Warning (yellow), Success (green).'
        },
        {
          name: 'size',
          type: '"3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
          default: '"md"',
          description: 'Size variant affecting height, padding, and font size. 3XS (24px) to 2XL (60px).'
        },
        {
          name: 'width',
          type: '"fit-content" | "fill-container"',
          default: '"fit-content"',
          description: 'Width behavior. Fit-content sizes to content, fill-container takes full width of parent.'
        },
        {
          name: 'maxWidth',
          type: 'string',
          description: 'Maximum width override. Defaults to 16 characters for fit-content width. Can be overridden with custom CSS value.'
        },
        {
          name: 'iconOnly',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button displays only an icon without text. Requires leadingIcon or trailingIcon.'
        },
        {
          name: 'leadingIcon',
          type: 'ReactNode',
          description: 'Icon element displayed before the button label.'
        },
        {
          name: 'trailingIcon',
          type: 'ReactNode',
          description: 'Icon element displayed after the button label.'
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Button label text or content. Required unless iconOnly is true.'
        },
        {
          name: 'labelClassName',
          type: 'string',
          description: 'Custom CSS classes applied to the label text. Allows font style overrides as specified in design system.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the button, preventing user interaction and showing disabled styling.'
        },
        {
          name: 'onClick',
          type: '(e: MouseEvent<HTMLButtonElement>) => void',
          description: 'Callback function invoked when button is clicked.'
        },
        {
          name: 'type',
          type: '"button" | "submit" | "reset"',
          default: '"button"',
          description: 'Button type attribute. Use "submit" for form submission buttons.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use primary variant for the main action on a page or in a modal',
          'Use destructive theme for delete, remove, or other destructive actions',
          'Use appropriate size based on context (MD for most cases, LG for prominent CTAs)',
          'Provide clear, action-oriented labels (e.g., "Save Changes" not "OK")',
          'Use icon-only buttons sparingly and ensure they have aria-label for accessibility',
          'Use fill-container width for full-width buttons in forms or mobile layouts',
          'Use warning theme for actions that require user caution',
          'Use success theme for positive confirmations or completion actions',
          'Ensure button labels are concise but descriptive (1-3 words typically)',
          'Use consistent button styling within the same interface or workflow'
        ],
        dont: [
          'Don\'t use primary variant for destructive actions (use destructive theme instead)',
          'Don\'t use multiple primary buttons on the same screen',
          'Don\'t use icon-only buttons without aria-label or tooltip',
          'Don\'t use button text longer than 16 characters without considering maxWidth override',
          'Don\'t disable buttons without clear indication of why',
          'Don\'t use link variant for primary actions',
          'Don\'t mix button sizes unnecessarily within the same interface',
          'Don\'t use buttons for navigation between major sections (use Navigation component)',
          'Don\'t use ghost or link variants for critical actions',
          'Don\'t override font styles unless necessary for brand consistency'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the button',
          'Enter or Space key activates the button when focused',
          'Focus ring is visible for keyboard navigation',
          'Disabled buttons cannot receive focus',
          'Buttons in forms can trigger form submission with Enter key'
        ],
        screenReader: [
          'Button label is announced when button receives focus',
          'Button state (disabled, pressed) is announced',
          'Icon-only buttons require aria-label for accessibility',
          'Button role is implicit for native button elements',
          'Button purpose is clear from accessible name'
        ],
        ariaHints: [
          'aria-label for icon-only buttons without visible text',
          'aria-disabled="true" for disabled buttons (though native disabled attribute is preferred)',
          'aria-pressed for toggle buttons (not applicable to standard buttons)',
          'aria-describedby to link button to additional descriptive text',
          'aria-busy for buttons that trigger async actions'
        ]
      }}
      relatedComponents={[
        'Input',
        'Form',
        'Modal',
        'Dropdown',
        'IconButton',
        'Link'
      ]}
      figmaDocumentation={{
        title: 'Button Component Documentation',
        description: 'Complete visual reference showing all button variants, themes, sizes, states, and configurations from the design system. Includes examples of all interactive states, icon-only buttons, and width configurations.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=53-42845',
        figmaNodeId: '53:42845',
      }}
      examples={[
        {
          title: 'AI Buttons',
          description: 'Specialized button variants designed for AI-powered features and interactions. These buttons provide clear visual indicators for AI-related actions and states, helping users understand when AI is active or available.',
          media: {
            type: 'image',
            url: '/examples/button/AI Buttons.png',
            alt: 'AI-themed buttons with various states and styles',
          },
          tags: ['ai', 'interactive', 'states', 'variants'],
          critique: 'AI buttons provide clear visual distinction for AI-powered features. The styling helps users identify AI-related actions quickly. The variants cover different use cases from primary actions to icon-only buttons for AI features.',
        },
        {
          title: 'Pulsating Buttons When AI is Working',
          description: 'Interactive button that pulses when AI is performing actions. The button includes a pulsing animation on the icon, changes background color, and can toggle between generating and idle states. The button adapts its appearance based on whether the AI panel is open or closed.',
          media: {
            type: 'html',
            url: '/examples/button/pulsating-ai-button.html',
            alt: 'Pulsating AI button with animation controls',
          },
          tags: ['ai', 'animation', 'pulsating', 'interactive', 'states'],
          critique: 'The pulsating animation provides clear visual feedback that AI is actively working. The button state changes are intuitive and help users understand the current AI status. The ability to toggle between panel states adds flexibility to the interface. The animation is subtle enough not to be distracting while still being noticeable.',
        },
        {
          title: 'Canvas Takeover When AI is Performing Actions',
          description: 'When AI agents are performing actions on behalf of the user, the entire canvas is highlighted with a purple border and shimmer effect. A working bar appears at the bottom with a "Working" indicator and stop button, similar to Perplexity\'s Comet Browser or ChatGPT\'s Atlas browser agents.',
          media: {
            type: 'image',
            url: '/examples/button/Canvas Takeover.png',
            alt: 'Canvas takeover with purple highlight and working indicator',
          },
          tags: ['ai', 'canvas', 'takeover', 'visual-feedback', 'working-state'],
        },
      ]}
    />
  );
};

