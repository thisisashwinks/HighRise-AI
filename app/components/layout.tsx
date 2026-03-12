import { ComponentsSidebar, COMPONENTS_SECONDARY_SIDEBAR_WIDTH } from '@/components/ComponentsSidebar';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ComponentsSidebar />
      <div
        className="min-h-screen flex flex-col"
        style={{
          marginLeft: COMPONENTS_SECONDARY_SIDEBAR_WIDTH,
          padding: '1.5rem 2rem 2rem',
        }}
      >
        {children}
      </div>
    </>
  );
}
