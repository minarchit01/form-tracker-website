# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on 0.0.0.0 (all interfaces)
npm run build     # tsc type-check + vite build
npm run preview   # preview the production build
```

No lint or test scripts are configured. Type errors surface via `npm run build`.

## Environment

Copy `.env.example` to `.env` and set `VITE_FORMSPREE_ENDPOINT` to a Formspree form URL. Without it, the waitlist form renders but submissions are blocked at the client level with an error message.

## Architecture

Single-page React + TypeScript + Vite waitlist site. The entire UI lives in two files:

- **`src/App.tsx`** — all components in one file. `App` owns the single shared form state (`email`, `formState`, `message`) and exposes `renderWaitlistForm` / `renderFormMessage` as render helpers so the same form appears in both the hero and the `#join` section with separate accessible IDs. `ProductPreview` is a purely decorative CSS-animated mock-up built from `<span>` elements.
- **`src/styles.css`** — plain CSS, no modules, no utility framework. Design tokens are CSS custom properties on `:root`. Layout is CSS Grid throughout. Three responsive breakpoints at 1040 px, 720 px, and 440 px.

There is no routing, no state management library, and no backend — form submissions POST directly to Formspree.

---

## Design System — Repp (Warm Dark)

The brand is called **repp** (lowercase). The visual direction is Warm Dark: charcoal background, warm amber accent, DM Sans typeface. Do not use Inter or any system font stack. Do not use green as an accent color.

### Fonts

Load from Google Fonts in `index.html` before any stylesheets:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- **DM Sans** — all body, headings, buttons, inputs
- **DM Mono** — eyebrow labels, captions, monospaced data (joint angles, metrics)

### Color tokens

Replace the entire `:root` block in `src/styles.css` with:

```css
:root {
  color: #F0EBE3;
  background: #1C1814;
  font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;

  --ink:        #F0EBE3;
  --muted:      #8A8178;
  --muted-lt:   #C4BDB5;
  --paper:      #1C1814;
  --surface:    #252018;
  --surface2:   #2C2620;
  --line:       #38322A;
  --panel:      #252018;
  --accent:     #E8943A;
  --accent-dark:#C97828;
  --error:      #E05555;
  --mono:       'DM Mono', monospace;
}
```

### Color usage rules

- `--accent` (#E8943A) — CTAs, active states, accent letters in wordmark, eyebrow labels, form focus rings
- `--accent-dark` (#C97828) — button hover states
- `--paper` / `--surface` / `--surface2` — background layering (darkest → lightest surface)
- `--line` (#38322A) — all borders and dividers
- `--muted` (#8A8178) — secondary text, placeholder text
- `--muted-lt` (#C4BDB5) — body text on dark backgrounds
- `--error` (#E05555) — form errors, warning states
- Never use hardcoded hex values for colors — always use tokens

### Wordmark

The brand mark is plain text, no icon:

```tsx
// In JSX
<a className="brand-mark" href="#top" aria-label="Repp home">
  <span>rep</span><span style={{ color: 'var(--accent)' }}>p</span>
</a>
```

CSS for `.brand-mark`:
```css
.brand-mark {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--ink);
  text-decoration: none;
}
```

Remove `.brand-icon` and the `PulseIcon` from the nav entirely.

### Body background

```css
body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    linear-gradient(90deg, rgba(232,148,58,0.04) 1px, transparent 1px),
    linear-gradient(180deg, rgba(232,148,58,0.04) 1px, transparent 1px),
    var(--paper);
  background-size: 60px 60px;
}
```

### Section backgrounds

```css
.steps-section   { background: var(--surface); }
.feature-section { background: var(--surface2); }
.final-cta       { background: var(--surface); }
.step-item       { background: var(--surface2); }
.feature-card    { background: var(--panel); border-color: var(--line); }
.review-row      { background: var(--surface2); border-color: var(--line); }
.review-row.strong { border-color: rgba(232,148,58,0.38); background: rgba(232,148,58,0.08); }
.upload-card     { background: var(--surface2); }
.privacy-band    { background: #0F0D0B; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
```

### Hero section overlay

```css
.hero-section::before {
  background:
    linear-gradient(90deg, rgba(28,24,20,0.98) 0%, rgba(28,24,20,0.92) 43%, rgba(28,24,20,0.48) 72%, rgba(28,24,20,0.18) 100%),
    radial-gradient(circle at 86% 22%, rgba(232,148,58,0.18), transparent 28%),
    radial-gradient(circle at 76% 82%, rgba(232,148,58,0.08), transparent 28%);
}
```

### Accent color replacements

Find and replace all green references in `src/styles.css`:

| Find | Replace |
|---|---|
| `var(--green)` | `var(--accent)` |
| `var(--green-dark)` | `var(--accent-dark)` |
| `rgba(24, 166, 91, …)` | `rgba(232, 148, 58, …)` |
| `#18a65b` | `#E8943A` |
| `#0d7640` | `#C97828` |

### Input focus state

```css
input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(232, 148, 58, 0.16);
}
```

### Submit button

```css
.submit-button {
  color: var(--paper);
  background: var(--accent);
}
.submit-button:hover {
  background: var(--accent-dark);
  transform: translateY(-1px);
}
```

### Eyebrow labels

```css
.eyebrow {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

### Text color overrides

Replace these hardcoded values with tokens:

| Selector | Property | New value |
|---|---|---|
| `.hero-lede` | color | `var(--muted-lt)` |
| `.nav-link` | color | `var(--muted)` |
| `.review-row span, .upload-card span` | color | `var(--muted)` |
| `.form-message` | color | `var(--muted)` |
| `.privacy-copy p:last-child` | color | `var(--muted-lt)` |
| `.step-item span` (number badge) | background | `var(--accent)` |
| `.step-item span` (number badge) | color | `var(--paper)` |

### Step number badge

```css
.step-item span {
  background: var(--accent);
  color: var(--paper);
}
```

---

## Copy — Minimal tone

All copy should be direct and minimal. Avoid hype, avoid technical specs (no joint counts, no latency numbers). Let the product speak through simplicity.

### Page title
```
Repp — Real-time form coaching
```

### Hero
- **Eyebrow:** `Waitlist open`
- **H1:** `Form. Corrected.`
- **Subhead:** `Real-time computer vision that analyzes your movement and fixes your form.`
- **Input placeholder:** `your@email.com`
- **Submit button:** `Get early access`
- **Default form message:** remove entirely (leave blank)
- **Success message:** `You're on the list. We'll be in touch.`
- **Error message:** `Enter a valid email to join the waitlist.`

### How it works steps
```
01 Point
Set your phone up facing you. No special equipment needed — just your existing camera.

02 Lift
Do your set as normal. Repp analyzes your movement in real time as you lift.

03 Fix
Get instant feedback on what to correct — so every rep builds better movement.
```

### Features / benefits (keep existing titles, update copy tone if needed)
- Keep section but ensure copy avoids technical numbers
- Section eyebrow: `Why repp`

### Final CTA
- **H2:** `Every rep. Perfected.`
- **Body:** `Join the waitlist and be among the first to train with real-time AI form coaching.`
- **Button:** `Get early access`

### Privacy band
- Keep existing copy, it is already appropriate in tone

---

## What NOT to change

- Form logic (`handleSubmit`, Formspree integration, `FormState` type)
- Responsive breakpoints (1040px, 720px, 440px) — keep as-is
- Component structure and HTML semantics
- `ProductPreview` component internals (CSS animation shapes)
- Accessibility attributes (`aria-*`, `role`, `sr-only`)
- `.env` / Formspree endpoint setup
