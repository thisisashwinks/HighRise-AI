import React from 'react';
import Link from 'next/link';
import { ComponentMetadata, getSubComponents } from '@/data/components';
import { Breadcrumbs } from './Breadcrumbs';
import { ComponentDocTemplate } from './ComponentDocTemplate';
import { ComponentDocProps } from '@/types/documentation';

interface ComponentGroupDetailTemplateProps {
  groupName: string;
  category: string;
  description: string;
  mainComponentDoc: Omit<ComponentDocProps, 'examples'>;
  examples: ComponentDocProps['examples'];
}

export const ComponentGroupDetailTemplate: React.FC<ComponentGroupDetailTemplateProps> = ({
  groupName,
  category,
  description,
  mainComponentDoc,
  examples,
}) => {
  const subComponents = getSubComponents(groupName);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: groupName },
        ]}
      />

      {/* Header */}
      <header className="mb-12">
        <div className="mb-2">
          <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
            {category}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">{groupName}</h1>
        <p className="text-lg text-neutral-700 leading-relaxed">{description}</p>
      </header>

      {/* Sub-components Section */}
      {subComponents.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Sub-components</h2>
          <p className="text-neutral-700 mb-6">
            The {groupName} component group includes the following variants. Each variant has its own detailed documentation page.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main component card */}
            <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-2">
                <span className="badge badge-primary">{category}</span>
                <span className="badge badge-primary ml-2">Main</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {groupName}
              </h3>
              <p className="text-sm text-neutral-700">{description}</p>
            </div>

            {/* Sub-component cards */}
            {subComponents.map((subComponent) => (
              <Link
                key={subComponent.name}
                href={subComponent.href}
                className="card hover:shadow-md transition-shadow"
              >
                <div className="mb-2">
                  <span className="badge badge-neutral">{subComponent.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {subComponent.name}
                </h3>
                <p className="text-sm text-neutral-700">{subComponent.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Component Documentation */}
      <ComponentDocTemplate
        {...mainComponentDoc}
        examples={examples}
      />
    </div>
  );
};
