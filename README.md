# WinSci

A bold, accessible, trilingual nonprofit **learning platform** for **women** and
**students with disabilities**. Learners take free courses in **AI, programming,
design and communication**; any creator can **submit a course to teach** (reviewed
before it goes live). The site showcases student results and drives donations.
Based in **Abbottabad** (original) and **Lahore**, with **Houston** coming soon.
Tagline: _every mind wins_.

Built with **Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript**,
with a built-in **SQLite database** (`node:sqlite`) for enrollments, course
submissions, and reviews.

## Platform & data

Three API route handlers persist to SQLite (`src/lib/db.ts`, no external deps):

| Endpoint | Method | What it stores |
|----------|--------|----------------|
| `/api/enroll` | POST | Course enrollments (name, contact, city, course, access needs) |
| `/api/submit-course` | POST | Creator course submissions - saved as `pending` for review |
| `/api/reviews` | GET / POST | GET returns `approved` reviews; POST saves a review as `pending` |

- **Moderation:** submissions and reviews are stored `pending`. Approve a review by
  setting its `status` to `approved` (e.g. an admin script / SQL `UPDATE`), and it
  appears automatically in the Reviews section.
- **DB location:** dev uses the OS temp dir (so writes don't trip the file-watcher);
  production uses `./data/winsci.db`. Override with the `WINSCI_DATA_DIR` env var.
  Wire the forms to email/Stripe/an admin dashboard as you grow.

## Voice narration ("Listen")

Every "Listen" button and the Sci mascot speak the page aloud.

- **Cloud TTS (recommended):** set `ELEVENLABS_API_KEY` in `.env.local` (see
  `.env.example`). The `/api/tts` route then returns one consistent, natural
  human voice for **all** visitors in **all three languages, including Urdu**.
  Audio is cached to disk by content hash, so repeat plays are instant and free.
  Override the voice with `ELEVENLABS_VOICE_ID`.
- **No key?** It automatically falls back to the visitor's best **device voice**
  (it ranks the OS voices and picks a natural one — Samantha/Ava, Aria/Jenny
  "Natural", Google, Mónica — never the robotic default).

## Run it

```bash
npm install      # already installed
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint (clean)
```

## Design

Dark, bold, illustrated - inspired by Mutwerk (illustrated dark hero + sticker
logo), Duolingo (module grid with learner counts), Airbnb (results carousel),
Apple (premium spacing) and Smilebaton (the "Sci" mascot). Deep-navy canvas,
multi-accent palette (cyan / pink / yellow / purple / green), **Space Grotesk**
display + **Noto Sans** body. Tokens live in `src/app/globals.css`.

## What makes it accessible

- **Trilingual** - English, Urdu (full RTL + Noto Nastaliq Urdu) and Spanish,
  remembered between visits.
- **Audio-first** - a **Listen** button on every section/card reads content aloud
  in the active language (Web Speech API). The **Sci mascot** also reads the page.
- **Accessibility toolbar** - high-contrast mode (flips to pure black/white +
  yellow), three text sizes, and a reduce-motion toggle. All persist and apply
  instantly.
- **Keyboard + screen reader** - skip link, focus rings, semantic landmarks,
  ARIA on every control, real labels, 44px+ targets, accessible carousel,
  accordion, progress bar and radio groups.
- **Motion-aware** - scroll reveals, stat count-ups and the donation progress
  bar all respect `prefers-reduced-motion` and the manual toggle.

## Sections

Hero (illustrated + mascot) · Modules grid · How it works · Impact stats ·
Student project gallery (carousel) · Success stories · Locations (Houston +
Lahore) · Donate (tiers + monthly/one-time + progress bar) · FAQ · Contact ·
Footer.

## Structure

```
src/
  app/                  layout (fonts + providers), page (assembly), globals.css
  i18n/                 LanguageProvider + EN/UR/ES dictionaries
  a11y/                 AccessibilityProvider (contrast / text size / motion)
  audio/                useSpeech + SpeechProvider (shared TTS state)
  components/
    icons.tsx           SVG icon set (no emojis)
    Logo, Header, LanguageSwitcher, AccessibilityToolbar, SpeakButton, Reveal,
    SectionHeading, Mascot
    illustrations/      LearnersScene (hero illustration)
    sections/           Hero, Modules, Approach, Impact, Gallery, Stories,
                        Locations, Donate, Faq, Contact, Footer
```

## Customizing

- **Colors / theme:** `src/app/globals.css` (`:root` tokens).
- **All copy, modules, projects, donation tiers & translations:**
  `src/i18n/translations.ts`.
- **Donation flow** currently shows tiers + a demo submit - wire the form in
  `src/components/sections/Donate.tsx` to a payment provider (e.g. Stripe).
- **Contact form** shows a success state on submit - wire `onSubmit` in
  `src/components/sections/Contact.tsx` to your backend/email.
- **Project gallery** uses generated SVG thumbnails - swap for real images in
  `src/components/sections/Gallery.tsx`.

> Branding ("WinSci", sticker logo, palette, mascot) and all stats/projects are
> placeholders to start from - swap freely.
