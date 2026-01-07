# HighRise AI Component Documentation

Documentation site for HighLevel – HighRise AI product and design components.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation Structure

Each component documentation page follows an 11-section structure:

1. **Header** - Component name, category, and short description
2. **When to Use** - Appropriate use cases
3. **When Not to Use** - Anti-patterns and inappropriate uses
4. **Anatomy** - Numbered parts of the component
5. **Variants** - Different visual or functional variations
6. **States** - Interactive states (default, active, hover, focus, disabled)
7. **Props / API Reference** - Table of component props
8. **Usage Guidelines** - Do's and Don'ts
9. **AI Considerations** - AI-specific behaviors (for AI-related components)
10. **Accessibility** - Keyboard navigation, screen reader support, ARIA hints
11. **Related Components** - Links to related component documentation

## Adding New Component Documentation

1. Create a new component documentation file in `components/documentation/` (e.g., `ButtonDocumentation.tsx`)
2. Import and use `ComponentDocTemplate` with all required props
3. Create a page route in `app/components/[component-name]/page.tsx`
4. Add the component to the components list in `app/page.tsx` and `app/components/page.tsx`

## Style Guide

- Write in neutral, system-style language
- Target designers, PMs, and engineers
- Keep sections concise but specific (3-7 bullets or short paragraphs)
- Emphasize user intent and behavior
- For AI components, always include comprehensive AI Considerations section

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

