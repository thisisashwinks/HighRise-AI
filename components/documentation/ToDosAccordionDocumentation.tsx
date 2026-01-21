import React from 'react';
import { ComponentDocTemplate } from '../ComponentDocTemplate';

export const ToDosAccordionDocumentation: React.FC = () => {
  return (
    <ComponentDocTemplate
      name="ToDos Accordion"
      category="Content"
      description="A specialized accordion component designed for organizing and managing todo items in collapsible sections. Features checkboxes for task completion, due date tracking, priority indicators, and completion counts. Perfect for task management interfaces, project planning, and organized todo lists."
      whenToUse={[
        'Organizing todos into logical groups or categories (e.g., by project, priority, or date)',
        'Task management interfaces requiring collapsible sections',
        'Project planning tools with multiple task categories',
        'When you need to show completion progress per section',
        'Managing todos with due dates and priorities',
        'Conserving vertical space while keeping multiple todo sections accessible',
        'When users need to focus on specific todo categories at a time',
        'Displaying hierarchical todo structures with clear organization'
      ]}
      whenNotToUse={[
        'For simple, flat todo lists without categories (use a basic list with checkboxes)',
        'When all todos must be visible simultaneously without collapsing',
        'For critical todos that must be immediately visible',
        'When there are only 1-2 todos total (consider displaying directly)',
        'For sequential workflows requiring linear progression',
        'When todos don\'t need grouping or categorization',
        'For actions or commands (use buttons or menus instead)',
        'When accordion sections would require horizontal scrolling on mobile'
      ]}
      anatomy={[
        {
          number: 1,
          name: 'Section Header',
          description: 'Clickable header displaying the section title. Shows completion count badge when enabled. Includes expand/collapse icon indicator.'
        },
        {
          number: 2,
          name: 'Completion Count Badge',
          description: 'Optional badge showing completed/total todos ratio. Changes color when all todos are completed (green) vs. incomplete (gray).'
        },
        {
          number: 3,
          name: 'Expand/Collapse Icon',
          description: 'Chevron icon indicating section state. Rotates 180 degrees when expanded. Provides visual feedback for collapsible state.'
        },
        {
          number: 4,
          name: 'Todo Item',
          description: 'Individual todo with checkbox, label, and optional metadata. Supports completion state, due dates, priorities, and descriptions.'
        },
        {
          number: 5,
          name: 'Checkbox',
          description: 'Interactive checkbox for marking todos as complete. Styled according to component size. Supports disabled state.'
        },
        {
          number: 6,
          name: 'Priority Badge',
          description: 'Optional badge indicating todo priority (low, medium, high). Color-coded: blue for low, yellow for medium, red for high.'
        },
        {
          number: 7,
          name: 'Due Date Badge',
          description: 'Optional badge showing due date. Formats as "Today", "Tomorrow", specific date, or "Overdue" with days past. Red styling for overdue items.'
        },
        {
          number: 8,
          name: 'Description',
          description: 'Optional additional text providing more context about the todo. Shown below the todo label when provided.'
        }
      ]}
      variants={[
        {
          name: 'Basic',
          description: 'Standard todos accordion with checkboxes and labels. Most common variant for simple task management.'
        },
        {
          name: 'With Completion Counts',
          description: 'Shows completion badges on section headers displaying completed/total ratio. Helps users track progress at a glance.'
        },
        {
          name: 'With Due Dates',
          description: 'Displays due date badges for each todo. Formats dates intelligently (Today, Tomorrow, specific date, or Overdue). Highlights overdue items.'
        },
        {
          name: 'With Priorities',
          description: 'Shows priority badges (low, medium, high) with color coding. Helps users identify urgent tasks quickly.'
        },
        {
          name: 'With Descriptions',
          description: 'Todos include optional description text below the label. Useful for providing additional context or instructions.'
        },
        {
          name: 'Full Featured',
          description: 'Combines all features: completion counts, due dates, priorities, and descriptions. Comprehensive task management solution.'
        }
      ]}
      states={[
        {
          name: 'Default',
          description: 'Initial state with sections collapsed. Headers show section title and optional completion count. Neutral styling.'
        },
        {
          name: 'Expanded',
          description: 'Section is expanded showing all todos within. Content animates smoothly. Header icon rotates to indicate expanded state.'
        },
        {
          name: 'Hover',
          description: 'State when user hovers over section header. Background changes to light gray to indicate interactivity.'
        },
        {
          name: 'Focus',
          description: 'State when section header receives keyboard focus. Shows primary color focus ring for accessibility.'
        },
        {
          name: 'Todo Completed',
          description: 'Todo item with checkbox checked. Label shows strikethrough and reduced opacity. Completion count updates accordingly.'
        },
        {
          name: 'Todo Overdue',
          description: 'Todo with past due date that is not completed. Shows red background and "Overdue" badge with days past.'
        },
        {
          name: 'Section Complete',
          description: 'Section where all todos are completed. Completion badge turns green. All todos show completed styling.'
        },
        {
          name: 'Disabled',
          description: 'Section or individual todo is disabled. Grayed out appearance with reduced opacity. Cannot be interacted with.'
        }
      ]}
      props={[
        {
          name: 'sections',
          type: 'Array<TodoSection>',
          description: 'Array of todo sections. Each section contains an id, title, todos array, and optional defaultExpanded and disabled flags.'
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'Size variant affecting padding, text size, and checkbox size. SM (compact), MD (standard), LG (spacious).'
        },
        {
          name: 'showCounts',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display completion count badges on section headers showing completed/total ratio.'
        },
        {
          name: 'showDueDates',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display due date badges for todos. Formats dates intelligently and highlights overdue items.'
        },
        {
          name: 'showPriorities',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display priority badges for todos. Shows color-coded badges for low, medium, and high priorities.'
        },
        {
          name: 'allowCollapseAll',
          type: 'boolean',
          default: 'true',
          description: 'Whether all sections can be collapsed simultaneously. When false, at least one section must remain expanded.'
        },
        {
          name: 'defaultExpanded',
          type: 'Array<string>',
          description: 'Array of section IDs that should be expanded by default. If not provided, uses defaultExpanded prop from individual sections.'
        },
        {
          name: 'onExpandedChange',
          type: '(expandedIds: string[]) => void',
          description: 'Callback function invoked when section expansion changes. Receives array of currently expanded section IDs.'
        },
        {
          name: 'onTodoToggle',
          type: '(sectionId: string, todoId: string, completed: boolean) => void',
          description: 'Callback function invoked when a todo checkbox is toggled. Receives section ID, todo ID, and new completed state.'
        },
        {
          name: 'className',
          type: 'string',
          description: 'Custom CSS classes applied to the accordion container. Allows layout and spacing customization.'
        },
        {
          name: 'headerClassName',
          type: 'string',
          description: 'Custom CSS classes applied to section headers. Allows header styling customization.'
        },
        {
          name: 'contentClassName',
          type: 'string',
          description: 'Custom CSS classes applied to section content areas. Allows content area styling customization.'
        }
      ]}
      usageGuidelines={{
        do: [
          'Use todos accordion for organizing todos into logical groups or categories',
          'Provide clear, descriptive section titles that indicate the category or purpose',
          'Use completion counts to help users track progress at a glance',
          'Show due dates for time-sensitive todos to help users prioritize',
          'Use priority badges to highlight urgent or important tasks',
          'Keep section titles concise but descriptive',
          'Group related todos together in the same section',
          'Use descriptions for todos that need additional context',
          'Ensure todos have clear, actionable labels',
          'Use disabled state for todos or sections that cannot be interacted with',
          'Consider defaultExpanded for sections users are likely to interact with first',
          'Provide onTodoToggle callback to sync state with backend or parent component'
        ],
        dont: [
          'Don\'t use todos accordion for simple, flat lists without categories',
          'Don\'t create too many sections (consider grouping related sections)',
          'Don\'t use vague or unclear section titles',
          'Don\'t nest todos accordions within each other',
          'Don\'t use for critical todos that must always be visible',
          'Don\'t disable sections without clear indication of why',
          'Don\'t use overly long todo labels (keep them concise)',
          'Don\'t show completion counts if they don\'t add value',
          'Don\'t use priority badges for todos without clear priority differences',
          'Don\'t create sections with only one or two todos (consider displaying directly)',
          'Don\'t use todos accordion for actions or commands',
          'Don\'t override default colors unless necessary for brand consistency'
        ]
      }}
      accessibility={{
        keyboard: [
          'Tab key moves focus to section headers',
          'Enter or Space key expands/collapses focused section',
          'Arrow Down key moves focus to next section',
          'Arrow Up key moves focus to previous section',
          'Home key moves focus to first section',
          'End key moves focus to last section',
          'Focus ring is visible for keyboard navigation with primary color accent',
          'Disabled sections cannot receive focus',
          'Tab key moves focus to checkboxes within expanded sections',
          'Space key toggles checkbox when focused on a todo item'
        ],
        screenReader: [
          'Section title and completion count are announced when section receives focus',
          'Expanded/collapsed state is announced for each section',
          'Todo labels and completion state are announced when navigating todos',
          'Due dates and priorities are announced when present',
          'Disabled state is announced for disabled sections or todos',
          'Completion count is announced as "X of Y completed"',
          'Overdue todos are announced with overdue status'
        ],
        ariaHints: [
          'aria-expanded on section headers indicating expanded/collapsed state',
          'aria-controls linking headers to their content regions',
          'aria-disabled for disabled sections',
          'aria-labelledby linking content regions to their headers',
          'role="region" on accordion container and content areas',
          'Proper checkbox labels and aria-checked states for todos',
          'aria-describedby for todos with descriptions'
        ]
      }}
      relatedComponents={[
        'Accordion',
        'Checkbox',
        'Checkbox Group',
        'Input',
        'Form'
      ]}
      figmaDocumentation={{
        title: 'ToDos Accordion Component Documentation',
        description: 'Complete visual reference showing all todos accordion sizes, states, variants, and configurations from the design system. Includes examples of all interactive states, completion tracking, and todo management features.',
        figmaUrl: 'https://www.figma.com/design/cxyeQWrtdlVeckwmorSVU1/HighRise-AI-1.1--%3E-Handoff--WIP-?node-id=5354-28036',
        figmaNodeId: '5354:28036',
      }}
      examples={[
        {
          title: 'Basic Todos Accordion',
          description: 'Standard todos accordion with checkboxes and section headers. Simple task management interface.',
          code: `<ToDosAccordion
  sections={[
    {
      id: 'work',
      title: 'Work Tasks',
      todos: [
        { id: '1', label: 'Review project proposal', completed: false },
        { id: '2', label: 'Update documentation', completed: true },
        { id: '3', label: 'Team meeting prep', completed: false },
      ],
    },
    {
      id: 'personal',
      title: 'Personal',
      todos: [
        { id: '4', label: 'Buy groceries', completed: false },
        { id: '5', label: 'Call dentist', completed: false },
      ],
    },
  ]}
/>`,
          tags: ['basic', 'default'],
        },
        {
          title: 'With Completion Counts',
          description: 'Todos accordion showing completion counts on section headers. Helps users track progress at a glance.',
          code: `<ToDosAccordion
  showCounts={true}
  sections={[
    {
      id: 'project-a',
      title: 'Project A',
      todos: [
        { id: '1', label: 'Task 1', completed: true },
        { id: '2', label: 'Task 2', completed: true },
        { id: '3', label: 'Task 3', completed: false },
      ],
    },
  ]}
/>`,
          tags: ['counts', 'progress'],
        },
        {
          title: 'With Due Dates',
          description: 'Todos accordion with due date badges. Formats dates intelligently and highlights overdue items.',
          code: `<ToDosAccordion
  showDueDates={true}
  sections={[
    {
      id: 'urgent',
      title: 'Urgent Tasks',
      todos: [
        { id: '1', label: 'Submit report', dueDate: new Date(), completed: false },
        { id: '2', label: 'Review code', dueDate: new Date(Date.now() + 86400000), completed: false },
        { id: '3', label: 'Old task', dueDate: new Date(Date.now() - 86400000), completed: false },
      ],
    },
  ]}
/>`,
          tags: ['dates', 'overdue'],
        },
        {
          title: 'With Priorities',
          description: 'Todos accordion with priority badges. Color-coded badges help users identify urgent tasks.',
          code: `<ToDosAccordion
  showPriorities={true}
  sections={[
    {
      id: 'tasks',
      title: 'Tasks',
      todos: [
        { id: '1', label: 'Critical bug fix', priority: 'high', completed: false },
        { id: '2', label: 'Feature enhancement', priority: 'medium', completed: false },
        { id: '3', label: 'Code cleanup', priority: 'low', completed: false },
      ],
    },
  ]}
/>`,
          tags: ['priorities', 'urgency'],
        },
        {
          title: 'With Descriptions',
          description: 'Todos accordion with description text for additional context. Useful for complex tasks.',
          code: `<ToDosAccordion
  sections={[
    {
      id: 'complex',
      title: 'Complex Tasks',
      todos: [
        {
          id: '1',
          label: 'Implement authentication',
          description: 'Add OAuth2 support with Google and GitHub providers. Include refresh token rotation.',
          completed: false,
        },
      ],
    },
  ]}
/>`,
          tags: ['descriptions', 'context'],
        },
        {
          title: 'Full Featured',
          description: 'Complete todos accordion with all features: counts, due dates, priorities, and descriptions.',
          code: `<ToDosAccordion
  showCounts={true}
  showDueDates={true}
  showPriorities={true}
  sections={[
    {
      id: 'sprint',
      title: 'Sprint Tasks',
      todos: [
        {
          id: '1',
          label: 'Deploy to production',
          description: 'Deploy latest release to production environment',
          dueDate: new Date(),
          priority: 'high',
          completed: false,
        },
        {
          id: '2',
          label: 'Write tests',
          priority: 'medium',
          completed: true,
        },
      ],
    },
  ]}
  onTodoToggle={(sectionId, todoId, completed) => {
    console.log('Todo toggled:', sectionId, todoId, completed);
  }}
/>`,
          tags: ['full-featured', 'complete'],
        },
        {
          title: 'Controlled State',
          description: 'Todos accordion with controlled expansion state. Demonstrates managing expanded sections in parent component.',
          code: `const [expanded, setExpanded] = useState(['work']);

<ToDosAccordion
  defaultExpanded={expanded}
  onExpandedChange={setExpanded}
  sections={sections}
/>`,
          tags: ['controlled', 'state-management'],
        },
        {
          title: 'Different Sizes',
          description: 'Todos accordion in different sizes. Shows how component scales while maintaining consistent styling.',
          code: `<ToDosAccordion size="sm" sections={sections} />
<ToDosAccordion size="md" sections={sections} />
<ToDosAccordion size="lg" sections={sections} />`,
          tags: ['sizes', 'variants'],
        },
      ]}
    />
  );
};
