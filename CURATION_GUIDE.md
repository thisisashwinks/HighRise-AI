# Real-World Examples Curation Guide

This guide will help you find, capture, and curate real-world examples similar to [aiverse.design](https://www.aiverse.design/browse) for your component documentation.

## Overview

The Examples section now supports:
- **Images** (PNG, JPG, WebP)
- **Videos** (MP4, WebM)
- **GIFs** (animated examples)
- **Product links** (direct links to the feature)

## What I Can Help With

✅ **I can help you:**
- Structure the system to support images/videos
- Provide templates and frameworks for curation
- Guide you on where to find examples
- Help write descriptions and critiques
- Update the code to display examples beautifully

❌ **I cannot directly:**
- Browse websites and capture screenshots
- Download videos from products
- Access live product interfaces
- Create the actual media files

## Step-by-Step Curation Process

### Step 1: Identify Products & Use Cases

#### For Input Components:
1. **Search/Command Palettes**
   - [Linear](https://linear.app) - Cmd+K command palette
   - [Notion](https://www.notion.so) - Search functionality
   - [Slack](https://slack.com) - Search bar
   - [Figma](https://www.figma.com) - Command palette
   - [Vercel](https://vercel.com) - Dashboard search

2. **Form Inputs**
   - [Stripe](https://stripe.com) - Payment forms
   - [Typeform](https://www.typeform.com) - Form fields
   - [Google Forms](https://forms.google.com) - Various input types
   - [Airtable](https://airtable.com) - Field inputs

3. **Specialized Inputs**
   - [Calendly](https://calendly.com) - Date/time pickers
   - [Twilio](https://www.twilio.com) - Phone number inputs
   - [Shopify](https://www.shopify.com) - Product search

#### For Tab Components:
1. **Mode Switching**
   - [Figma](https://www.figma.com) - Design/Prototype/Dev Mode tabs
   - [GitHub](https://github.com) - Code/Issues/Pull Requests tabs
   - [Notion](https://www.notion.so) - View switching tabs

2. **Content Organization**
   - [Linear](https://linear.app) - Project tabs
   - [Notion](https://www.notion.so) - Page sections
   - [Airtable](https://airtable.com) - View tabs

3. **Navigation**
   - [Stripe Dashboard](https://dashboard.stripe.com) - Settings tabs
   - [Vercel](https://vercel.com) - Project tabs
   - [Shopify Admin](https://admin.shopify.com) - Section tabs

### Step 2: Capture Media

#### Option A: Screenshots (Static Examples)

**Tools:**
- **Browser DevTools**: Right-click → Inspect → Right-click element → "Capture node screenshot"
- **CleanShot X** (Mac): Best for annotated screenshots
- **Snagit**: Cross-platform screenshot tool
- **Built-in tools**: Cmd+Shift+4 (Mac) or Snipping Tool (Windows)

**Best Practices:**
- Capture full context (show surrounding UI)
- Use consistent dimensions (recommended: 1200x800px or 16:9 ratio)
- Save as PNG for quality, or WebP for smaller file size
- Name files descriptively: `input-search-linear-cmdk.png`

**File Structure:**
```
public/
  examples/
    input/
      input-search-linear-cmdk.png
      input-form-stripe-payment.png
      input-phone-twilio.png
    tab/
      tab-mode-figma-design-prototype.png
      tab-navigation-notion-sections.png
      tab-content-github-repo.png
```

#### Option B: Screen Recordings (Video Examples)

**Tools:**
- **Loom**: Easy sharing and embedding
- **CleanShot X** (Mac): Built-in screen recording
- **QuickTime** (Mac): Built-in screen recorder
- **OBS Studio**: Free, open-source
- **ScreenFlow**: Professional screen recording

**Best Practices:**
- Keep videos short (5-15 seconds for interactions)
- Show the interaction clearly (hover, click, type)
- Use 60fps for smooth animations
- Export as MP4 (H.264) for web compatibility
- Keep file size reasonable (<5MB per video)

**File Structure:**
```
public/
  examples/
    input/
      input-search-linear-cmdk.mp4
      input-autocomplete-notion.mp4
    tab/
      tab-switching-figma-modes.mp4
```

#### Option C: GIFs (Animated Examples)

**Tools:**
- **CleanShot X**: Can create GIFs from recordings
- **Kap** (Mac): Free GIF recorder
- **GIPHY Capture**: Simple GIF creation
- **Convert video to GIF**: Use online tools or FFmpeg

**Best Practices:**
- Keep GIFs short (2-5 seconds loop)
- Optimize file size (use tools like [ezgif.com](https://ezgif.com))
- Aim for <2MB file size
- Use 10-15fps for smaller files

### Step 3: Find Examples - Quick Reference

#### Websites to Browse:

1. **Design Inspiration Sites:**
   - [aiverse.design](https://www.aiverse.design/browse) - AI UX patterns (your reference!)
   - [Mobbin](https://mobbin.com) - Mobile app patterns
   - [Page Flows](https://pageflows.com) - User flow examples
   - [UI Movement](https://uimovement.com) - UI animations
   - [Dribbble](https://dribbble.com) - Design inspiration

2. **Product Hunt & Similar:**
   - [Product Hunt](https://www.producthunt.com) - Discover new products
   - [BetaList](https://betalist.com) - Early-stage products
   - [Launching Next](https://www.launchingnext.com) - Product showcases

3. **Design System Galleries:**
   - [Design Systems Gallery](https://designsystemsrepo.com)
   - [Component Gallery](https://component.gallery)

4. **Direct Product Access:**
   - Sign up for free trials
   - Use demo accounts
   - Check public demos/sandboxes

### Step 4: Create Example Entries

Use this template for each example:

```typescript
{
  title: 'Command Palette Search in Linear',
  description: 'Linear uses a command palette (Cmd+K) for quick navigation and actions. The search input appears as an overlay and provides instant results as you type, with keyboard navigation support.',
  media: {
    type: 'video', // or 'image' or 'gif'
    url: '/examples/input/input-search-linear-cmdk.mp4',
    alt: 'Linear command palette search interaction',
    thumbnailUrl: '/examples/input/input-search-linear-cmdk-thumb.png' // Optional for videos
  },
  productName: 'Linear',
  productUrl: 'https://linear.app',
  tags: ['search', 'command-palette', 'keyboard-shortcuts'],
  critique: 'The command palette is discoverable via Cmd+K and provides instant feedback. The fuzzy search works well, but could benefit from recent searches or favorites. The keyboard navigation is excellent.',
  highLevelApplication: 'HighLevel could implement a similar command palette for quick navigation between contacts, campaigns, and funnels. We could enhance it with AI-powered suggestions based on user behavior and recent activity.',
}
```

### Step 5: Organize & Optimize Media

#### Image Optimization:
```bash
# Using ImageOptim (Mac) or similar tools
# Or use online tools like:
# - TinyPNG (https://tinypng.com)
# - Squoosh (https://squoosh.app)
# - ImageOptim (https://imageoptim.com)
```

#### Video Optimization:
```bash
# Using FFmpeg to compress videos
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -acodec aac output.mp4

# Or use online tools:
# - CloudConvert (https://cloudconvert.com)
# - HandBrake (https://handbrake.fr)
```

### Step 6: Add to Documentation

1. **Save media files** to `/public/examples/[component-name]/`
2. **Update the component's documentation file** (e.g., `InputDocumentation.tsx`)
3. **Add the example object** to the `examples` array
4. **Test locally** to ensure media loads correctly

## Quick Start: First 5 Examples

### For Input Component:

1. **Linear Command Palette** (Video)
   - Record: Cmd+K → Type → Select result
   - File: `input-search-linear-cmdk.mp4`
   - Focus: Keyboard shortcuts, instant search

2. **Stripe Payment Form** (Image)
   - Screenshot: Payment form with validation
   - File: `input-form-stripe-payment.png`
   - Focus: Real-time validation, error states

3. **Notion Search** (GIF)
   - Record: Search interaction with results
   - File: `input-search-notion.gif`
   - Focus: Search suggestions, filtering

4. **Figma Command Palette** (Video)
   - Record: Cmd+/ → Search → Execute command
   - File: `input-command-figma.mp4`
   - Focus: Command execution, visual feedback

5. **Typeform Input** (Image)
   - Screenshot: Form input with helper text
   - File: `input-form-typeform.png`
   - Focus: Progressive disclosure, guidance

### For Tab Component:

1. **Figma Mode Tabs** (Video)
   - Record: Switching between Design/Prototype/Dev modes
   - File: `tab-mode-figma-switching.mp4`
   - Focus: Mode switching, state preservation

2. **GitHub Repository Tabs** (Image)
   - Screenshot: Code/Issues/Pull Requests tabs
   - File: `tab-navigation-github-repo.png`
   - Focus: Content organization, badges

3. **Notion Page Sections** (GIF)
   - Record: Switching between page sections
   - File: `tab-sections-notion.gif`
   - Focus: Content organization, smooth transitions

4. **Linear Project Tabs** (Video)
   - Record: Switching between project views
   - File: `tab-projects-linear.mp4`
   - Focus: View switching, context preservation

5. **Stripe Settings Tabs** (Image)
   - Screenshot: Settings page with multiple tabs
   - File: `tab-settings-stripe.png`
   - Focus: Navigation, hierarchy

## Tools & Resources

### Screenshot Tools:
- **CleanShot X** (Mac, paid): https://cleanshot.com
- **Snagit** (Cross-platform, paid): https://www.techsmith.com/snagit.html
- **ShareX** (Windows, free): https://getsharex.com
- **Flameshot** (Linux, free): https://flameshot.org

### Screen Recording:
- **Loom** (Cross-platform, free/paid): https://www.loom.com
- **CleanShot X** (Mac, paid): Built-in recording
- **OBS Studio** (Cross-platform, free): https://obsproject.com
- **ScreenFlow** (Mac, paid): https://www.telestream.net/screenflow

### GIF Creation:
- **Kap** (Mac, free): https://getkap.co
- **GIPHY Capture** (Mac, free): https://giphy.com/apps/giphycapture
- **ezgif.com** (Online, free): https://ezgif.com

### Image Optimization:
- **TinyPNG** (Online, free): https://tinypng.com
- **Squoosh** (Online, free): https://squoosh.app
- **ImageOptim** (Mac, free): https://imageoptim.com

### Video Optimization:
- **HandBrake** (Cross-platform, free): https://handbrake.fr
- **CloudConvert** (Online, free/paid): https://cloudconvert.com
- **FFmpeg** (Command-line, free): https://ffmpeg.org

## Example Sources by Component

### Input Examples:
- **Search**: Linear, Notion, Slack, Figma, Vercel
- **Forms**: Stripe, Typeform, Google Forms, Airtable
- **Command Palettes**: Linear, Figma, VS Code, GitHub
- **Specialized**: Calendly (dates), Twilio (phone), Shopify (search)

### Tab Examples:
- **Mode Switching**: Figma, GitHub, VS Code
- **Content Org**: Notion, Linear, Airtable
- **Navigation**: Stripe, Vercel, Shopify Admin
- **Filtering**: GitHub, Linear, Notion

## Next Steps

1. **Start with 3-5 examples** per component
2. **Mix media types** (images, videos, GIFs)
3. **Focus on quality** over quantity
4. **Iterate and improve** based on feedback
5. **Build a library** over time

## Tips for Success

- **Start small**: Begin with 2-3 high-quality examples
- **Be consistent**: Use similar dimensions and styles
- **Show interactions**: Videos/GIFs are more valuable than static images
- **Provide context**: Always explain where and why
- **Keep it updated**: Refresh examples as products evolve

---

**Remember**: The goal is to show real-world patterns that can inspire and guide HighLevel's component usage. Quality and relevance matter more than quantity.

