# Step-by-Step Guide: Building the Examples Section

This guide will help you create compelling, real-world examples for each component that show how patterns from other products can be applied to HighLevel.

## Overview

The Examples section showcases:
- **Real-world use cases** from popular products (not just HighLevel)
- **Pattern analysis** showing what works and what doesn't
- **HighLevel application** explaining how to adapt these patterns

## Step 1: Research & Identify Use Cases

### 1.1 Choose Diverse Products
Select 3-5 examples from different product categories:
- **SaaS Platforms**: Slack, Notion, Linear, Figma
- **E-commerce**: Shopify, Stripe Dashboard
- **Social Media**: Twitter, LinkedIn
- **Productivity**: Google Workspace, Microsoft 365
- **Design Tools**: Canva, Adobe Creative Cloud

### 1.2 Identify Component Usage
For each product, find where your component is used:
- **Input**: Search bars, form fields, command palettes
- **Tab**: Navigation, mode switching, content organization
- **Button**: CTAs, actions, confirmations

### 1.3 Document Context
For each example, note:
- **Where** it appears (page, section, context)
- **Why** it's used (user goal, business goal)
- **How** it's implemented (variant, size, placement)

## Step 2: Capture Screenshots

### 2.1 Screenshot Best Practices
- **Full context**: Include surrounding UI to show placement
- **High quality**: Use browser dev tools or screenshot tools
- **Annotated**: Add arrows/circles highlighting the component
- **Consistent size**: Aim for similar aspect ratios

### 2.2 Tools to Use
- **Browser DevTools**: Right-click → Inspect → Screenshot node
- **Screenshot tools**: CleanShot X, Snagit, or built-in tools
- **Figma**: If recreating in Figma for consistency

### 2.3 File Organization
Save screenshots in: `/public/examples/[component-name]/`
- `input-search-slack.png`
- `input-form-stripe.png`
- `tab-navigation-notion.png`

## Step 3: Write Example Content

Each example needs 4 parts:

### 3.1 Title
**Format**: `[Use Case] in [Product/Context]`

**Examples**:
- "Search Input in Navigation Bar"
- "Tabs for Mode Switching (Assist vs Build)"
- "Payment Input with Formatting"

### 3.2 Description
**What to include**:
- Where the component appears
- What user goal it serves
- Why this pattern was chosen
- Key features or behaviors

**Example**:
```markdown
Input fields are commonly used in navigation bars for search functionality. 
This example shows how a search input with a leading search icon helps users 
quickly find content across the application. The placeholder text provides 
guidance on what can be searched, and the input expands on focus to show 
recent searches or suggestions.
```

### 3.3 Critique
**What to analyze**:
- ✅ What works well (UX patterns, visual design, interactions)
- ❌ What could be improved (accessibility, clarity, efficiency)
- 💡 Unique approaches or innovations

**Example**:
```markdown
The search input is prominently placed and uses a clear icon to indicate its 
purpose. The placeholder text provides guidance on what can be searched. 
However, the input could benefit from keyboard shortcuts (Cmd+K) for power 
users, and the search suggestions could be more contextual based on the current 
page or user's recent activity.
```

### 3.4 HighLevel Application
**What to explain**:
- How this pattern applies to HighLevel's use cases
- Specific scenarios where it would be useful
- Any adaptations needed for HighLevel's context
- Integration with existing HighLevel features

**Example**:
```markdown
In HighLevel, this search pattern could be applied to the main navigation 
to search across contacts, campaigns, funnels, and templates. We could enhance 
it with AI-powered suggestions that learn from user behavior, and integrate 
with the command palette (Cmd+K) for quick actions. The search could also 
filter by entity type (contacts, campaigns, etc.) similar to how Linear 
categorizes search results.
```

## Step 4: Update Documentation Files

### 4.1 Add Examples to Component Documentation

Edit the component's documentation file (e.g., `InputDocumentation.tsx`):

