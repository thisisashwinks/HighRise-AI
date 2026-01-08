import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';
import { TextArea } from '../TextArea';
import { ExampleSection } from '../ExampleSection';

export const TextAreaDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Text Area"
      category="Form"
      description="A multi-line text input component for longer text entries, messages, and prompts. Supports multiple sizes, variants, auto-resize functionality, and comprehensive validation states."
      whenToUse={[
        'Collecting multi-line text input from users (comments, descriptions, messages)',
        'Forms requiring longer text entries (bio, notes, feedback)',
        'Prompt inputs for AI interactions and command interfaces',
        'Text areas that need character count or length validation',
        'Inputs requiring auto-resize based on content length',
        'Multi-line text with specific formatting requirements (code, markdown)',
        'User-generated content fields (reviews, descriptions, instructions)'
      ]}
      whenNotToUse={[
        'For single-line text input (use Input component instead)',
        'For selecting from predefined options (use Select or Dropdown instead)',
        'For rich text editing with formatting (use a rich text editor component)',
        'For very short text entries that fit on one line',
        'When input needs to be hidden or masked (use PasswordInput component)',
        'For structured data entry (use Input with appropriate validation)'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Label',
          description: 'Optional text label displayed above the textarea field. Can include an info tooltip icon for additional context.'
        },
        {
          number: 2,
          name: 'Textarea Field',
          description: 'The main multi-line text input area where users type. Supports placeholder text, value binding, and auto-resize functionality.'
        },
        {
          number: 3,
          name: 'Border & Focus Ring',
          description: 'Visual indicator showing the textarea state. Changes color for focus, error, and disabled states.'
        },
        {
          number: 4,
          name: 'Resize Handle',
          description: 'Visual handle in the bottom-right corner allowing users to manually resize the textarea vertically.'
        },
        {
          number: 5,
          name: 'Helper Text / Error Message',
          description: 'Text displayed below the textarea providing guidance or error feedback. Positioned consistently across all sizes.'
        },
        {
          number: 6,
          name: 'Character Count (Optional)',
          description: 'When enabled, displays current character count and maximum length limit in the bottom-right corner.'
        }
      ]}
      variants={[
        {
          name: 'Default',
          description: 'Standard multi-line textarea with optional label and helper text. Most common variant for general text entry.'
        },
        {
          name: 'Prompt Input',
          description: 'Specialized textarea variant with monospace font styling. Optimized for code, prompts, commands, and technical input.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state with neutral border color. Placeholder text is visible when empty.'
        },
        {
          name: 'Placeholder',
          description: 'Empty textarea showing placeholder text in a lighter color. Provides guidance on expected input format.'
        },
        {
          name: 'Filled',
          description: 'Textarea containing user-entered value. Border remains neutral unless in error state.'
        },
        {
          name: 'Hover',
          description: 'User hovers over the textarea. Border color may darken slightly to indicate interactivity.'
        },
        {
          name: 'Focused',
          description: 'Textarea has keyboard focus. Shows primary color border and focus ring. Cursor is visible for text entry.'
        },
        {
          name: 'Error',
          description: 'Textarea contains invalid data or validation failed. Red border and error message displayed below.'
        },
        {
          name: 'Disabled',
          description: 'Textarea is not interactive. Grayed out appearance with reduced opacity. Cannot receive focus or input.'
        }
      ]}
      props={[
        {
          name: 'size',
          type: '"xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting padding, font size, and minimum height. XS (80px) to LG (140px) minimum height.'
        },
        {
          name: 'variant',
          type: '"default" | "prompt-input"',
          default: '"default"',
          description: 'Visual variant of the textarea component. Prompt input uses monospace font for code/prompts.'
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text displayed above the textarea field.'
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown when textarea is empty. Should provide format guidance.'
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled textarea value. Use with onChange for controlled components.'
        },
        {
          name: 'onChange',
          type: '(e: ChangeEvent<HTMLTextAreaElement>) => void',
          description: 'Callback function invoked when textarea value changes.'
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Whether the textarea is in an error state. Shows red border and error styling.'
        },
        {
          name: 'errorMessage',
          type: 'string',
          description: 'Error message displayed below the textarea when error is true.'
        },
        {
          name: 'helperText',
          type: 'string',
          description: 'Helper text displayed below the textarea. Shown when not in error state.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disables the textarea, preventing user interaction.'
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: 'Whether the textarea should take full width of its container.'
        },
        {
          name: 'showCharacterCount',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display character count when maxLength is set.'
        },
        {
          name: 'maxLength',
          type: 'number',
          description: 'Maximum number of characters allowed in the textarea.'
        },
        {
          name: 'minRows',
          type: 'number',
          default: '3',
          description: 'Minimum number of visible rows. Used for initial height and auto-resize calculations.'
        },
        {
          name: 'maxRows',
          type: 'number',
          description: 'Maximum number of visible rows when autoResize is enabled. Textarea will scroll if content exceeds this.'
        },
        {
          name: 'autoResize',
          type: 'boolean',
          default: 'false',
          description: 'Whether the textarea should automatically resize vertically based on content length.'
        },
        {
          name: 'infoTooltip',
          type: 'string',
          description: 'Tooltip text shown when hovering over the info icon next to the label.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use appropriate size variants based on form density and expected content length (MD for most cases)',
          'Provide clear, helpful placeholder text that shows expected format',
          'Use labels for all textareas to improve accessibility',
          'Show error messages immediately after validation fails',
          'Use prompt-input variant for code, commands, or technical input',
          'Enable character count when there are strict length requirements',
          'Use autoResize for dynamic content that varies significantly in length',
          'Set minRows and maxRows appropriately based on expected content',
          'Provide helper text for complex inputs or format requirements',
          'Use fullWidth for textareas that should span their container'
        ],
        dont: [
          'Don\'t use placeholder text as the only label (always include a visible label)',
          'Don\'t use error states for validation that hasn\'t occurred yet',
          'Don\'t set maxRows too low if users need to see all content at once',
          'Don\'t use prompt-input variant for regular text content',
          'Don\'t enable autoResize without setting appropriate maxRows to prevent excessive height',
          'Don\'t use textarea for single-line inputs (use Input component instead)',
          'Don\'t disable textareas without clear indication of why',
          'Don\'t truncate error messages (allow them to wrap or expand)',
          'Don\'t use placeholder text that disappears when user starts typing for critical format information',
          'Don\'t set minRows too high for short content requirements'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to the textarea field',
          'Enter key creates a new line within the textarea',
          'Shift+Enter can be used for line breaks in some contexts',
          'Arrow keys navigate within the text content',
          'Home/End keys move to start/end of current line',
          'Ctrl/Cmd+A selects all text in the textarea',
          'Ctrl/Cmd+C copies selected text',
          'Ctrl/Cmd+V pastes text at cursor position'
        ],
        screenReader: [
          'Label is announced when textarea receives focus',
          'Placeholder text is announced as a hint',
          'Error state and error message are announced when present',
          'Helper text is announced when textarea receives focus',
          'Disabled state is announced as "disabled" or "unavailable"',
          'Required state is announced if textarea is marked as required',
          'Character count is announced when showCharacterCount is enabled',
          'Max length is announced when maxLength is set'
        ],
        ariaHints: [
          'aria-label or aria-labelledby for textareas without visible labels',
          'aria-describedby linking to helper text or error message',
          'aria-invalid="true" when textarea is in error state',
          'aria-disabled="true" when textarea is disabled',
          'aria-required="true" for required textareas',
          'aria-multiline="true" to indicate multi-line input capability'
        ]
      }}
      relatedComponents={[
        'Input',
        'Select',
        'Dropdown',
        'Form',
        'Label',
        'Button'
      ]}
      figmaDocumentation={{
        title: 'Text Area Component Documentation',
        description: 'Complete visual reference showing all textarea sizes, variants, states, and configurations from the design system. Includes examples of regular textarea and prompt input variants.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=139-143195&t=pnqHuzaT3CjJvkVo-11',
        figmaNodeId: '139-143195',
      }}
      examples={[
        {
          title: 'Filled State',
          description: 'A textarea in its filled state showing user-entered content. The textarea displays the entered text clearly with proper spacing and maintains focus indicators for continued editing.',
          media: {
            type: 'image',
            url: '/examples/textarea/Filled.png',
            alt: 'Textarea in filled state with user content',
          },
          tags: ['filled', 'content', 'state'],
          critique: 'The filled state clearly displays user content with good readability. The border and focus indicators help users understand the active input area. The spacing and typography ensure content is easy to read and edit.',
        },
        {
          title: 'Auto-Fill Functionality',
          description: 'Textarea with auto-fill capability that suggests and completes text based on context or previous entries. This feature enhances productivity by reducing manual typing and ensuring consistency.',
          media: {
            type: 'image',
            url: '/examples/textarea/Auto-Fill.png',
            alt: 'Textarea with auto-fill suggestions',
          },
          tags: ['auto-fill', 'suggestions', 'productivity'],
          critique: 'Auto-fill functionality significantly improves user experience by reducing typing effort. The suggestions appear contextually and can be easily accepted or dismissed. This feature is particularly useful for repetitive content entry.',
        },
        {
          title: 'Error State',
          description: 'Textarea displaying an error state with clear visual indicators and error messaging. The red border and error message help users quickly identify and understand validation issues.',
          media: {
            type: 'image',
            url: '/examples/textarea/Error.png',
            alt: 'Textarea in error state with validation feedback',
          },
          tags: ['error', 'validation', 'feedback'],
          critique: 'The error state provides clear visual feedback with the red border and error message. Users can immediately see what went wrong and how to fix it. The error message is descriptive and actionable.',
        },
        {
          title: 'Character Limit Reached',
          description: 'Textarea showing when the maximum character limit has been reached. The interface clearly indicates the limit and prevents further input, helping users stay within constraints.',
          media: {
            type: 'image',
            url: '/examples/textarea/Limit Reached.png',
            alt: 'Textarea with character limit reached indicator',
          },
          tags: ['limit', 'validation', 'character-count'],
          critique: 'The character limit indicator is clear and prevents users from exceeding the maximum length. The visual feedback helps users understand when they\'ve reached the limit. Consider showing remaining characters before reaching the limit for better UX.',
        },
        {
          title: 'Inline Content Menu',
          description: 'Textarea with an inline content menu that provides quick access to formatting options, actions, and content insertion tools. The menu appears contextually within the textarea interface.',
          media: {
            type: 'image',
            url: '/examples/textarea/Inline Content Menu.png',
            alt: 'Textarea with inline content menu',
          },
          tags: ['menu', 'formatting', 'actions'],
          critique: 'The inline content menu provides convenient access to formatting and content options without leaving the textarea. The menu placement is intuitive and doesn\'t obstruct the editing area. The options are well-organized and discoverable.',
        },
        {
          title: 'Context Dropdown',
          description: 'Textarea featuring a context dropdown menu that offers additional options and actions related to the content. The dropdown provides extended functionality without cluttering the main interface.',
          media: {
            type: 'image',
            url: '/examples/textarea/Context Dropdown.png',
            alt: 'Textarea with context dropdown menu',
          },
          tags: ['dropdown', 'context-menu', 'options'],
          critique: 'The context dropdown provides additional functionality while keeping the interface clean. The dropdown placement is logical and the options are relevant to the textarea context. Users can access advanced features without overwhelming the main interface.',
        },
        {
          title: 'Upload Files Dropdown',
          description: 'Textarea with an integrated file upload dropdown that allows users to attach files directly within the text input area. This feature streamlines content creation by combining text and file inputs.',
          media: {
            type: 'image',
            url: '/examples/textarea/Upload Files Dropdown.png',
            alt: 'Textarea with file upload dropdown',
          },
          tags: ['file-upload', 'attachments', 'integration'],
          critique: 'The file upload integration is seamless and intuitive. Users can attach files without leaving the textarea, which improves workflow efficiency. The dropdown clearly indicates supported file types and upload options.',
        },
        {
          title: 'Read Aloud with Audio Player',
          description: 'Textarea featuring a read aloud functionality with integrated audio player controls. Users can listen to the text content being read, which is particularly useful for accessibility and content review.',
          media: {
            type: 'image',
            url: '/examples/textarea/Read Aloud (Audio Player).png',
            alt: 'Textarea with read aloud audio player',
          },
          tags: ['accessibility', 'audio', 'read-aloud'],
          critique: 'The read aloud feature enhances accessibility and provides an alternative way to consume content. The audio player controls are intuitive and allow users to control playback. This feature is especially valuable for users with visual impairments or those who prefer auditory learning.',
        },
        {
          title: 'Restored State',
          description: 'Textarea showing a restored state, likely after recovering unsaved content or restoring a previous version. This feature helps prevent data loss and improves user confidence.',
          media: {
            type: 'image',
            url: '/examples/textarea/Restored.png',
            alt: 'Textarea with restored content state',
          },
          tags: ['restore', 'recovery', 'data-preservation'],
          critique: 'The restore functionality provides peace of mind by recovering unsaved content. The visual indicator clearly shows that content has been restored. This feature significantly improves user experience by preventing data loss.',
        },
        {
          title: 'In Progress with To-dos',
          description: 'Textarea displaying an in-progress state with integrated to-do list functionality. Users can manage tasks and notes within the same input area, combining content creation with task management.',
          media: {
            type: 'image',
            url: '/examples/textarea/In Progress (To-dos).png',
            alt: 'Textarea with in-progress to-do list',
          },
          tags: ['to-dos', 'tasks', 'progress'],
          critique: 'The integration of to-do functionality within the textarea is innovative and useful. Users can manage tasks alongside their content, which streamlines workflow. The progress indicators help users track completion status.',
        },
      ]}
    />
  );
};
