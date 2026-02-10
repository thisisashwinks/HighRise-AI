import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const VoiceInputDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="Voice Input (Dictation)"
      category="Form"
      description="Voice input component for capturing audio input and converting speech to text with recording controls and transcription support. Enables users to input text through voice dictation, providing an accessible and efficient alternative to typing, especially useful for longer content, mobile devices, and accessibility needs."
      whenToUse={[
        'Enabling voice-to-text input for users who prefer speaking over typing',
        'Providing accessibility features for users with mobility or dexterity limitations',
        'Supporting mobile users who can speak faster than they can type',
        'Capturing longer form content where voice input is more efficient',
        'Enabling hands-free input in scenarios where typing is impractical',
        'Supporting multi-language voice input with automatic transcription',
        'Providing voice input as an alternative input method in forms and text areas',
        'Enabling voice commands or voice-based interactions in AI interfaces'
      ]}
      whenNotToUse={[
        'In quiet environments where voice input would be disruptive or inappropriate',
        'For sensitive information where voice recording may raise privacy concerns',
        'When microphone access is not available or not permitted',
        'For very short inputs where typing is faster than speaking',
        'In environments with high background noise that would affect accuracy',
        'When real-time transcription accuracy requirements are extremely high without editing capability',
        'As the only input method without providing typing alternatives',
        'For structured data input that requires precise formatting or validation'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Microphone Button',
          description: 'Primary control button to start and stop voice recording. Shows microphone icon when idle, animated recording indicator when active, and may show different states for listening, processing, or error.'
        },
        {
          number: 2,
          name: 'Recording Indicator',
          description: 'Visual feedback showing that recording is active. May include animated pulse, waveform visualization, or timer display. Provides clear indication that audio is being captured.'
        },
        {
          number: 3,
          name: 'Transcription Display',
          description: 'Real-time or post-recording display of transcribed text. Shows the converted speech-to-text output, allowing users to review and edit before submitting. May show partial transcription during recording.'
        },
        {
          number: 4,
          name: 'Timer/Duration',
          description: 'Display showing recording duration or elapsed time. Helps users track how long they\'ve been speaking and provides context for the recording session.'
        },
        {
          number: 5,
          name: 'Control Actions',
          description: 'Action buttons for managing recording (stop, cancel, retry, submit). Allows users to control the recording process, discard recordings, or submit transcribed text.'
        },
        {
          number: 6,
          name: 'Status/Feedback',
          description: 'Status messages indicating recording state, processing status, or error conditions. Provides feedback about microphone access, transcription progress, or any issues encountered.'
        }
      ]}
      variants={[
        {
          name: 'Button',
          description: 'Standalone microphone button that opens a recording interface or modal. Compact variant suitable for embedding in forms or input fields. Clicking activates voice input mode.'
        },
        {
          name: 'Inline',
          description: 'Voice input integrated directly within an input field or textarea. Shows microphone icon as trailing action, allowing seamless switching between typing and voice input without leaving the input context.'
        },
        {
          name: 'Full Screen',
          description: 'Full-screen or modal interface for voice input with comprehensive controls, waveform visualization, and transcription display. Ideal for longer recordings or when detailed feedback is needed.'
        },
        {
          name: 'Floating',
          description: 'Floating microphone button that can be positioned anywhere on screen. Useful for always-available voice input access or mobile interfaces where voice input is a primary interaction method.'
        },
        {
          name: 'With Preview',
          description: 'Voice input component with real-time transcription preview. Shows transcribed text as user speaks, allowing immediate review and editing before final submission.'
        }
      ]}
      states={[
        {
          name: 'Idle',
          description: 'Initial state when voice input is available but not active. Shows microphone icon and ready-to-record state. User can click to start recording.'
        },
        {
          name: 'Listening',
          description: 'Active recording state when microphone is capturing audio. Shows animated recording indicator, timer, and may display partial transcription. User is speaking and audio is being captured.'
        },
        {
          name: 'Processing',
          description: 'State while speech is being transcribed to text. Shows loading indicator and processing message. Audio recording has stopped and transcription is in progress.'
        },
        {
          name: 'Transcribed',
          description: 'State when transcription is complete and text is displayed. Shows transcribed text with options to edit, submit, or re-record. User can review and modify the transcription.'
        },
        {
          name: 'Error',
          description: 'State when an error occurs (microphone access denied, transcription failed, network error). Shows error message and retry option. Provides clear feedback about what went wrong.'
        },
        {
          name: 'Paused',
          description: 'State when recording is temporarily paused. Maintains current recording position and allows resuming. Useful for longer recording sessions.'
        }
      ]}
      props={[
        {
          name: 'onTranscription',
          type: '(text: string) => void',
          description: 'Callback function called when transcription is complete with the transcribed text. Required for handling the transcribed output. Receives the final transcribed text string.'
        },
        {
          name: 'onRecordingStart',
          type: '() => void',
          description: 'Callback function called when recording begins. Useful for analytics, UI updates, or triggering related actions when user starts speaking.'
        },
        {
          name: 'onRecordingStop',
          type: '() => void',
          description: 'Callback function called when recording stops. Useful for cleanup, analytics, or triggering transcription processing.'
        },
        {
          name: 'onError',
          type: '(error: Error) => void',
          description: 'Callback function called when an error occurs during recording or transcription. Allows custom error handling and user feedback. Receives error object with details.'
        },
        {
          name: 'variant',
          type: '"button" | "inline" | "fullscreen" | "floating" | "with-preview"',
          default: '"button"',
          description: 'Visual variant of the voice input component. Button shows standalone button, inline integrates with input field, fullscreen shows modal interface, floating shows positioned button, with-preview shows real-time transcription.'
        },
        {
          name: 'autoTranscribe',
          type: 'boolean',
          default: 'true',
          description: 'Whether to automatically transcribe audio when recording stops. When false, requires explicit user action to transcribe. Useful for allowing users to review audio before transcription.'
        },
        {
          name: 'showWaveform',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display waveform visualization during recording. Provides visual feedback about audio levels and recording activity. Enhances user experience during recording.'
        },
        {
          name: 'showTimer',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display recording duration timer. Shows elapsed time during recording. Helps users track recording length.'
        },
        {
          name: 'maxDuration',
          type: 'number',
          description: 'Maximum recording duration in seconds. Automatically stops recording when limit is reached. Prevents excessively long recordings and manages resource usage.'
        },
        {
          name: 'language',
          type: 'string',
          default: '"en-US"',
          description: 'Language code for speech recognition (e.g., "en-US", "es-ES", "fr-FR"). Determines which language model is used for transcription. Improves accuracy for specific languages.'
        },
        {
          name: 'continuous',
          type: 'boolean',
          default: 'false',
          description: 'Whether to continue listening after a pause or stop. When true, keeps microphone active for multiple utterances. Useful for continuous dictation without restarting.'
        },
        {
          name: 'interimResults',
          type: 'boolean',
          default: 'true',
          description: 'Whether to show interim transcription results during recording. Displays partial transcription as user speaks. Provides real-time feedback and allows early error detection.'
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text shown in transcription display area before recording starts. Provides guidance about what to say or how to use the component.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the voice input is disabled. Prevents recording when true. Useful for form validation states or when prerequisites are not met.'
        },
        {
          name: 'size',
          type: '"xs" | "sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting button and control dimensions. XS (compact) to LG (prominent). Affects button size, icon size, and overall component scale.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the voice input container. Allows layout and styling customization.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Request microphone permission clearly and explain why it\'s needed',
          'Provide visual feedback during recording (animated indicator, waveform, timer)',
          'Show transcription results immediately after recording stops',
          'Allow users to edit transcribed text before submitting',
          'Handle errors gracefully with clear messages and retry options',
          'Provide keyboard shortcuts for starting/stopping recording when possible',
          'Support multiple languages and allow language selection',
          'Show recording duration to help users manage their input length',
          'Provide clear instructions on how to use voice input',
          'Allow users to cancel or discard recordings easily',
          'Test microphone access and handle permission denial appropriately',
          'Provide fallback to typing if voice input is unavailable or fails',
          'Use appropriate visual indicators for different recording states',
          'Consider privacy implications and inform users about audio processing'
        ],
        dont: [
          'Don\'t start recording automatically without user consent',
          'Don\'t hide recording controls or make them difficult to access',
          'Don\'t require perfect transcription accuracy without editing capability',
          'Don\'t use voice input as the only input method without alternatives',
          'Don\'t record audio without clear indication that recording is active',
          'Don\'t forget to handle microphone permission denial gracefully',
          'Don\'t process or store audio longer than necessary',
          'Don\'t use voice input in quiet environments without user awareness',
          'Don\'t make transcription errors difficult to correct',
          'Don\'t require users to speak in unnatural ways for better accuracy',
          'Don\'t ignore accessibility requirements for voice input controls',
          'Don\'t forget to provide visual feedback for all recording states',
          'Don\'t use voice input for sensitive information without clear consent'
        ]
      }}
      aiConsiderations={{
        invocation: 'Voice input can be invoked by user clicking microphone button or using keyboard shortcut. AI may suggest using voice input for longer content or when typing is detected as slow. Can be automatically activated in mobile contexts or accessibility modes.',
        latency: 'Speech-to-text transcription may have latency, especially for longer recordings. Show processing state while transcription is in progress. Consider streaming transcription for real-time feedback. Handle network latency for cloud-based transcription services.',
        uncertainty: 'Transcription accuracy may vary based on audio quality, accent, background noise, or language. Always allow users to edit transcribed text. Show confidence indicators if available. Provide retry option for poor transcriptions. Handle cases where transcription fails completely.',
        manualOverride: 'Users should always be able to edit transcribed text before submitting. Provide clear editing interface. Allow users to manually type corrections. Support hybrid input (voice + typing). Allow users to cancel or re-record if transcription is inaccurate.',
        context: 'Voice input should maintain context about what field or area it\'s populating. Show which input will receive the transcribed text. Maintain focus and cursor position appropriately. Consider context when suggesting voice input (e.g., suggest for longer text areas).',
        safety: 'Handle audio data securely and respect privacy. Inform users about audio processing and storage. Don\'t store audio longer than necessary. Consider local vs. cloud transcription based on privacy requirements. Validate transcribed content for security concerns if applicable.',
        dataVisibility: 'Show clear indication when audio is being recorded or processed. Display transcription progress if available. Inform users about where audio is processed (local vs. cloud). Provide transparency about data usage and storage.'
      }}
      accessibility={{
        keyboard: [
          'Space bar or Enter activates voice input when microphone button is focused',
          'Escape stops recording or closes voice input interface',
          'Tab navigates through all controls (record, stop, cancel, submit)',
          'Arrow keys may navigate transcription text for editing',
          'Enter submits transcribed text when in transcription review mode',
          'Keyboard shortcuts should be clearly documented and discoverable'
        ],
        screenReader: [
          'Microphone button announces current state ("Start recording" or "Stop recording")',
          'Recording state is announced when recording starts ("Recording started")',
          'Recording duration is announced periodically during recording',
          'Transcription results are announced when available ("Transcription complete")',
          'Error states are announced with error message',
          'Processing state is announced ("Processing audio" or "Transcribing")',
          'Microphone permission status is announced if access is denied',
          'Transcribed text is readable and can be navigated with screen reader'
        ],
        ariaHints: [
          'role="button" on microphone control',
          'aria-label describing microphone button action and current state',
          'aria-pressed="true" when recording is active',
          'aria-live="polite" region for transcription updates',
          'aria-busy="true" during processing state',
          'aria-describedby linking controls to status messages',
          'aria-label on transcription textarea describing it as transcribed text',
          'role="status" or role="alert" for error messages',
          'aria-label on action buttons (stop, cancel, submit, retry)'
        ]
      }}
      relatedComponents={[
        'Input',
        'Text Area',
        'Audio Player',
        'Button'
      ]}
      figmaDocumentation={{
        title: 'Voice Input Design Documentation',
        description: 'Complete design specifications and guidelines for the Voice Input (Dictation) component, including all variants, states, and interaction patterns.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5596-44943',
        figmaNodeId: '5596-44943'
      }}
      examples={[
        {
          title: 'Dictation Voice Input',
          description: 'Voice input (dictation) control showing the microphone trigger. Users click to start speaking; the component captures audio and converts speech to text. Ideal for forms and text areas as an alternative to typing.',
          media: {
            type: 'image',
            url: '/examples/dictation/Dictation/Voice Input.png',
            alt: 'Dictation voice input control',
          },
          tags: ['dictation', 'voice-input', 'microphone'],
        },
        {
          title: 'Listening State',
          description: 'Dictation in the listening state: the microphone is active and capturing speech. Visual feedback (e.g., pulse or indicator) shows that recording is in progress. Users can speak naturally while the system captures audio.',
          media: {
            type: 'image',
            url: '/examples/dictation/Listening.png',
            alt: 'Dictation listening state',
          },
          tags: ['listening', 'recording', 'active'],
        },
        {
          title: 'Transcribing',
          description: 'After the user stops speaking, the component shows a transcribing state while speech is converted to text. This feedback sets the expectation that the transcribed result will appear shortly.',
          media: {
            type: 'image',
            url: '/examples/dictation/Transcribing.png',
            alt: 'Dictation transcribing state',
          },
          tags: ['transcribing', 'processing', 'feedback'],
        },
        {
          title: 'Completed Dictation',
          description: 'Dictation completed with the final transcribed text displayed. Users can review, edit, or submit the text. Clear completion state helps users confirm the result before using it.',
          media: {
            type: 'image',
            url: '/examples/dictation/Completed.png',
            alt: 'Dictation completed with transcribed text',
          },
          tags: ['completed', 'transcription', 'review'],
        },
        {
          title: 'Dictation Errors',
          description: 'Error state when dictation or transcription fails (e.g., no speech detected, recognition error). The UI shows an error message so users know what went wrong and can retry or switch to typing.',
          media: {
            type: 'image',
            url: '/examples/dictation/Dictation Errors.png',
            alt: 'Dictation error state',
          },
          tags: ['error', 'feedback', 'retry'],
        },
        {
          title: 'Dictation Errors (Alternate)',
          description: 'Alternate error handling for dictation, such as network or permission issues. Reinforces that errors are communicated clearly and that users have a path to retry or recover.',
          media: {
            type: 'image',
            url: '/examples/dictation/Dictation Errors 2.png',
            alt: 'Dictation error state alternate',
          },
          tags: ['error', 'permissions', 'recovery'],
        },
      ]}
    />
  );
};
