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

This is a single-page React + TypeScript + Vite waitlist site for FormTracker (AI deadlift form review). The entire UI lives in two files:

- **`src/App.tsx`** — all components in one file. `App` owns the single shared form state (`email`, `formState`, `message`) and exposes `renderWaitlistForm` / `renderFormMessage` as render helpers so the same form appears in both the hero and the `#join` section with separate accessible IDs. `ProductPreview` is a purely decorative CSS-animated mock-up built from `<span>` elements.
- **`src/styles.css`** — plain CSS, no modules, no utility framework. Design tokens are CSS custom properties on `:root`. Layout is CSS Grid throughout. Three responsive breakpoints at 1040 px, 720 px, and 440 px.

There is no routing, no state management library, and no backend — form submissions POST directly to Formspree.
