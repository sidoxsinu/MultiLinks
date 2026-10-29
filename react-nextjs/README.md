# MultiLinks // React & Next.js Implementation

This directory contains the modular React / Next.js component implementation of Muhammed Sinan M's contact and link-hub platform (`contact.muhammedsinan.in`), handcrafted to match the dark editorial design system of `muhammedsinan.in`.

## Component Architecture

- `LinkHub.tsx` — Main orchestrator component integrating the profile header, status badge, 2-column action cards grid, full-width resume CTA, lanyard badge, and footer.
- `ActionCard.tsx` — Dark glassmorphic card component with smooth hover states, spotlight gradient tracking, and one-click email copy with visual feedback.
- `LanyardBadge.tsx` — Interactive 3D Lanyard ID Badge component featuring GSAP mouse-tilt physics with damping, holographic sheen tracking (`--mx`, `--my`), woven strap, and natural pendulum settle on mount.
- `DotField.tsx` — Interactive canvas dot matrix background with mouse proximity bulge effect matching the main portfolio.
- `CustomCursor.tsx` — Difference blend-mode custom cursor with hover-enlarge triggers for interactive buttons and press response.
- `types.ts` — TypeScript definitions for link items, actions, and profile metadata.

## Prerequisites

- React 18+ or React 19
- Next.js 14, 15, or 16 (App Router or Pages Router)
- GSAP (`npm install gsap @gsap/react`)
- Tailwind CSS v3 or v4

## Tailwind Theme Configuration

Add the tokens to your `tailwind.config.ts` or `tailwind.config.js`:

```ts
export default {
  theme: {
    extend: {
      colors: {
        'accent-orange': '#E54D2E',
      },
      fontFamily: {
        heading: ['"General Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
};
```

Or for Tailwind v4 inline theme in `globals.css`:

```css
@theme inline {
  --color-accent-orange: #E54D2E;
  --font-heading: 'General Sans', sans-serif;
  --font-mono: 'Space Grotesk', monospace;
  --font-body: 'Space Grotesk', sans-serif;
}
```

## Fonts (Fontshare CDN)

Include the fonts in your `app/layout.tsx` or `index.html`:

```html
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=space-grotesk@400,500,600,700&display=swap"
  rel="stylesheet"
/>
```

## Quick Integration

In your Next.js page (e.g. `app/contact/page.tsx` or a dedicated route):

```tsx
import { LinkHub } from '@/components/LinkHub';

export default function ContactPage() {
  return <LinkHub />;
}
```
