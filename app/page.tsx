import Link from 'next/link';
import Image from 'next/image';
import { componentRegistry, comingSoonComponents } from '@/data/components';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GeneralPatternsSection } from '@/components/GeneralPatternsSection';

export default function Home() {
  const components = componentRegistry;
  const comingSoon = comingSoonComponents;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home' },
        ]}
      />
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          HighRise AI Component Documentation
        </h1>
        <p className="text-lg text-neutral-700 max-w-2xl">
          Comprehensive documentation for HighLevel HighRise AI product and design components.
          Focused on UX patterns, AI behavior, and accessibility guidelines.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Components</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="mb-2">
                <span className="badge badge-neutral">{component.category}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {component.name}
              </h3>
              <p className="text-sm text-neutral-700">{component.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Coming Soon</h2>
        {comingSoon.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoon.map((component) => (
              <div
                key={component.name}
                className="card card-coming-soon"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="badge badge-neutral">{component.category}</span>
                  <span className="badge badge-primary">Coming Soon</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {component.name}
                </h3>
                <p className="text-sm text-neutral-700">{component.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-sm">No components coming soon at the moment.</p>
        )}
      </section>

      {/* General Pattern Examples */}
      <GeneralPatternsSection
        patterns={[
          {
            title: 'Auto-Fill Forms (In Modals)',
            description:
              'AI-powered form auto-fill functionality integrated within modal dialogs. This pattern demonstrates how AI can intelligently populate form fields based on context, user history, or external data sources, reducing manual data entry and improving user experience. The AI analyzes available information and suggests or automatically fills form fields, allowing users to review and confirm before submission.',
            image: {
              src: '/examples/General patterns/Auto-Fill Forms (In Modals).png',
              alt: 'Auto-fill forms in modals with AI assistance',
            },
          },
          {
            title: 'Create Smart Filters using Simple English (In Tables)',
            description:
              'Natural language processing for creating intelligent table filters. Users can describe filter criteria in plain English, and the AI interprets the request to generate appropriate filters. This pattern makes complex data filtering accessible to all users, regardless of technical expertise, by translating natural language queries into structured filter operations. The AI understands context, synonyms, and user intent to create accurate filters.',
            image: {
              src: '/examples/General patterns/Create Smart Filters using Simple English (In Tables).png',
              alt: 'Smart filters using natural language in tables',
            },
          },
        ]}
      />

      {/* General Guidelines & Principles Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">General Guidelines & Principles</h2>
        <p className="text-lg text-neutral-700 mb-8 max-w-3xl">
          These foundational principles guide the design and implementation of AI-powered components 
          in HighRise AI. They ensure consistent, ethical, and user-centric AI interactions.
        </p>

        {/* Core Principles */}
        <div className="space-y-8 mb-12">
          {/* Principle 1: Transparency and Disclosure */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Transparency and Disclosure</h3>
                <p className="text-neutral-700 mb-3">
                  AI agents must always disclose their identity to ensure users are aware they&apos;re interacting 
                  with an AI system. This prevents confusion and builds trust through clear communication.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Clearly indicate when users are interacting with an AI agent</li>
                  <li>Use consistent visual indicators and labels</li>
                  <li>Provide context about the AI&apos;s capabilities and limitations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Principle 2: Native Integration */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Native Integration</h3>
                <p className="text-neutral-700 mb-3">
                  AI functionalities should feel like a natural extension of the platform, using familiar 
                  patterns and standard actions that users already understand.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Operate seamlessly within existing user interfaces</li>
                  <li>Utilize standard actions and patterns familiar to users</li>
                  <li>Maintain consistency with platform design language</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Principle 3: Immediate Feedback */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Immediate Feedback</h3>
                <p className="text-neutral-700 mb-3">
                  Provide prompt and unobtrusive feedback when an AI agent is processing a request. 
                  Users should always know the system is working on their behalf.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Show &quot;Thinking&quot; or processing indicators</li>
                  <li>Provide status updates during long operations</li>
                  <li>Use subtle animations to indicate activity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Principle 4: Transparency of Internal Processes */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Transparency of Internal Processes</h3>
                <p className="text-neutral-700 mb-3">
                  Clearly convey the AI agent&apos;s current state and allow users to inspect reasoning, 
                  tool usage, and decision logic to build trust and understanding.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Show current state (processing, waiting, completed)</li>
                  <li>Allow inspection of agent reasoning when appropriate</li>
                  <li>Display tool usage and decision logic transparently</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Principle 5: User Control and Disengagement */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">5</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">User Control and Disengagement</h3>
                <p className="text-neutral-700 mb-3">
                  Ensure AI agents can be easily disengaged upon user request and only re-engage when 
                  explicitly instructed, upholding user autonomy.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Provide clear disengage controls</li>
                  <li>Respect user preferences for AI interaction</li>
                  <li>Only re-engage when explicitly requested</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Principle 6: Human Accountability */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">6</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Human Accountability</h3>
                <p className="text-neutral-700 mb-3">
                  While AI agents can perform tasks, ultimate responsibility should rest with human users. 
                  Establish clear delegation models to ensure accountability.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Maintain human oversight for critical tasks</li>
                  <li>Establish clear delegation models</li>
                  <li>Ensure users can review and approve AI actions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Principle 7: Responsible AI Design */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">7</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Responsible AI Design</h3>
                <p className="text-neutral-700 mb-3">
                  Prioritize fairness, transparency, and accountability throughout the AI lifecycle. 
                  Implement ethical practices from design through deployment.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Conduct regular bias audits</li>
                  <li>Provide clear explanations for AI decisions</li>
                  <li>Ensure fairness and equity in AI outcomes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Principle 8: Consistency in Design */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">8</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Consistency in Design</h3>
                <p className="text-neutral-700 mb-3">
                  Maintain consistency in design elements such as colors, typefaces, and layouts to 
                  create a familiar and intuitive user experience.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Use consistent visual language across components</li>
                  <li>Follow established design patterns</li>
                  <li>Reduce cognitive load through familiarity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Principle 9: Simplicity and Clarity */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">9</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Simplicity and Clarity</h3>
                <p className="text-neutral-700 mb-3">
                  Aim for simplicity in design to reduce user confusion and enhance the overall experience. 
                  Clear communication and straightforward interfaces help users navigate effectively.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 ml-4">
                  <li>Minimize unnecessary complexity</li>
                  <li>Use clear, concise language</li>
                  <li>Focus on essential functionalities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AI Usage Modes Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">AI Usage Modes</h3>
          <p className="text-lg text-neutral-700 mb-8 max-w-3xl">
            AI can be integrated into user experiences in different ways, each serving distinct purposes 
            and user needs. Understanding these modes helps designers choose the right approach for their context.
          </p>

          {/* Focused Mode */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-neutral-900">Focused</h4>
            </div>
            <p className="text-neutral-700 mb-4 max-w-2xl">
              AI is the main context, with a dedicated focus. Users interact primarily with the AI system 
              to accomplish their goals.
            </p>
            <div className="grid md:grid-cols-1 gap-6">
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Focused 1.png"
                    alt="Focused Mode - AI as the main context"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Supportive Mode */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-neutral-900">Supportive</h4>
            </div>
            <p className="text-neutral-700 mb-4 max-w-2xl">
              AI complements the main context and accompanies users along their journey to help them 
              achieve their goals. The AI assists without taking center stage.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Supportive 1.png"
                    alt="Supportive Mode - AI complements the main context"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Supportive 2.png"
                    alt="Supportive Mode - AI assists without taking center stage"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Mode */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-neutral-900">Integrated</h4>
            </div>
            <p className="text-neutral-700 mb-4 max-w-2xl">
              AI is blended into specific moments of the user&apos;s flow to help them complete small, 
              discrete tasks. The AI appears contextually when needed.
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 1.png"
                    alt="Integrated Mode - AI appears contextually when needed"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 2.png"
                    alt="Integrated Mode - AI blended into user flow"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 3.png"
                    alt="Integrated Mode - Contextual AI assistance"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 4.png"
                    alt="Integrated Mode - Discrete task completion"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 5.png"
                    alt="Integrated Mode - Seamless AI integration"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 6.png"
                    alt="Integrated Mode - Contextual moments"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 7.png"
                    alt="Integrated Mode - User flow integration"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 8.png"
                    alt="Integrated Mode - Contextual AI"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/Integrated 9.png"
                    alt="Integrated Mode - Seamless assistance"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* One AI Experience */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-neutral-900">One AI Experience</h4>
            </div>
            <p className="text-neutral-700 mb-4 max-w-2xl">
              A unified AI experience that seamlessly combines different modes to create a cohesive 
              user journey.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/One AI 1.png"
                    alt="One AI Experience - Unified AI journey"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/One AI 2.png"
                    alt="One AI Experience - Cohesive user experience"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="card p-0 overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/examples/ai-usage-modes/One AI 3.png"
                    alt="One AI Experience - Seamless mode combination"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Images Section - Placeholder for Figma and Linear blog images */}
        {/* Hidden for now - uncomment to show */}
        {/* <div className="mb-12">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Visual Examples</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Figma Image 1</p>
              </div>
            </div>
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Figma Image 2</p>
              </div>
            </div>
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Figma Image 3</p>
              </div>
            </div>
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Figma Image 4</p>
              </div>
            </div>
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Figma Image 5</p>
              </div>
            </div>
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Figma Image 6</p>
              </div>
            </div>
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Linear Blog Image 1</p>
              </div>
            </div>
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Linear Blog Image 2</p>
              </div>
            </div>
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <p className="text-sm text-neutral-500">Linear Blog Image 3</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-4 italic">
            Note: Images from Figma design library and Linear blog will be added here. 
            Please add the actual images by replacing the placeholder divs above with Next.js Image components.
          </p>
        </div> */}
      </section>

      <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-neutral-900 mb-3">About This Documentation</h2>
        <p className="text-neutral-700 mb-4">
          This documentation provides comprehensive guidance for building AI-powered components in HighRise AI. 
          Each component documentation page follows a structured format covering essential aspects of design, 
          implementation, and AI integration. The documentation includes practical examples, usage patterns, 
          and best practices to ensure consistent, accessible, and user-friendly AI interactions.
        </p>
        <p className="text-neutral-700 mb-4 font-medium">
          Component documentation pages include:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 text-sm ml-4">
          <li><strong>Header</strong> - Component name, category, and description</li>
          <li><strong>When to Use</strong> - Appropriate use cases and contexts</li>
          <li><strong>When Not to Use / Anti-patterns</strong> - Common mistakes and scenarios to avoid</li>
          <li><strong>Anatomy</strong> - Visual breakdown of component parts and structure</li>
          <li><strong>Variants</strong> - Different styles and configurations available</li>
          <li><strong>States</strong> - Interactive states (default, hover, focus, disabled, etc.)</li>
          <li><strong>Props / API Reference</strong> - Technical specifications and parameters</li>
          <li><strong>Usage Guidelines</strong> - Do&apos;s and Don&apos;ts for implementation</li>
          <li><strong>AI Considerations</strong> - AI-specific behaviors, patterns, and best practices</li>
          <li><strong>Accessibility</strong> - WCAG compliance and inclusive design guidelines</li>
          <li><strong>Related Components</strong> - Links to complementary or related components</li>
        </ol>
        <p className="text-neutral-700 mt-4 text-sm italic">
          This documentation is designed to help developers and designers create consistent, accessible, 
          and user-friendly AI-powered interfaces that align with HighRise AI&apos;s design principles 
          and user experience standards.
        </p>
      </section>
    </div>
  );
}

