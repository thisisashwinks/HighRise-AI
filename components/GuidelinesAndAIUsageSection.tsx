'use client';

import React from 'react';
import Image from 'next/image';

export type OnImageClick = (src: string, alt: string, title: string, description: string) => void;

interface GuidelinesAndAIUsageSectionProps {
  onImageClick?: OnImageClick;
}

export function GuidelinesAndAIUsageSection({ onImageClick }: GuidelinesAndAIUsageSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>General Guidelines & Principles</h2>
      <p className="text-lg mb-8 max-w-3xl" style={{ color: 'var(--color-text-muted)' }}>
        These foundational principles guide the design and implementation of AI-powered components
        in HighRise AI. They ensure consistent, ethical, and user-centric AI interactions.
      </p>

      {/* Core Principles */}
      <div className="space-y-8 mb-12">
        {[
          { n: 1, title: 'Transparency and Disclosure', body: "AI agents must always disclose their identity to ensure users are aware they're interacting with an AI system. This prevents confusion and builds trust through clear communication.", items: ['Clearly indicate when users are interacting with an AI agent', 'Use consistent visual indicators and labels', "Provide context about the AI's capabilities and limitations"] },
          { n: 2, title: 'Native Integration', body: 'AI functionalities should feel like a natural extension of the platform, using familiar patterns and standard actions that users already understand.', items: ['Operate seamlessly within existing user interfaces', 'Utilize standard actions and patterns familiar to users', 'Maintain consistency with platform design language'] },
          { n: 3, title: 'Immediate Feedback', body: 'Provide prompt and unobtrusive feedback when an AI agent is processing a request. Users should always know the system is working on their behalf.', items: ['Show "Thinking" or processing indicators', 'Provide status updates during long operations', 'Use subtle animations to indicate activity'] },
          { n: 4, title: 'Transparency of Internal Processes', body: "Clearly convey the AI agent's current state and allow users to inspect reasoning, tool usage, and decision logic to build trust and understanding.", items: ['Show current state (processing, waiting, completed)', 'Allow inspection of agent reasoning when appropriate', 'Display tool usage and decision logic transparently'] },
          { n: 5, title: 'User Control and Disengagement', body: 'Ensure AI agents can be easily disengaged upon user request and only re-engage when explicitly instructed, upholding user autonomy.', items: ['Provide clear disengage controls', 'Respect user preferences for AI interaction', 'Only re-engage when explicitly requested'] },
          { n: 6, title: 'Human Accountability', body: 'While AI agents can perform tasks, ultimate responsibility should rest with human users. Establish clear delegation models to ensure accountability.', items: ['Maintain human oversight for critical tasks', 'Establish clear delegation models', 'Ensure users can review and approve AI actions'] },
          { n: 7, title: 'Responsible AI Design', body: 'Prioritize fairness, transparency, and accountability throughout the AI lifecycle. Implement ethical practices from design through deployment.', items: ['Conduct regular bias audits', 'Provide clear explanations for AI decisions', 'Ensure fairness and equity in AI outcomes'] },
          { n: 8, title: 'Consistency in Design', body: 'Maintain consistency in design elements such as colors, typefaces, and layouts to create a familiar and intuitive user experience.', items: ['Use consistent visual language across components', 'Follow established design patterns', 'Reduce cognitive load through familiarity'] },
          { n: 9, title: 'Simplicity and Clarity', body: 'Aim for simplicity in design to reduce user confusion and enhance the overall experience. Clear communication and straightforward interfaces help users navigate effectively.', items: ['Minimize unnecessary complexity', 'Use clear, concise language', 'Focus on essential functionalities'] },
        ].map(({ n, title, body, items }) => (
          <div key={n} className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
                <span className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{n}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{title}</h3>
                <p className="mb-3" style={{ color: 'var(--color-text-muted)' }}>{body}</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4" style={{ color: 'var(--color-text-muted)' }}>
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Usage Modes Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>AI Usage Modes</h3>
        <p className="text-lg mb-8 max-w-3xl" style={{ color: 'var(--color-text-muted)' }}>
          AI can be integrated into user experiences in different ways, each serving distinct purposes
          and user needs. Understanding these modes helps designers choose the right approach for their context.
        </p>

        {/* Focused Mode */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Focused</h4>
          </div>
          <p className="mb-4 max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
            AI is the main context, with a dedicated focus. Users interact primarily with the AI system
            to accomplish their goals.
          </p>
          <div className="grid md:grid-cols-1 gap-6">
            <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
              <div
                className={`relative w-full aspect-video ${onImageClick ? 'cursor-pointer' : ''}`}
                style={{ backgroundColor: 'var(--color-surface-muted)' }}
                onClick={() => onImageClick?.('/examples/ai-usage-modes/Focused 1.png', 'Focused Mode - AI as the main context', 'AI as Primary Interface', 'The AI system serves as the main interface where users interact directly with AI capabilities to accomplish their primary goals.')}
                onKeyDown={(e) => onImageClick && (e.key === 'Enter' || e.key === ' ') && (e.target as HTMLElement).click()}
                role={onImageClick ? 'button' : undefined}
                tabIndex={onImageClick ? 0 : undefined}
              >
                <Image
                  src="/examples/ai-usage-modes/Focused 1.png"
                  alt="Focused Mode - AI as the main context"
                  fill
                  style={{ objectFit: 'contain' }}
                  placeholder="empty"
                />
              </div>
              <div className="p-5">
                <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>AI as Primary Interface</h5>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>The AI system serves as the main interface where users interact directly with AI capabilities to accomplish their primary goals.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Supportive Mode */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Supportive</h4>
          </div>
          <p className="mb-4 max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
            AI complements the main context and accompanies users along their journey to help them
            achieve their goals. The AI assists without taking center stage.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: '/examples/ai-usage-modes/Supportive 1.png', alt: 'Supportive Mode - AI complements the main context', title: 'AI Companion Interface', desc: 'AI provides assistance alongside the main interface, offering helpful suggestions and support without disrupting the primary workflow.' },
              { src: '/examples/ai-usage-modes/Supportive 2.png', alt: 'Supportive Mode - AI assists without taking center stage', title: 'Contextual AI Assistance', desc: 'AI appears as a supportive element that enhances the user experience by providing contextual help and guidance when needed.' },
            ].map((card) => (
              <div key={card.src} className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
                <div
                  className={`relative w-full aspect-video ${onImageClick ? 'cursor-pointer' : ''}`}
                  style={{ backgroundColor: 'var(--color-surface-muted)' }}
                  onClick={() => onImageClick?.(card.src, card.alt, card.title, card.desc)}
                  onKeyDown={(e) => onImageClick && (e.key === 'Enter' || e.key === ' ') && (e.target as HTMLElement).click()}
                  role={onImageClick ? 'button' : undefined}
                  tabIndex={onImageClick ? 0 : undefined}
                >
                  <Image src={card.src} alt={card.alt} fill style={{ objectFit: 'contain' }} placeholder="empty" />
                </div>
                <div className="p-5">
                  <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{card.title}</h5>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Mode */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>Integrated</h4>
          </div>
          <p className="mb-4 max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
            AI is blended into specific moments of the user&apos;s flow to help them complete small,
            discrete tasks. The AI appears contextually when needed.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/examples/ai-usage-modes/Integrated 1.png', alt: 'Integrated Mode - AI appears contextually when needed', title: 'Contextual AI Suggestions', desc: "AI appears at the right moment to provide relevant suggestions and assistance within the user's workflow." },
              { src: '/examples/ai-usage-modes/Integrated 2.png', alt: 'Integrated Mode - AI blended into user flow', title: 'Seamless Workflow Integration', desc: 'AI capabilities are naturally woven into the user interface, enhancing tasks without disrupting the flow.' },
              { src: '/examples/ai-usage-modes/Integrated 3.png', alt: 'Integrated Mode - Contextual AI assistance', title: 'Smart Task Assistance', desc: 'AI provides intelligent assistance for specific tasks, appearing when users need help completing discrete actions.' },
              { src: '/examples/ai-usage-modes/Integrated 4.png', alt: 'Integrated Mode - Discrete task completion', title: 'Focused Task Completion', desc: 'AI helps users complete specific, well-defined tasks efficiently within their current context.' },
              { src: '/examples/ai-usage-modes/Integrated 5.png', alt: 'Integrated Mode - Seamless AI integration', title: 'Natural Interface Integration', desc: 'AI features are integrated so naturally that they feel like a native part of the interface experience.' },
              { src: '/examples/ai-usage-modes/Integrated 6.png', alt: 'Integrated Mode - Contextual moments', title: 'Context-Aware Interactions', desc: 'AI understands the current context and provides relevant help at the right moments in the user journey.' },
              { src: '/examples/ai-usage-modes/Integrated 7.png', alt: 'Integrated Mode - User flow integration', title: 'Flow-Embedded AI', desc: 'AI capabilities are embedded directly into the user flow, making assistance feel intuitive and unobtrusive.' },
              { src: '/examples/ai-usage-modes/Integrated 8.png', alt: 'Integrated Mode - Contextual AI', title: 'Just-in-Time AI Help', desc: 'AI appears exactly when needed, providing timely assistance that enhances productivity without distraction.' },
              { src: '/examples/ai-usage-modes/Integrated 9.png', alt: 'Integrated Mode - Seamless assistance', title: 'Invisible AI Enhancement', desc: 'AI works behind the scenes to enhance user actions, making interactions smoother and more efficient.' },
            ].map((card) => (
              <div key={card.src} className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
                <div
                  className={`relative w-full aspect-video ${onImageClick ? 'cursor-pointer' : ''}`}
                  style={{ backgroundColor: 'var(--color-surface-muted)' }}
                  onClick={() => onImageClick?.(card.src, card.alt, card.title, card.desc)}
                  onKeyDown={(e) => onImageClick && (e.key === 'Enter' || e.key === ' ') && (e.target as HTMLElement).click()}
                  role={onImageClick ? 'button' : undefined}
                  tabIndex={onImageClick ? 0 : undefined}
                >
                  <Image src={card.src} alt={card.alt} fill style={{ objectFit: 'contain' }} placeholder="empty" />
                </div>
                <div className="p-5">
                  <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{card.title}</h5>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* One AI Experience */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>One AI Experience</h4>
          </div>
          <p className="mb-4 max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
            A unified AI experience that seamlessly combines different modes to create a cohesive
            user journey.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/examples/ai-usage-modes/One AI 1.png', alt: 'One AI Experience - Unified AI journey', title: 'Unified AI Journey', desc: 'A cohesive experience where different AI modes work together seamlessly to create a unified user journey.' },
              { src: '/examples/ai-usage-modes/One AI 2.png', alt: 'One AI Experience - Cohesive user experience', title: 'Cohesive User Experience', desc: 'Multiple AI interaction modes combine to create a seamless and intuitive experience across the entire application.' },
              { src: '/examples/ai-usage-modes/One AI 3.png', alt: 'One AI Experience - Seamless mode combination', title: 'Seamless Mode Combination', desc: 'Different AI modes transition smoothly, creating a natural flow that adapts to user needs throughout their journey.' },
            ].map((card) => (
              <div key={card.src} className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-elevated)' }}>
                <div
                  className={`relative w-full aspect-video ${onImageClick ? 'cursor-pointer' : ''}`}
                  style={{ backgroundColor: 'var(--color-surface-muted)' }}
                  onClick={() => onImageClick?.(card.src, card.alt, card.title, card.desc)}
                  onKeyDown={(e) => onImageClick && (e.key === 'Enter' || e.key === ' ') && (e.target as HTMLElement).click()}
                  role={onImageClick ? 'button' : undefined}
                  tabIndex={onImageClick ? 0 : undefined}
                >
                  <Image src={card.src} alt={card.alt} fill style={{ objectFit: 'contain' }} placeholder="empty" />
                </div>
                <div className="p-5">
                  <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{card.title}</h5>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
