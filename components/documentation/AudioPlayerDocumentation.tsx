import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const AudioPlayerDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Audio Player (Read Aloud)"
      category="Media"
      description="Audio playback component with comprehensive controls for playing, pausing, and managing audio content. Designed specifically for read-aloud functionality, providing users with intuitive controls to listen to text content being read aloud with support for playback speed, volume control, and progress tracking."
      whenToUse={[
        'Providing read-aloud functionality for text content to improve accessibility',
        'Allowing users to listen to AI-generated or user-written content',
        'Enabling audio playback of transcribed content or voice recordings',
        'Supporting users who prefer auditory learning or consumption',
        'Providing accessibility features for users with visual impairments',
        'Offering an alternative way to review and consume long-form content',
        'Enabling playback of system-generated audio responses or notifications',
        'Supporting multi-language content with text-to-speech functionality'
      ]}
      whenNotToUse={[
        'For background music or ambient audio (use dedicated media player instead)',
        'When audio content is not the primary focus of the interface',
        'For very short audio clips (less than 2 seconds) that don\'t need controls',
        'As a replacement for visual content when audio is not necessary',
        'For live streaming audio (use streaming-specific components instead)',
        'When audio playback would interfere with other critical audio in the application',
        'For decorative or non-functional audio elements'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Play/Pause Button',
          description: 'Primary control button to start or pause audio playback. Shows play icon when paused and pause icon when playing. Provides immediate visual feedback about playback state.'
        },
        {
          number: 2,
          name: 'Progress Bar',
          description: 'Visual indicator showing current playback position and total duration. Allows users to scrub through the audio by clicking or dragging on the progress bar. Displays time elapsed and remaining.'
        },
        {
          number: 3,
          name: 'Time Display',
          description: 'Text display showing current playback time and total duration (e.g., "1:23 / 3:45"). Provides precise timing information for users to track progress.'
        },
        {
          number: 4,
          name: 'Volume Control',
          description: 'Control for adjusting audio volume. May include a slider or button to mute/unmute. Provides visual feedback about current volume level.'
        },
        {
          number: 5,
          name: 'Playback Speed Control',
          description: 'Control for adjusting playback speed (e.g., 0.5x, 1x, 1.5x, 2x). Allows users to speed up or slow down audio playback for their preference or comprehension needs.'
        },
        {
          number: 6,
          name: 'Skip Controls (Optional)',
          description: 'Optional buttons to skip forward or backward by a set duration (e.g., 10 seconds). Useful for quickly navigating through audio content.'
        }
      ]}
      variants={[
        {
          name: 'Compact',
          description: 'Minimal audio player with essential controls (play/pause, progress bar, time display). Ideal for inline use within content areas or when space is limited.'
        },
        {
          name: 'Standard',
          description: 'Full-featured audio player with all controls including volume, playback speed, and skip buttons. Provides comprehensive control over audio playback experience.'
        },
        {
          name: 'Minimal',
          description: 'Ultra-compact variant with only play/pause button and progress indicator. Used when maximum space efficiency is required while maintaining basic functionality.'
        },
        {
          name: 'With Waveform',
          description: 'Audio player with visual waveform display showing audio amplitude over time. Provides visual representation of audio content and enhances user engagement.'
        },
        {
          name: 'Inline',
          description: 'Audio player designed to be embedded inline within text content or alongside related content. Optimized for read-aloud functionality within text areas or content blocks.'
        }
      ]}
      states={[
        {
          name: 'Idle',
          description: 'Initial state when audio is loaded but not playing. Shows play button and displays total duration. Progress bar is at the beginning.'
        },
        {
          name: 'Playing',
          description: 'Active playback state. Shows pause button, animated progress bar, and updates time display in real-time. Visual indicators show active playback.'
        },
        {
          name: 'Paused',
          description: 'Playback paused at current position. Shows play button and maintains current progress position. Time display shows paused position.'
        },
        {
          name: 'Loading',
          description: 'State while audio is being loaded or buffered. Shows loading indicator and may disable controls until audio is ready to play.'
        },
        {
          name: 'Error',
          description: 'State when audio fails to load or play. Shows error message and may provide retry option. Displays appropriate error feedback to user.'
        },
        {
          name: 'Completed',
          description: 'State when audio playback reaches the end. Shows play button (for replay) and may reset progress to beginning. Optionally auto-replays or stops.'
        }
      ]}
      props={[
        {
          name: 'src',
          type: 'string',
          description: 'URL or source of the audio file to play. Required for audio playback. Supports standard audio formats (MP3, WAV, OGG, etc.).'
        },
        {
          name: 'autoPlay',
          type: 'boolean',
          default: 'false',
          description: 'Whether audio should start playing automatically when loaded. Use sparingly and consider user preferences and accessibility guidelines.'
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description: 'Whether audio should loop continuously when it reaches the end. Useful for ambient audio or repeated content.'
        },
        {
          name: 'variant',
          type: '"compact" | "standard" | "minimal" | "with-waveform" | "inline"',
          default: '"standard"',
          description: 'Visual variant of the audio player. Compact shows minimal controls, standard shows all controls, minimal shows only essentials, with-waveform includes waveform visualization, inline is optimized for inline embedding.'
        },
        {
          name: 'showVolume',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display volume control. Can be hidden in compact variants or when volume control is not needed.'
        },
        {
          name: 'showSpeed',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display playback speed control. Essential for read-aloud functionality to allow users to adjust reading speed.'
        },
        {
          name: 'showSkip',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display skip forward/backward buttons. Useful for longer audio content where quick navigation is beneficial.'
        },
        {
          name: 'skipInterval',
          type: 'number',
          default: '10',
          description: 'Number of seconds to skip forward or backward when skip buttons are used. Measured in seconds.'
        },
        {
          name: 'defaultVolume',
          type: 'number',
          default: '1',
          description: 'Initial volume level (0-1). 0 is muted, 1 is maximum volume. User can adjust from this starting point.'
        },
        {
          name: 'defaultSpeed',
          type: 'number',
          default: '1',
          description: 'Initial playback speed multiplier. 1 is normal speed, 0.5 is half speed, 2 is double speed. Common values: 0.5, 0.75, 1, 1.25, 1.5, 2.'
        },
        {
          name: 'onPlay',
          type: '() => void',
          description: 'Callback function called when playback starts. Useful for tracking usage, analytics, or triggering related actions.'
        },
        {
          name: 'onPause',
          type: '() => void',
          description: 'Callback function called when playback is paused. Useful for tracking user interaction and playback behavior.'
        },
        {
          name: 'onEnded',
          type: '() => void',
          description: 'Callback function called when audio playback completes. Useful for cleanup, analytics, or triggering next actions.'
        },
        {
          name: 'onTimeUpdate',
          type: '(currentTime: number, duration: number) => void',
          description: 'Callback function called during playback with current time and total duration. Useful for syncing with other UI elements or tracking progress.'
        },
        {
          name: 'onError',
          type: '(error: Error) => void',
          description: 'Callback function called when an error occurs during audio loading or playback. Allows custom error handling and user feedback.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the audio player container. Allows layout and styling customization.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use for read-aloud functionality to improve accessibility and content consumption',
          'Provide clear visual feedback for all playback states (playing, paused, loading)',
          'Include playback speed control for read-aloud features to accommodate different reading speeds',
          'Show time display to help users track progress through audio content',
          'Make progress bar interactive to allow users to scrub through audio',
          'Provide keyboard shortcuts for common actions (space for play/pause, arrow keys for seeking)',
          'Ensure audio player is accessible with proper ARIA labels and keyboard navigation',
          'Use appropriate loading states while audio is buffering or loading',
          'Handle errors gracefully with clear error messages and retry options',
          'Consider auto-pause when user navigates away or switches to other audio',
          'Provide volume control with visual feedback about current volume level',
          'Use inline variant when embedding within text content or alongside related content',
          'Test audio playback across different browsers and devices for compatibility'
        ],
        dont: [
          'Don\'t use auto-play without user consent (accessibility and user experience best practice)',
          'Don\'t hide essential controls in compact variants (play/pause and progress should always be visible)',
          'Don\'t use for background music or ambient audio (use dedicated media player instead)',
          'Don\'t block UI interactions while audio is playing unless necessary',
          'Don\'t forget to handle audio loading errors with appropriate user feedback',
          'Don\'t use multiple audio players that play simultaneously without user control',
          'Don\'t make progress bar non-interactive (users expect to be able to scrub)',
          'Don\'t use very small sizes that make controls difficult to interact with',
          'Don\'t forget to clean up audio resources when component unmounts',
          'Don\'t use audio player for very short clips that don\'t need controls',
          'Don\'t override system volume controls or browser audio settings',
          'Don\'t use audio player as decorative element without functional purpose'
        ]
      }}
      aiConsiderations={{
        invocation: 'Audio player is typically invoked automatically when AI generates audio content (text-to-speech) or when user explicitly requests read-aloud functionality. Can be triggered by user action (clicking read-aloud button) or automatically after content generation.',
        latency: 'Audio generation (text-to-speech) may have latency. Show loading state while audio is being generated. Consider streaming audio playback if possible to reduce perceived latency. Provide progress feedback during audio generation.',
        uncertainty: 'If audio generation fails, show clear error message and provide retry option. Handle cases where audio format is unsupported or audio file is corrupted. Consider fallback to alternative audio sources or text display.',
        manualOverride: 'Users should always be able to pause, stop, or skip audio playback. Provide clear controls for manual control. Allow users to adjust playback speed and volume according to their preferences. Support keyboard shortcuts for power users.',
        context: 'Audio player should maintain context about what content is being read. Display title or description of content being read. Sync audio playback with text highlighting if applicable. Maintain playback position if user navigates away and returns.',
        safety: 'Ensure audio content complies with content policies. Validate audio sources to prevent malicious content. Consider rate limiting for audio generation to prevent abuse. Respect user privacy when processing audio content.',
        dataVisibility: 'Show clear indication when audio is being generated or processed. Display audio source or generation method if relevant. Provide transparency about audio processing and storage if applicable.'
      }}
      accessibility={{
        keyboard: [
          'Space bar toggles play/pause',
          'Left/Right arrow keys seek backward/forward by small increments (e.g., 5 seconds)',
          'Up/Down arrow keys adjust volume',
          'Home/End keys seek to beginning/end of audio',
          'Tab navigates through all controls in logical order',
          'Enter activates focused control (play/pause, speed, volume)',
          'Escape closes audio player if it\'s in a modal or overlay'
        ],
        screenReader: [
          'Audio player is announced with role="application" or role="region"',
          'Play/pause button announces current state ("Play" or "Pause")',
          'Progress bar announces current position and duration using aria-valuenow, aria-valuemin, aria-valuemax',
          'Time display is announced as "X minutes Y seconds of Z minutes W seconds"',
          'Volume control announces current volume level when adjusted',
          'Playback speed control announces current speed when changed',
          'Loading state is announced as "Loading audio"',
          'Error state is announced with error message',
          'Completed state is announced when playback finishes'
        ],
        ariaHints: [
          'role="application" or role="region" on audio player container',
          'aria-label on play/pause button describing action and current state',
          'aria-label on progress bar describing it as "Audio progress"',
          'aria-valuenow, aria-valuemin, aria-valuemax on progress bar',
          'aria-label on volume control describing current volume',
          'aria-label on speed control describing current playback speed',
          'aria-live="polite" region for announcing playback state changes',
          'aria-busy="true" during loading state',
          'aria-describedby linking controls to time display or status messages'
        ]
      }}
      relatedComponents={[
        'Text Area',
        'Voice Input',
        'Progress Indicator',
        'Button'
      ]}
      figmaDocumentation={{
        title: 'Audio Player Design Documentation',
        description: 'Complete design specifications and guidelines for the Audio Player component, including all variants, states, and interaction patterns.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5587-53597',
        figmaNodeId: '5587-53597'
      }}
      examples={[
        {
          title: 'Playing (Read Aloud in Action)',
          description: 'Read-aloud audio player during playback. Shows play/pause, progress, and time so users can listen to content being read. Designed for accessibility and alternative consumption of text content.',
          media: {
            type: 'image',
            url: '/examples/read aloud/Playing (Read aloud in action).png',
            alt: 'Read aloud audio player playing',
          },
          tags: ['playing', 'read-aloud', 'playback'],
        },
        {
          title: 'Read Aloud Option in Feedback',
          description: 'Read-aloud control presented as an option in a feedback or content context. Users can trigger audio playback from this entry point to hear the associated content.',
          media: {
            type: 'image',
            url: '/examples/read aloud/Read Aloud Option in Feedback.png',
            alt: 'Read aloud option in feedback',
          },
          tags: ['read-aloud', 'feedback', 'option'],
        },
      ]}
    />
  );
};