```typescript
examples={[
  {
    title: 'Search Input in Navigation Bar',
    description: 'Input fields are commonly used in navigation bars...',
    imageUrl: '/examples/input/input-search-slack.png',
    imageAlt: 'Search input in Slack navigation bar',
    productName: 'Slack',
    critique: 'The search input is prominently placed...',
    highLevelApplication: 'In HighLevel, this search pattern could be applied...',
  },
  {
    title: 'Form Input with Validation',
    description: 'Input components are essential in forms...',
    imageUrl: '/examples/input/input-form-stripe.png',
    imageAlt: 'Form input with validation states in Stripe',
    productName: 'Stripe',
    critique: 'Clear error messaging helps users...',
    highLevelApplication: 'HighLevel forms could benefit from...',
  },
  // Add more examples...
]}
```

### 4.2 Image Paths
- Place images in: `public/examples/[component-name]/`
- Use descriptive filenames: `input-search-slack.png`
- Ensure images are optimized (WebP or compressed PNG)

## Step 5: Research Framework

Use this framework to analyze each example:

### 5.1 Context Questions
- What page/section is this on?
- What is the user trying to accomplish?
- What comes before/after this interaction?

### 5.2 Pattern Questions
- What variant/size/state is used?
- Why was this choice made?
- What alternatives exist?

### 5.3 UX Questions
- Is it discoverable?
- Is it accessible?
- Does it provide feedback?
- Does it handle errors gracefully?

### 5.4 HighLevel Questions
- Where in HighLevel would this be useful?
- What HighLevel features could enhance this?
- What constraints does HighLevel have?
- How does this fit with HighLevel's design system?

## Step 6: Example Categories

For each component, aim for diversity:

### Input Examples
1. **Search/Command Palette** (Slack, Linear, Notion)
2. **Form Fields** (Stripe, Typeform, Google Forms)
3. **Payment Inputs** (Stripe, PayPal)
4. **Multi-value Inputs** (Tags, chips, autocomplete)
5. **Specialized Inputs** (Date pickers, phone numbers, URLs)

### Tab Examples
1. **Mode Switching** (Assist vs Build, Edit vs View)
2. **Content Organization** (Dashboard sections, detail views)
3. **Navigation** (Settings pages, multi-step forms)
4. **Filtering** (Data views, search results)
5. **Workspace Switching** (Multiple projects, accounts)

## Step 7: Quality Checklist

Before adding an example, ensure:

- [ ] Screenshot is clear and shows full context
- [ ] Title clearly describes the use case
- [ ] Description explains the "why" not just the "what"
- [ ] Critique provides actionable insights
- [ ] HighLevel application is specific and relevant
- [ ] Image path is correct and image exists
- [ ] Alt text describes the image accurately
- [ ] Product name is included (if from external product)

## Step 8: Iteration & Improvement

### 8.1 Regular Updates
- Add new examples as you discover interesting patterns
- Update critiques based on new insights
- Refresh screenshots if products change

### 8.2 Feedback Loop
- Share examples with team for feedback
- Test HighLevel applications in real scenarios
- Refine based on user research

## Example Template

Use this template for consistency:

```typescript
{
  title: '[Use Case] in [Product/Context]',
  description: `
    [2-3 sentences explaining where and why this component is used.
    Include context about the user's goal and the product's purpose.]
  `,
  imageUrl: '/examples/[component]/[descriptive-name].png',
  imageAlt: '[Component] in [Product] showing [key feature]',
  productName: '[Product Name]', // Optional, only if external product
  critique: `
    [Analysis of what works and what doesn't. Be specific about UX patterns,
    visual design, accessibility, and interactions. 2-3 sentences.]
  `,
  highLevelApplication: `
    [Specific explanation of how this applies to HighLevel. Include:
    - Where it would be used
    - How it integrates with existing features
    - Any adaptations needed
    2-3 sentences.]
  `,
}
```

## Resources

### Products to Study
- **Design Systems**: Material Design, Ant Design, Carbon Design
- **SaaS Products**: Linear, Notion, Figma, Stripe, Vercel
- **Design Inspiration**: Dribbble, Behance, Muzli

### Tools
- **Screenshot**: CleanShot X, Snagit, Browser DevTools
- **Image Editing**: Figma, Photoshop, Preview
- **Research**: UserTesting, Hotjar, analytics data

---

**Remember**: The goal is to show how proven patterns from successful products can be adapted and enhanced for HighLevel's unique context and user needs.

