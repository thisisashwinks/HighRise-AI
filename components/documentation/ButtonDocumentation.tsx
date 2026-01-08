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
          title: 'Primary CTA Buttons in Stripe',
          description: 'Stripe uses primary buttons prominently for the main action on checkout pages. The button is full-width on mobile and clearly labeled to guide users through the payment process.',
          media: {
            type: 'image',
            url: '/examples/button/button-primary-stripe-cta.png',
            alt: 'Primary CTA button in Stripe checkout',
          },
          productName: 'Stripe',
          productUrl: 'https://stripe.com',
          tags: ['primary', 'cta', 'checkout', 'full-width'],
          critique: 'The primary button is prominently placed and uses clear, action-oriented text. The full-width design on mobile ensures easy tapping. However, the button could benefit from a loading state during payment processing.',
          highLevelApplication: 'HighLevel could use this pattern for primary actions in funnels, checkout flows, and form submissions. We should ensure buttons are clearly labeled with action verbs and provide loading states for async operations.',
        },
        {
          title: 'Destructive Action Buttons in GitHub',
          description: 'GitHub uses destructive-themed buttons for dangerous actions like deleting repositories. The red color clearly indicates the action is irreversible, and the button is placed away from primary actions.',
          media: {
            type: 'image',
            url: '/examples/button/button-destructive-github.png',
            alt: 'Destructive delete button in GitHub settings',
          },
          productName: 'GitHub',
          productUrl: 'https://github.com',
          tags: ['destructive', 'danger', 'delete', 'confirmation'],
          critique: 'The destructive theme clearly communicates danger. The button is placed in a separate section and requires confirmation. However, the confirmation modal could be more prominent to prevent accidental deletions.',
          highLevelApplication: 'HighLevel should use destructive buttons for delete, remove, and other irreversible actions. We should place them away from primary actions and require explicit confirmation, especially for critical operations like deleting campaigns or contacts.',
        },
        {
          title: 'Icon-Only Buttons in Figma Toolbar',
          description: 'Figma uses icon-only buttons in toolbars for quick actions. Each button has a tooltip on hover to explain its function, making the interface clean while maintaining discoverability.',
          media: {
            type: 'gif',
            url: '/examples/button/button-icon-figma-toolbar.gif',
            alt: 'Icon-only buttons in Figma toolbar with tooltips',
          },
          productName: 'Figma',
          productUrl: 'https://www.figma.com',
          tags: ['icon-only', 'toolbar', 'tooltip', 'compact'],
          critique: 'Icon-only buttons save space and create a clean interface. The tooltips provide necessary context. However, the icons should be universally recognizable, and keyboard shortcuts should be available for power users.',
          highLevelApplication: 'HighLevel could use icon-only buttons in editor toolbars, action menus, and compact interfaces. We should ensure all icon-only buttons have tooltips and aria-labels for accessibility, and consider adding keyboard shortcuts.',
        },
        {
          title: 'Button Groups in Linear',
          description: 'Linear uses button groups to organize related actions. Primary and secondary buttons are grouped together, with clear visual hierarchy indicating the primary action.',
          media: {
            type: 'image',
            url: '/examples/button/button-group-linear.png',
            alt: 'Button group with primary and secondary actions in Linear',
          },
          productName: 'Linear',
          productUrl: 'https://linear.app',
          tags: ['button-group', 'primary', 'secondary', 'hierarchy'],
          critique: 'The button grouping creates clear visual hierarchy. The primary action stands out while secondary actions remain accessible. The spacing and alignment create a cohesive interface.',
          highLevelApplication: 'HighLevel could use button groups in modals, forms, and detail pages where multiple actions are available. We should maintain clear hierarchy with primary actions more prominent than secondary or cancel actions.',
        },
        {
          title: 'Loading States in Vercel',
          description: 'Vercel shows loading states on buttons during deployment and other async operations. The button displays a spinner and disabled state, preventing duplicate submissions.',
          media: {
            type: 'video',
            url: '/examples/button/button-loading-vercel.mp4',
            alt: 'Button with loading state during deployment in Vercel',
            thumbnailUrl: '/examples/button/button-loading-vercel-thumb.png',
          },
          productName: 'Vercel',
          productUrl: 'https://vercel.com',
          tags: ['loading', 'async', 'disabled', 'feedback'],
          critique: 'The loading state provides clear feedback that an action is in progress. The disabled state prevents duplicate submissions. The spinner animation is subtle and doesn\'t distract from the content.',
          highLevelApplication: 'HighLevel should implement loading states for all async button actions, especially form submissions, API calls, and data operations. We should show spinners, disable the button, and provide clear feedback about the operation status.',
        },
      ]}
    />
  );
};

