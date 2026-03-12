# HighRise Layout & Copy Guidelines

Layout, UI, and copy conventions for HighRise designs across HighLevel. Use these when implementing or reviewing screens so UI stays consistent.

**Source:** [HighRise 1.1](https://www.figma.com/design/emjjdhZIMlqbszmzP9PdS6/HighRise-1.1?node-id=27539-51132&p=f&t=A3mxPH7kFMsWsGue-11). 
**Reference:** [HighRise 1.1 Patterns (Figma)](https://www.figma.com/design/BGj12pNfi2v0OQTP9DRjSn/HighRise-1.1-Patterns).  
**Note:** Headings use **16px** as the standard; Use 15px in some modal/section headers — prefer 16px unless matching a specific Figma frame.

---

## Typography


| Role                         | Size     | Use for                                                                                         |
| ---------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| **Body / default**           | **14px** | Input, select, button, label, table text. Figma token: `font/size/lg` (14px), line-height 20px. |
| **Sub / hint / description** | **13px** | Hint text, descriptions. Figma token: `font/size/md` (14px), line-height 18px.                  |
| **Headings / titles**        | **16px** | Page titles, section titles, modal titles.                                                      |


- **Font:** Inter (Regular, Medium, Semi Bold).
- **Line height:** 20px for body/default; 18px for compact or secondary text where needed.

---

## Layout & Canvas

- **Canvas margin (body → canvas):** **16px** default. Can be 24px or 32px for specific contexts.
- **Canvas padding (inside canvas):** **16px** default. Can be 24px or 32px for specific contexts & builder screens.
- **Canvas border radius:** **12px**.
- **Canvas shadow:** **shadow/lg**  
`box-shadow: 0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03);`

---

## Components

- **Default size (sm):** **36px** height for primary controls (e.g. button, input, select, table cell height).
- **Tabs:** Default size **sm** → **24px** height.

Other component sizes prefer **sm (36px)** unless the pattern explicitly uses a smaller size.

---

## Spacing

- **Gap between columns (multi-column / builder):** **16px**.
- **Form:** 4px between label and control; 8px–20px vertical rhythm between form groups.
- **Modal:** Header padding top 12px, horizontal 16px; body padding 16px, vertical gap 8px; footer horizontal 16px, 12px between action buttons.

---

## Modals

- **Border radius:** **8px** (modal frame).
- **Shadow:** **xl** — `0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)`.
- **Padding:** Body 16px; header 12px top, 16px horizontal.

---

## Pattern-specific layout

### Layout & Canvas

- Body content width 1160px with 280px nav (layout should be responsive).
- Canvas offset from body: 16px (x, y).
- Two-column canvas: 16px gap between columns.

### Table + Filter

- Canvas margin 16px; table inset 16px from canvas.
- Subheader 40px height (can vary based on context); CRUD bar 48px.
- Filter dropdowns: 36px height when used in subheader/compact areas.

### Settings

- Same 16px canvas margin and padding.
- Use same spacing rhythm as other settings-style screens.

### Side Panel

- Panel width **320px**; inner padding **16px**.
- Header Lite row height 32px.
- Can be a top-right overlay (full viewport height) similar to a modal, or inline with the layout (varies by component prop).

### Empty Page

- Reuse standard canvas (16px margin, 16px padding, 12px radius, shadow/lg).
- Typical layout: illustration/empty state + primary CTA; spacing consistent with rest of app.
- Use Landing page treatment when you have content/copy about the feature/product.

### Builder screens

- Same 16px canvas margin.
- **16px** gap between columns in multi-column builder layouts.

### Misc screens

- Follow same canvas margin, padding, radius, and shadow as above.

---

## Copy guidelines

This guide defines how we write and format copy across the product. It helps ensure all text in the UI feels clear, consistent, and easy to understand. Copy must be in English (US).

### 1. Voice & tone

Our voice is clear, confident, and friendly. We keep copy short, actionable, and human, no filler or jargon.

**Examples**

- ✅ Add contact
- 🚫 Click here to begin adding your contact information

### 2. Capitalization


| Element                    | Style         | Example                                                                                                                        |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Headings / Titles          | Sentence case | Create new campaign. Get started in 8 minutes or less. (Use sentence case when the text is structured as a complete sentence.) |
| Buttons / Tabs             | Sentence case | Save changes                                                                                                                   |
| Descriptions / Helper Text | Sentence case | You can edit this later.                                                                                                       |
| Error & Success Messages   | Sentence case | Something went wrong. Try again.                                                                                               |
| Tooltips                   | Sentence case | Use this option to duplicate your funnel.                                                                                      |


Only capitalize proper nouns (e.g., HighLevel, Google, Facebook, Facebook Messenger, Funnel AI).

### 3. Punctuation

Keep punctuation simple and consistent.

- **Periods:** Use in full sentences; omit in short labels and buttons.
- **Commas:** Use the Oxford comma for clarity (A, B, and C).
- **Exclamation marks:** Use sparingly and only for positive reinforcement (e.g., 'All changes saved!').
- **Ellipses (…):** Avoid unless the action is incomplete (e.g., 'Loading…').
- **Hyphens and Dashes:** Hyphen (-) for compound words (In-app message); en dash (–) for ranges (Jan–Feb).

### 4. Buttons & actions


| Don't      | Do                |
| ---------- | ----------------- |
| Submit     | Save changes      |
| OK         | Confirm, Continue |
| Click Here | Learn more        |
| Retry      | Try again         |


Use clear, action-oriented verbs. Avoid vague or generic words like 'OK' or 'Submit.'

### 5. Errors & alerts

Errors should be helpful and calm, not technical or alarmist.

**Examples:**

- ❌ Error 503: Bad Gateway
- ✅ Can't connect right now. Check your internet and try again.

Keep the tone friendly and reassuring. Focus on what the user can do next to resolve the error.

### 6. Helper text & empty states

Use concise, helpful sentences in sentence case.

**Examples:**

- You don't have any templates yet. Create your first one to get started.
- Add details to personalize your automation.

Avoid fillers like 'Please note that…' or 'Kindly…'.

### 7. Formatting & numbers

- **Numbers:** Always use numerals (3 campaigns, not three campaigns).
- **Thousands:** Use commas (1,000; 12,500).
- **Large numbers:** Use abbreviations only when space is limited (1.2K, 3.5M).
- **Percentages:** Use numerals with % (5%, 12.5%). Keep decimal precision consistent.
- **Currency:** Use $ with numerals ($49, $1,299). Use .00 only when precision matters.
- **Dates (US):** Use MM/DD/YYYY (01/14/2026).
- **Readable dates:** Use Jan 14, 2026 for headings and summaries.
- **Time:** Use 12-hour format with space before AM/PM (3:00 PM).
- **Time ranges:** Use en dash (3:00–4:00 PM). Include timezone when relevant (ET, PT).
- **Phone numbers (US):** Use (###) ###-#### — example: (415) 555-0132.
- **Phone numbers with country code:** +1 (###) ###-####.
- **Phone extensions:** Use ext. #### — example: (415) 555-0132 ext. 204.
- ❌ Avoid dots in phone numbers (415.555.0132).
- **Addresses:** Use USPS state abbreviations (CA, NY, TX).
- **ZIP codes:** Use ##### or #####-####.
- **File sizes:** Use KB, MB, GB (25 MB).
- **Units:** Use abbreviated units with numerals (5 min, 2 hr).
- **URLs:** Omit protocol when possible (example.com).
- **Emails:** Use lowercase ([name@company.com](mailto:name@company.com)).
- **Acronyms:** Use all caps (API, CRM, URL).
- **IDs and codes:** Preserve system-generated formatting and capitalization.

### 8. Consistency checklist

- Correct capitalization for the element type
- Simple, consistent punctuation
- Clear, actionable phrasing
- Consistent tone with brand voice

### 9. Quick reference


| Rule              | Use                          |
| ----------------- | ---------------------------- |
| Buttons           | Sentence case, verb-first    |
| Descriptions      | Sentence case                |
| Headings / Titles | Sentence case                |
| Periods           | Only in full sentences       |
| Exclamation marks | Rare, for positive tone only |
| Dates             | MM/DD/YYYY                   |
| Phone Numbers     | (###) ###-####               |


### 10. Design references

- Figma Link
- Example screenshots:
