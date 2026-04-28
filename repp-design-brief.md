# Repp — Design Brief

Use this document as a prompt when making any visual, copy, or layout changes to the Repp codebase. It captures all decisions made during design exploration. Do not deviate from these specs without explicit instruction.

---

## Brand

- **Name:** repp (always lowercase)
- **Product:** Real-time computer vision form coaching app
- **Stage:** Pre-launch waitlist
- **Tone:** Direct, minimal, technical precision without jargon. No hype. No stats or numbers that aren't meaningful to the user.

---

## Visual direction: Warm Dark

Charcoal background, warm amber accent, clean humanist sans-serif type. Premium gym feel — grounded, not futuristic. Not neon, not sci-fi, not clinical white.

---

## Typography

- **Display / headings / body:** DM Sans
- **Labels / captions / monospaced data:** DM Mono
- Do not use Inter, Roboto, or system font stacks.

Load from Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## Color tokens

```css
--ink:         #F0EBE3;   /* primary text */
--muted:       #8A8178;   /* secondary text, placeholders */
--muted-lt:    #C4BDB5;   /* body text on dark */
--paper:       #1C1814;   /* page background */
--surface:     #252018;   /* card / section background */
--surface2:    #2C2620;   /* elevated surface */
--line:        #38322A;   /* borders, dividers */
--panel:       #252018;   /* panel background */
--accent:      #E8943A;   /* amber — CTAs, active states, wordmark accent */
--accent-dark: #C97828;   /* amber hover */
--error:       #E05555;   /* form errors */
--mono:        'DM Mono', monospace;
```

Rules:
- `--accent` is the only CTA color. Never use green.
- Never use hardcoded hex values — always reference tokens.
- Background layering darkest→lightest: `--paper` → `--surface` → `--surface2`

---

## Wordmark

Plain text, no icon, no logo mark:

```tsx
<a className="brand-mark" href="#top" aria-label="Repp home">
  <span>rep</span><span style={{ color: 'var(--accent)' }}>p</span>
</a>
```

CSS:
```css
.brand-mark {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--ink);
  text-decoration: none;
}
```

No icon box, no PulseIcon, no `.brand-icon` wrapper.

---

## Page layout — locked decisions

### Nav
- Wordmark only. No nav links, no CTA button.

### Hero
- Centered, minimal. Headline + subhead + email form, centered on screen.
- No stick figure or lifter animation; rely on the amber glow and grid texture.
- Amber radial glow behind the headline.
- Subtle grid overlay: amber lines, 4% opacity, 60px spacing.
- "Waitlist open" pill badge above the headline with a pulsing amber dot.

### Sections — keep
1. Hero
2. How it works (3-step)
3. Bottom CTA
4. Footer

### Sections — remove entirely
- Stats strip (no numbers)
- Core benefits / feature cards
- FAQ

### Footer
- Wordmark left, copyright right.
- `© 2026 Repp. All rights reserved.`
- Single border-top rule.

---

## Copy — exact strings

### Hero
- Eyebrow: `Waitlist open`
- H1: `Form. Corrected.`
- Subhead: `Real-time computer vision that analyzes your movement and fixes your form.`
- Input placeholder: `your@email.com`
- Button: `Get early access`
- Button loading: `Joining…`
- Below form: nothing (blank)
- Success: `You're on the list. We'll be in touch.`
- Error: `Enter a valid email to join the waitlist.`

### How it works
Eyebrow only — no section H2.

Steps:
```
01 — Point
Set your phone up facing you. No special equipment needed — just your existing camera.

02 — Lift
Do your set as normal. Repp analyzes your movement in real time as you lift.

03 — Fix
Get instant feedback on what to correct — so every rep builds better movement.
```

### Bottom CTA
- H2: `Every rep.` + line break + `Perfected.` — "Perfected." in `--accent` color
- Body: `Join the waitlist and be among the first to train with real-time AI form coaching.`
- Button: `Get early access`

### Page title
`Repp — Real-time form coaching`

---

## Things explicitly removed — do not add back

- "— rep by rep" suffix on the hero subhead
- "No spam. Early access only." below the form
- Joint counts (17 joints, etc.)
- Latency numbers (sub-50ms, etc.)
- Exercise counts (40+, etc.)
- Any stats strip or data row
- Nav CTA button

---

## Section backgrounds

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

## Hero overlay

```css
.hero-section::before {
  background:
    linear-gradient(90deg, rgba(28,24,20,0.98) 0%, rgba(28,24,20,0.92) 43%, rgba(28,24,20,0.48) 72%, rgba(28,24,20,0.18) 100%),
    radial-gradient(circle at 86% 22%, rgba(232,148,58,0.18), transparent 28%),
    radial-gradient(circle at 76% 82%, rgba(232,148,58,0.08), transparent 28%);
}
```

## Key component styles

```css
input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(232, 148, 58, 0.16);
}

.submit-button {
  color: var(--paper);
  background: var(--accent);
}
.submit-button:hover {
  background: var(--accent-dark);
  transform: translateY(-1px);
}

.eyebrow {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.step-item span {
  background: var(--accent);
  color: var(--paper);
}
```
