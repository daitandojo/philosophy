# Hikmatia — Bot Knowledge Base

## Project Overview

**Hikmatia** (حکمت) is a Persian philosophy & wisdom platform built with Next.js 16.1.6 (App Router), TypeScript, MongoDB/Mongoose, MUI v7, DeepSeek AI, and OpenAI. It features AI-powered chat with 30 philosophers, a 6-part original book on Persian philosophy, 10,000+ verse library, learning paths, debate system, community features, and PWA support.

**Repository:** `git@github.com:daitandojo/philosophy.git`
**Production:** `https://hikmatia.vercel.app`
**Local dev:** `npm run dev` → `http://localhost:3000`

---

## Architecture

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5 |
| UI | MUI v7, framer-motion, Emotion |
| Database | MongoDB 7 via Mongoose 9 |
| AI | DeepSeek (chat, translation, debate), OpenAI (embeddings, TTS, DALL-E) |
| Vector Search | Pinecone |
| File Storage | Backblaze B2 |
| Auth | NextAuth v4 (Google OAuth) |
| Payments | Stripe (demo stub) |
| Animations | framer-motion, Lenis (smooth scroll) |
| 3D | Three.js, react-three-fiber, react-force-graph-3d |
| Audio | Tone.js, Web Speech API |
| State | Zustand (gamification, debate) |
| PWA | next-pwa, service worker |
| Deployment | Vercel (auto-deploy from GitHub main branch) |

### Directory Structure
```
src/
├── app/               # Next.js App Router pages + API routes
│   ├── page.tsx       # Home
│   ├── about/         # About page (with visitor count)
│   ├── chat/          # AI chat with philosophers
│   ├── debate/        # Rationalist vs Mystic debate
│   ├── explore/       # Verse search/browse
│   ├── learn/         # Learning paths
│   ├── philosophers/  # Philosopher listing + detail
│   ├── read/          # Full book (6 parts)
│   ├── slideshow/     # Cinematic quote slideshow
│   └── api/           # 70+ API routes
├── components/
│   ├── Navbar.tsx     # Sticky nav with drawer
│   ├── BottomNav.tsx  # Mobile bottom nav (5 tabs)
│   ├── ClientLayout.tsx # Root providers wrapper
│   ├── PageTransition.tsx # Route transitions
│   ├── ExternalLinks.tsx # Wikipedia/SEP links
│   ├── VisitorTracker.tsx  # Session-based visitor tracking
│   ├── VisitorCount.tsx    # Display visitor stats
│   ├── VoiceInput.tsx / VoiceOutput.tsx  # Speech I/O
│   └── chat/          # Chat-specific components
├── lib/
│   ├── philosophers.ts    # 30 philosopher definitions
│   ├── philosopher-prompts.ts  # AI system prompts (all 30)
│   ├── deepseek.ts        # DeepSeek API client
│   ├── book-content.ts    # Full book text (~20 sections)
│   ├── seed.ts            # DB seeding script
│   └── models/            # 29 Mongoose models
├── theme/
│   └── theme.ts       # MUI light + dark theme
├── i18n/              # en/es/nl translations
└── types/             # TypeScript interfaces
```

---

## Current State (May 2026)

### What's Fully Working
- **Book content** — 20 sections, scholarly narrative, production-ready
- **Chat with philosophers** — streaming SSE, 30 philosophers, conversation persistence (localStorage), VoiceInput/VoiceOutput
- **Debate** — rationalist (Ibn Sina) vs mystic (Rumi) with 8 preset topics, streaming responses
- **Philosopher detail pages** — 6 tabs, external links (Wikipedia, SEP, Britannica, Iranica)
- **Slideshow** — 80 quotes covering all 30 philosophers
- **Mobile UX** — bottom nav, safe-area support, haptic feedback, Lenis scroll fix
- **Error boundaries** — `error.tsx`, `not-found.tsx`, `global-error.tsx`
- **Auth UI** — Google OAuth sign-in with avatar/name display
- **Theme switching** — light/dark, though some pages have hardcoded colors (see below)
- **Visitor tracking** — distinct IP counting via MongoDB, displayed on About page

### Known Issues
1. **Theme contrast** — explore, discourse, about, timeline pages have hardcoded light-text-on-dark-background that doesn't fully adapt to light mode (outer bg is now `background.default` but inner text colors are hardcoded)
2. **MongoDB** — no MONGO_URI configured in production `.env`; all 70+ API routes that call `connectDB()` will fail silently or return empty
3. **Stripe/Premium** — demo stub only, real payments not implemented
4. **No tests** — zero test files exist
5. **No analytics** — in-memory stub only, not wired to any service
6. **Partytown** — package at version `0.0.0` (placeholder npm package, not real Partytown)
7. **`component={Link}` pattern** — used throughout; Next.js 16 sometimes fails during static generation (fixed with `force-dynamic` on affected pages)
8. **Community features** — backend exists but may not be fully wired to frontend

### Commit History (34 commits, all on main)
```
f3c483c Visitor tracking with distinct IP counting
321cddc Fix vertical overflow on timeline, philosophers list, chat padding
3bf3fe9 Fix chat input mobile width, theme contrast across 8 pages
3b8e5fc Fix dark/light mode body background (remove hardcoded #0d1f18)
b083707 Fix navbar overflow (scrollable items), page flash (popLayout)
1ecf209 Fix chat viewport overflow (calc(100dvh - 56px))
52468f0 Make access gate opt-in via env var
...
2286179 Add safe-area support and touch optimizations for iOS (first commit)
```

---

## Key Implementation Details

