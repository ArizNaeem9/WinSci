<div align="center">

# WinSci

### Future skills for every mind

A free, accessible, trilingual learning platform for women and students with disabilities.
Learn AI, programming, design, and communication, or become a creator and teach what you know.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG_AA-2EC5F0)](#accessibility)

<img src="public/og.jpg" alt="WinSci hero" width="100%" />

</div>

---

## Overview

WinSci is a nonprofit learning platform built for the people most digital products overlook:
**women and students with disabilities**, based in **Abbottabad** and **Lahore**, with a Houston
campus on the way. Anyone can take a course for free, and any creator anywhere can submit a course
to teach, which our team reviews before it goes live.

The product is designed around accessibility from the ground up: every page can be **read aloud**,
switched between **English, Urdu (RTL), and Spanish**, and adapted with **high-contrast, larger-text,
and reduced-motion** modes that persist between visits.

## Features

#### Learning platform
- **Course catalog** for Communication, AI & Machine Learning, Programming, and Design.
- **Free enrollment** with an accessible modal form that captures access needs.
- **Creator submissions**, every course is reviewed before publishing.
- **Community reviews** with star ratings and moderation.
- **Donations** with preset tiers, a fundraising progress bar, and one-time or monthly giving.
- **Results showcase**: impact stats, a student-project gallery, and success stories.

#### Accessibility (built in, not bolted on)
- **Audio narration** on every section via a "Listen" button and a friendly mascot.
- **Accessibility toolbar**: high-contrast mode, three text sizes, and a reduced-motion toggle, all persisted.
- **Trilingual** content (English / Urdu / Spanish) with full **right-to-left** support and the Noto Nastaliq Urdu typeface.
- Semantic HTML, skip links, visible focus states, focus-trapped dialogs, ARIA labelling, and 44px+ touch targets.

#### Craft
- A restrained, navy-and-cyan visual system with a distinct illustrated identity.
- A cinematic scroll-reveal hero on desktop and a dedicated, text-forward hero on mobile.
- Hand-tuned micro-interactions and staggered scroll reveals that respect reduced-motion preferences.
- Mobile-first navigation: a full-screen menu and a sticky action bar for one-thumb access.
- Optimized imagery (WebP), real Open Graph / Twitter metadata, and a custom favicon set.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, shadcn-style primitives |
| Animation | Framer Motion |
| Database | SQLite via Node's built-in `node:sqlite` (no external service) |
| Text-to-speech | ElevenLabs (cloud) with a Web Speech API fallback |
| Image pipeline | sharp (build-time WebP / OG generation) |
| Fonts | Space Grotesk (display), Noto Sans (body), Noto Nastaliq Urdu |

## Getting started

### Prerequisites
- **Node.js 24+** (the API routes use the built-in `node:sqlite`, which is stable from Node 24; developed on Node 26).
- npm.

### Installation

```bash
git clone <your-repo-url> winsci
cd winsci
npm install
cp .env.example .env.local   # optional, see Environment variables
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Environment variables

All variables are optional; the app runs without them and degrades gracefully.

| Variable | Purpose | Default |
| --- | --- | --- |
| `ELEVENLABS_API_KEY` | Enables cloud text-to-speech (one consistent human voice in all languages). Without it, narration falls back to the visitor's best device voice. | _unset_ |
| `ELEVENLABS_VOICE_ID` | Override the narration voice. | `EXAVITQu4vr4xnSDxMaL` (Sarah) |
| `ELEVENLABS_MODEL` | Override the TTS model. | `eleven_multilingual_v2` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for Open Graph, Twitter, and canonical links. | `https://winsci.org` |
| `WINSCI_DATA_DIR` | Where the SQLite database is stored in production. | `./data` (prod), OS temp dir (dev) |

## Data and API

Submissions persist to a local SQLite database (`src/lib/db.ts`, no external dependency). Three route
handlers back the forms:

| Endpoint | Method | Stores |
| --- | --- | --- |
| `/api/enroll` | `POST` | Course enrollments (name, contact, city, course, access needs) |
| `/api/submit-course` | `POST` | Creator course submissions, saved as `pending` for review |
| `/api/reviews` | `GET` / `POST` | `GET` returns approved reviews; `POST` saves a review as `pending` |
| `/api/tts` | `POST` | Returns narration audio (cached on disk by content hash) |

**Moderation:** course submissions and reviews are stored with `status = 'pending'`. Approve a review
by setting its status to `approved` (via an admin script or SQL `UPDATE`) and it appears automatically
in the Reviews section.

## Project structure

```
src/
  app/
    layout.tsx          Root layout: fonts, metadata, providers
    page.tsx            Homepage composition
    globals.css         Design tokens, theme, accessibility modes, motion
    api/                Route handlers (enroll, submit-course, reviews, tts)
  i18n/                 LanguageProvider + English / Urdu / Spanish dictionaries
  a11y/                 AccessibilityProvider (contrast / text size / motion)
  audio/                Speech engine (cloud TTS + device fallback)
  lib/                  SQLite helpers, utilities
  components/
    ui/                 Reusable primitives (Button, scroll hero, background paths)
    sections/           Hero, Modules, Approach, Impact, Gallery, Stories,
                        Locations, Teach, Donate, FAQ, Contact, Footer
    illustrations/      SVG artwork
public/                 Optimized images, icons, Open Graph image
```

## Accessibility

Accessibility is a core requirement, not an afterthought:

- **Audio-first:** any content can be heard aloud, important for non-reading users.
- **Adaptable UI:** high-contrast mode, larger text, and reduced motion, remembered across sessions.
- **Multilingual + RTL:** complete English, Urdu, and Spanish translations with correct directionality.
- **Keyboard and screen reader:** semantic landmarks, skip link, focus management, ARIA, and large touch targets.
- **Motion-aware:** every animation honors `prefers-reduced-motion` and the in-app toggle.

## Internationalization

All copy lives in `src/i18n/translations.ts`, keyed by section across `en`, `ur`, and `es`. The active
language is stored locally and applied to `<html lang>` and `dir`, switching the layout to right-to-left
and the Urdu typeface automatically. Adding a language means adding one dictionary entry.

## Customizing content

- **Copy, courses, projects, reviews, donation tiers, locations:** `src/i18n/translations.ts`
- **Colors, typography, spacing, motion:** `src/app/globals.css` (`:root` tokens)
- **Hero image:** replace `public/hero-learners.webp` (used by every hero variant)
- **Payments:** the donation form is UI-complete; connect it to a provider such as Stripe in `src/components/sections/Donate.tsx`

## Deployment

The app builds to a standard Next.js output and runs anywhere Node 24+ is available. When deploying:

1. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
2. Set `ELEVENLABS_API_KEY` to enable the cloud voice (optional).
3. Point `WINSCI_DATA_DIR` at a persistent, writable volume so the SQLite database survives restarts.

## License

© WinSci. All rights reserved. This project is currently private.

---

<div align="center">
Built to be used by everyone.
</div>