### Middleware (`middleware.ts`)
Access-gate for the site. Disabled by default (requires `ACCESS_GATE_ENABLED=true` env var). Was previously always-on — this broke Vercel's deployment checker. Fixed by making it opt-in.

### Page Transition (`PageTransition.tsx`)
Uses `AnimatePresence mode="popLayout"` with simple opacity fade (0.2s). Removed exit animation to prevent blank frame flash between route changes.

### Chat Input Layout
On mobile (`xs`): hides VoiceInput/VoiceOutput buttons (saved for `md`+). Text field gets full remaining width with send button. Bottom padding accounts for fixed bottom nav bar.

### Philosopher Selector (Chat Bar)
Shows all 30 philosophers in a horizontal scrollable chip row with gradient mask fade. Name text hidden on `xs` screens to save space. Uses `flexWrap: 'nowrap'` to prevent row wrapping.

### Theme System
MUI theme with custom breakpoints (xs:320, sm:375, md:768). CSS custom properties for light/dark via `data-theme` attribute on `<html>`. The body background was previously hardcoded to `#0d1f18` in `layout.tsx` — now correctly uses CSS `var(--background)` which changes with theme.

### External Links (Sprint 1.6)
30 philosophers each have `externalLinks` with Wikipedia + optional SEP, Britannica, Iranica URLs. Displayed as styled Chip links on philosopher detail pages.

### Debate Page
Two AI debaters: Rationalist (Ibn Sina persona, blue accents) and Mystic (Rumi persona, gold accents). Streaming SSE responses. 8 preset topics. Custom topic input. "Prompt Rationalist"/"Prompt Mystic" buttons to trigger each debater.

### Visitor Tracking
- `VisitorTracker.tsx` — fires ONE POST per browser session via `sessionStorage`
- `Visitor` model — stores IP, userAgent, path, visitCount
- `GET /api/visitors` — returns totalVisitors, todayVisitors, totalVisits
- `VisitorCount.tsx` — displays stats on About page with PeopleIcon/PublicIcon/TrendingUpIcon
- Falls back silently if MongoDB is unavailable

---

## Environment Variables (see `.env.example`)

| Var | Required | Purpose |
|-----|----------|---------|
| `DEEPSEEK_API_KEY` | Yes | AI chat, translation, debate |
| `MONGO_URI` | Yes | Database — all data persistence |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | For auth | Google OAuth |
| `NEXTAUTH_SECRET` | For auth | JWT signing |
| `OPENAI_API_KEY` | Optional | Embeddings, TTS, DALL-E images |
| `PINECONE_API_KEY` | Optional | Semantic vector search |
| `STRIPE_SECRET_KEY` | Optional | Payments (currently demo stub) |
| `ACCESS_GATE_ENABLED` | Optional | Set `true` to enable access code |

---

## Content Inventory

| Content | Count | Status |
|---------|-------|--------|
| Philosophers | 30 | Full bios, verified, external links |
| Seed verses | ~118 | Rumi, Hafez, Saadi, Attar, Sanai, Ferdowsi, Ibn Sina, Al-Farabi, Al-Ghazali, Ibn Arabi, Suhrawardi, Mulla Sadra, Zoroaster |
| Slideshow quotes | 80 | All 30 philosophers |
| Ingested quotes (script) | 565 | From `quotes/*.json`, 100+ philosophers |
| Book sections | 20 | Full scholarly narrative, 6 parts + epilogue + closing |
| Book content (markdown) | 9 files | Same content as book-content.ts |
| API routes | 70+ | Full CRUD for all models |
| Mongoose models | 29 | Verse, User, Comment, Work, Collection, etc. |
| i18n translations | 3 (en/es/nl) | ~736 lines total |

---

## Remaining High-Impact Work

### Quick Wins
1. **Fix timeline page theme** — has hardcoded dark bg (`#1a3a2a`) and light text that doesn't adapt
2. **Remove `component={Link}` pattern** — replace with `<Link passHref legacyBehavior>` throughout to eliminate need for `force-dynamic` on 20+ pages
3. **Add `og-image.png`** — generate the social preview image (referenced but missing)

### Medium Effort
4. **Wire community page to live APIs** — replace hardcoded sample data with real API calls
5. **Enable MongoDB** — set MONGO_URI in Vercel env vars, run `npm run seed`
6. **Add reading progress** — localStorage-based scroll position save (partially done in `[id]/page.tsx`)
7. **Remove `partytown@0.0.0`** — it's a placeholder package with no actual functionality

### Major Features (Future Epic)
8. **Real Stripe checkout** — remove demo stub, implement actual subscription flow
9. **Auth in production** — add Google OAuth env vars, enable social login
10. **Error monitoring** — add Sentry or similar
11. **Analytics** — wire Plausible/PostHog instead of in-memory stub
12. **Tests** — at minimum one e2e smoke test
13. **`/debate` Zustand store** — the store was planned but never created; debate state is currently component-local

---

## Design Decisions

1. **`force-dynamic` on 'use client' pages** — Next.js 16 static generation can't serialize MUI's `component={Link}` pattern. Adding `export const dynamic = 'force-dynamic'` skips prerendering for these pages, which is fine since they're client-rendered anyway.

2. **Chat voice buttons hidden on mobile** — VoiceInput and VoiceOutput are desktop-only to give the text field maximum width on phones.

3. **Access gate opt-in** — Built for testing but disabled by default so Vercel deployment checker can reach the root URL.

4. **Theme via CSS variables** — MUI handles component-level theming; CSS custom properties handle global background/colors. The two systems must stay in sync.

5. **No `force-dynamic` on error.tsx/not-found.tsx** — These use `<Link passHref legacyBehavior>` wrapping MUI Button instead of `component={Link}` to avoid the serialization issue.
