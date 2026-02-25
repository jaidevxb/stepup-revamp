# StepUp — Full-Stack Product Development Program

A community-driven, self-paced learning platform that guides developers through a structured curriculum to build real products. StepUp tracks your progress through phases, logs weekly projects, and showcases the community gallery.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Pages & Routes](#pages--routes)
5. [Features](#features)
6. [Specialization Tracks](#specialization-tracks)
7. [Authentication Flow](#authentication-flow)
8. [Database Schema](#database-schema)
9. [Storage](#storage)
10. [Environment Variables](#environment-variables)
11. [Getting Started](#getting-started)
12. [Scripts](#scripts)
13. [Component Overview](#component-overview)
14. [Data Structures](#data-structures)
15. [UI & Styling](#ui--styling)
16. [Deployment](#deployment)
17. [Known TODOs](#known-todos)

---

## Overview

StepUp is a full-stack web application built with **Next.js 13 App Router** and **Supabase**. It is designed for aspiring product developers who want to go from beginner to shipping real products across five specialization tracks — from core full-stack to AI, Data Science, Analytics, and DevOps.

**Core product loops:**
- Sign up with a magic link (no password)
- Select a specialization track
- Complete phase-based topic checklists with streak tracking
- Log weekly projects with status and LinkedIn URLs
- Submit finished projects to the community gallery
- Receive weekly email nudges to stay on track

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 13.5.1 (App Router) |
| Language | TypeScript 5.2.2 |
| UI Library | React 18.2.0 |
| Database & Auth | Supabase (PostgreSQL + Magic Link OTP) |
| Supabase SDK | `@supabase/ssr`, `@supabase/supabase-js` |
| Styling | Tailwind CSS 3.3.3 |
| Component Library | shadcn/ui + Radix UI |
| Icons | Lucide React |
| Forms | React Hook Form 7.53.0 + Zod 3.23.8 |
| Charts | Recharts 2.12.7 |
| Carousel | Embla Carousel |
| Toasts | Sonner 1.5.0 |
| Date Utilities | date-fns 3.6.0 |
| Class Utilities | clsx + tailwind-merge |
| Email | Resend |
| Deployment | Vercel (primary) + Netlify |

---

## Project Structure

```
stepup-redesign/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (font, metadata, body padding)
│   ├── page.tsx                # Entry point → renders homepage
│   ├── homepage.tsx            # Full landing page (client component)
│   ├── globals.css             # Tailwind directives + CSS variables
│   ├── favicon.ico             # App icon
│   ├── api/
│   │   └── send-weekly-nudge/
│   │       └── route.ts        # Weekly email nudge endpoint (POST + GET for Vercel cron)
│   ├── gallery/
│   │   └── page.tsx            # Community gallery (server component)
│   ├── resources/
│   │   └── page.tsx            # Learning resources (Suspense wrapper)
│   └── tracks/
│       ├── page.tsx            # Main tracker dashboard (server component)
│       └── auth/
│           └── callback/
│               └── route.ts    # Supabase OAuth callback route
│
├── components/
│   ├── Navigation.tsx          # Fixed top navbar
│   ├── Footer.tsx              # Site-wide footer
│   ├── MobileBottomNav.tsx     # Fixed mobile bottom tab bar (md:hidden)
│   ├── sections/               # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── MarketReality.tsx
│   │   ├── Comparison.tsx
│   │   ├── LearningPath.tsx
│   │   ├── ProgramOverview.tsx
│   │   ├── Tracks.tsx
│   │   ├── BuildInPublic.tsx
│   │   ├── SocialProof.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── tracker/                # Track dashboard components
│   │   ├── AuthPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Onboarding.tsx
│   │   ├── PhaseAccordion.tsx
│   │   ├── ProjectLog.tsx
│   │   └── SubmitProject.tsx
│   ├── resources/              # Resources page components
│   │   ├── ResourcesContent.tsx
│   │   ├── ResourceCard.tsx
│   │   ├── TabNav.tsx
│   │   └── resourcesData.ts
│   └── ui/                     # shadcn/ui generated components (60+ files)
│
├── lib/
│   ├── trackData.ts            # All 5 track configs (phases, topics, project ideas)
│   ├── utils.ts                # cn() class helper
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       └── server.ts           # Server Supabase client (SSR/cookies)
│
├── hooks/
│   └── use-toast.ts            # Toast notification hook
│
├── public/
│   └── bargava.jpg             # Testimonial endorser image
│
├── netlify/
│   └── functions/
│       └── weekly-nudge.mts    # Netlify scheduled function (Monday 9am UTC)
├── middleware.ts               # Session refresh on every request
├── next.config.js              # Next.js config (ESLint + image settings)
├── vercel.json                 # Vercel cron job schedule
├── tailwind.config.ts          # Tailwind theme (colors, animations)
├── tsconfig.json               # TypeScript config (@/* path alias)
├── components.json             # shadcn/ui config
└── package.json
```

---

## Pages & Routes

| Route | Type | Description |
|---|---|---|
| `/` | Client | Landing page — Hero, Program, Tracks, Testimonial, FAQ |
| `/tracks` | Server | Main dashboard (auth-gated). Shows AuthPage or Dashboard |
| `/gallery` | Server | Public community gallery of submitted projects |
| `/resources` | Server (Suspense) | Curated learning resources, tab-filtered by track |
| `/tracks/auth/callback` | API Route | Supabase magic link exchange → session creation |
| `/api/send-weekly-nudge` | API Route | Sends weekly nudge emails via Resend (POST + GET) |

---

## Features

### Learning Tracker
- Phase-based curriculum with clearly defined week ranges
- Topic checklists with estimated hours per topic
- Optional external resource links on topics (YouTube, docs, etc.)
- Progress percentage and visual progress bar
- **Streak tracking** — counts consecutive days any topic is checked, IST timezone-aware (UTC +5:30). Streak resets if a full calendar day is skipped.

### Project Log
- Weekly project table (week number, title, status, LinkedIn URL)
- Status options: Not Started → In Progress → Done
- Auto-expanding textarea for project titles
- Add new weeks or delete existing rows
- All changes sync to Supabase in real time

### Project Submission & Gallery
- Submit finished projects with title, description, demo URL, GitHub URL, LinkedIn post URL
- Optional cover image upload with automatic center-crop to 1200×545 (JPEG, 0.9 quality)
- Max file size: 10 MB
- Images stored in Supabase Storage (`project-images` bucket)
- Submissions appear in the community gallery
- Users can view and delete their own submissions

### Community Gallery
- Displays all submitted projects from all users
- Shows project cover image (if uploaded), title, track badge, description, demo/GitHub links, submitter name, and date

### Weekly Email Nudges
- Automated weekly emails sent to every user every Monday at 9:00 AM UTC (2:30 PM IST)
- Personalized content: user's name, current streak, active track
- Message adapts based on activity: active streak encouragement vs. lapsed-user re-engagement copy
- Triggered automatically via Vercel Cron (`vercel.json`) or Netlify Scheduled Functions (`netlify/functions/weekly-nudge.mts`)
- Manual trigger: `POST /api/send-weekly-nudge` with `Authorization: Bearer <SEND_WEEKLY_SECRET>`
- Sent via Resend

### Learning Resources
- Curated resource cards for each specialization track
- Metadata: emoji tag, title, external URL, estimated duration, difficulty level, type (video/article/course)
- Sticky tab navigation below the main navbar for easy track switching
- Horizontal scrollable tab bar on mobile

### Landing Page
- Hero with headline, CTA buttons, and a code snippet animation
- Program overview with 4-step journey
- 5 specialization track cards with weeks and topic counts
- Comparison table: StepUp vs traditional bootcamp
- Testimonial from Dr. Bargava Subramanian, CEO Cornet Health
- FAQ accordion
- Final CTA

---

## Specialization Tracks

| Track ID | Name | Duration | Focus Areas |
|---|---|---|---|
| `fs-core` | FS Core | ~25 weeks | HTML/CSS, JS, React, Node, PostgreSQL, deployment |
| `fs-ai` | FS + AI | ~30 weeks | LLMs, prompt engineering, RAG, AI APIs, embeddings |
| `fs-ds` | FS + Data Science | ~34 weeks | Python, ML, statistics, data visualization, model deployment |
| `fs-analytics` | FS + Data Analytics | ~32 weeks | SQL, dashboards, A/B testing, Tableau/Power BI |
| `fs-devops` | FS + DevOps | ~32 weeks | Docker, Kubernetes, CI/CD, AWS/GCP, monitoring |

Each track is broken into phases with weekly ranges. Each phase contains topics with estimated hours and optional learning URLs.

---

## Authentication Flow

StepUp uses **passwordless magic link authentication** via Supabase OTP.

```
1. User visits /tracks
   └── Middleware checks Supabase session
       ├── No session → Show AuthPage
       └── Has session → Show Onboarding or Dashboard

2. AuthPage (two modes)
   ├── "New User" mode: Enter name + email → send magic link
   │     └── Stores name in localStorage ('stepup_pending_name')
   └── "Log In" mode: Enter email only → send magic link

3. User clicks magic link in email
   └── Redirects to /tracks/auth/callback?code=XXXX
       └── Server route exchanges code for Supabase session
           ├── No profile exists → redirect to /tracks (shows Onboarding)
           └── Profile exists → redirect to /tracks (shows Dashboard)

4. Onboarding (first-time only)
   ├── Pre-fills name from localStorage
   ├── User selects specialization track
   ├── Creates row in `profiles` table
   ├── Seeds 4 default project ideas in `projects` table
   └── Redirects to Dashboard

5. Returning User
   └── Magic link → callback → Dashboard directly
```

**Session Management:**
- `middleware.ts` runs on every request to refresh the Supabase session cookie
- Server components use `lib/supabase/server.ts`
- Client components use `lib/supabase/client.ts`

---

## Database Schema

### `profiles`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Supabase auth user ID |
| `name` | TEXT | Display name |
| `selected_track` | TEXT | Active track ID (e.g. `fs-ai`) |
| `streak_count` | INT | Consecutive active days |
| `last_active_date` | DATE | Last date a topic was checked (IST) |

### `progress`

| Column | Type | Description |
|---|---|---|
| `user_id` | UUID (FK → profiles) | User reference |
| `topic_id` | TEXT | Unique topic identifier |

Unique constraint on `(user_id, topic_id)`.

### `projects`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK → profiles) | User reference |
| `track_id` | TEXT | Track this project belongs to |
| `week_number` | INT | Week number in the curriculum |
| `title` | TEXT | Project name/description |
| `status` | TEXT | `not-started` \| `in-progress` \| `done` |
| `linkedin_url` | TEXT | LinkedIn post URL (optional) |

### `gallery_projects`

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK → profiles) | Submitter user ID |
| `user_name` | TEXT | Submitter display name |
| `track_id` | TEXT | Track the project belongs to |
| `title` | TEXT | Project title |
| `description` | TEXT | Project description |
| `demo_url` | TEXT | Live demo link (optional) |
| `github_url` | TEXT | GitHub repository link (optional) |
| `linkedin_url` | TEXT | LinkedIn post link (optional) |
| `image_url` | TEXT | Cover image URL from Supabase Storage |
| `created_at` | TIMESTAMP | Submission timestamp |

**SQL to add new columns (if upgrading an existing DB):**
```sql
ALTER TABLE public.gallery_projects
  ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';

ALTER TABLE public.gallery_projects
  ADD COLUMN IF NOT EXISTS linkedin_url TEXT DEFAULT '';
```

---

## Storage

**Bucket:** `project-images`
- Visibility: **Public**
- File path format: `{user_id}/{timestamp}-{filename}`
- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- Images are center-cropped to **1200×545** before upload (canvas API, JPEG quality 0.9)
- Max upload size: **10 MB**

**Recommended RLS Policy (Supabase):**
```sql
-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload their own project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public read
CREATE POLICY "Public read for project images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');
```

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
# Supabase (public — safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# App URL (used in email CTA link)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Weekly email nudges — keep these server-side only
RESEND_API_KEY=re_your_resend_api_key
SEND_WEEKLY_SECRET=your-strong-secret-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

`NEXT_PUBLIC_*` variables are used in browser code and safe to expose. The remaining three (`RESEND_API_KEY`, `SEND_WEEKLY_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`) are server-only and must never be exposed to the client.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Supabase project (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/stepup-redesign.git
cd stepup-redesign

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your Supabase URL and anon key
```

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. In the SQL editor, run the following to create required tables:

```sql
-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  selected_track TEXT NOT NULL DEFAULT 'fs-core',
  streak_count INT NOT NULL DEFAULT 0,
  last_active_date DATE
);

-- Progress (completed topics)
CREATE TABLE public.progress (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  PRIMARY KEY (user_id, topic_id)
);

-- Projects (weekly project log)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_id TEXT NOT NULL,
  week_number INT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'not-started',
  linkedin_url TEXT DEFAULT ''
);

-- Gallery submissions
CREATE TABLE public.gallery_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  track_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  demo_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

3. Enable Row Level Security on all tables and add appropriate policies (users can only read/write their own data; gallery is public read)

4. Create the `project-images` storage bucket (set to public) and add the RLS policies from the [Storage](#storage) section

5. Enable **Email (Magic Link)** provider under Authentication → Providers in your Supabase dashboard

6. Set the redirect URL under Authentication → URL Configuration:
   - Site URL: `http://localhost:3000` (dev) or your production URL
   - Redirect URL: `http://localhost:3000/tracks/auth/callback`

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checker |

---

## Component Overview

### Navigation

| Component | Description |
|---|---|
| `Navigation.tsx` | Fixed top bar with logo, desktop nav links, smooth scroll to sections, mobile "Get Started" button |
| `MobileBottomNav.tsx` | Fixed bottom tab bar (mobile only, `md:hidden`). Tabs: Home, Program, Tracks, Resources, Gallery. Active tab gets bold icon and text. |
| `Footer.tsx` | Site footer with links to Program, Resources (Learning Materials, Project Gallery), and legal info |

### Landing Page Sections

| Component | Description |
|---|---|
| `Hero.tsx` | Headline, subtext, CTA buttons ("Get Started", "View Program"), code snippet decoration |
| `MarketReality.tsx` | Stats and copy explaining the product developer opportunity |
| `Comparison.tsx` | Table comparing StepUp to traditional bootcamps |
| `LearningPath.tsx` | Curriculum phases broken down week by week |
| `ProgramOverview.tsx` | 4-step journey: Learn → Build → Ship → Repeat (with mobile arrow separators) |
| `Tracks.tsx` | Cards for each of the 5 specialization tracks |
| `BuildInPublic.tsx` | Section on the "build in public" philosophy |
| `SocialProof.tsx` | Testimonial quote with endorser name, role, company, and photo |
| `FAQ.tsx` | Accordion-based frequently asked questions |
| `FinalCTA.tsx` | Final "Get Started" call-to-action banner |

### Tracker Components

| Component | Description |
|---|---|
| `AuthPage.tsx` | Passwordless login with mode toggle (New User / Log In). Signup captures name + email, Login captures email only. Sends magic link via Supabase OTP. |
| `Onboarding.tsx` | First-time track selection. Pre-fills name from localStorage. Creates profile and seeds default projects. |
| `Dashboard.tsx` | Main tracker UI. Displays name, streak, progress %, phase accordions, project log, and project submission form. |
| `PhaseAccordion.tsx` | Expandable accordion for a curriculum phase. Shows topics as checkboxes with hours and optional external link. Shows progress badge. |
| `ProjectLog.tsx` | Editable weekly project table. Each row has week number, title (auto-resize textarea), status dropdown, and LinkedIn URL. |
| `SubmitProject.tsx` | Project submission form with track selector, title, description, demo/GitHub URLs, and optional cover image upload with preview. Also shows list of past submissions. |

### Resources Components

| Component | Description |
|---|---|
| `ResourcesContent.tsx` | Top-level resources layout with hero, sticky tab nav, and resource card grid |
| `TabNav.tsx` | Horizontally scrollable pill buttons to filter resources by track. Uses `router.push` to update URL query param. |
| `ResourceCard.tsx` | Individual resource card showing emoji, title, external URL, duration, difficulty badge, and type |
| `resourcesData.ts` | Static data file with resources for all 5 tracks |

---

## Data Structures

### Track Config (`lib/trackData.ts`)

```typescript
type Topic = {
  id: string;           // e.g. 'fs-core-p1-t1'
  title: string;        // Display name
  estimatedHours: number;
  url?: string;         // Optional external learning resource
};

type Phase = {
  phaseNumber: number;
  title: string;        // e.g. 'Phase 1: Foundations'
  weekRange: string;    // e.g. 'Weeks 1-4'
  topics: Topic[];
};

type TrackConfig = {
  trackId: string;      // e.g. 'fs-core'
  trackName: string;    // e.g. 'Full-Stack Core'
  phases: Phase[];
};
```

### Resource Data

```typescript
type Resource = {
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'docs';
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  emoji?: string;
};
```

### Gallery Project (in `app/gallery/page.tsx`)

```typescript
type GalleryProject = {
  id: string;
  user_id: string;
  user_name: string;
  track_id: string;
  title: string;
  description: string;
  demo_url: string;
  github_url: string;
  image_url: string;
  created_at: string;
};
```

---

## UI & Styling

### Design System
- **Colors:** Near-black (`gray-900`) primary, light gray backgrounds (`#F8F9FA`), white cards
- **Typography:** Inter font (via `next/font/google`)
- **Border radius:** Consistent `rounded-lg` (8px) and `rounded-xl` (12px)
- **Shadows:** Minimal (`shadow-sm`) — clean, flat aesthetic
- **Spacing:** 4px base unit throughout

### Responsive Design
- Mobile-first Tailwind utilities
- Desktop nav hidden on mobile (`hidden md:flex`)
- Mobile bottom nav shown only on mobile (`md:hidden`)
- Body has `pb-16 md:pb-0` to prevent content hiding under mobile bottom nav
- Hero, dashboard stats, and program steps adapt at `md:` breakpoint

### Sticky Navigation
- Main nav: `fixed top-0 z-50` — always visible
- Resources tab nav: `sticky top-[65px] z-40` — sticks below main nav (65px = main nav height)

---

## Deployment

**Primary platform:** Vercel

**Steps:**
1. Push repository to GitHub
2. Import project in Vercel dashboard
3. Add all environment variables in Vercel → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your production URL)
   - `RESEND_API_KEY`
   - `SEND_WEEKLY_SECRET`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CRON_SECRET` is **auto-generated by Vercel** — do not set manually
4. Add production URL to Supabase allowed redirect URLs
5. Vercel will automatically schedule the weekly email cron from `vercel.json`

**Netlify (alternative):** The project also includes `@netlify/plugin-nextjs` and a `netlify/functions/weekly-nudge.mts` scheduled function. To deploy on Netlify instead, connect the repo and add the same environment variables in the Netlify dashboard.

**`next.config.js` settings:**
```js
{
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true }   // Required for Netlify static export compatibility
}
```

---

## Known TODOs

- **Remove mock data** from `app/gallery/page.tsx` (`MOCK_PROJECTS` array) once real submissions are live
- **Supabase RLS policies** should be fully configured before going to production — ensure users can only modify their own rows
- **Image optimization** — `unoptimized: true` in `next.config.js` disables Next.js image optimization; consider enabling it with proper Supabase domain configuration
- **Dark mode** — Tailwind dark mode is configured but not wired to any toggle UI yet
- **Track switching** — When a user changes their active track, existing project log rows for the old track remain; consider whether to archive or hide them
- **Email FROM domain** — Weekly nudges currently send from `onboarding@resend.dev` (delivers only to the Resend account owner's email). Once a custom domain is verified in Resend, update the `from:` field in `app/api/send-weekly-nudge/route.ts`

---

## Future Updates

Planned features not yet implemented:

- **Leaderboard** — Public ranking of builders by number of projects submitted to the gallery. Top 3 highlighted with gold/silver/bronze medals; full ranked list below. Would require a `/leaderboard` page (server component, `revalidate = 60`) and a link in the nav and gallery header.
- **Dark mode** — Tailwind dark mode is configured but no toggle UI exists yet
- **Track progress comparison** — See how your pace compares to other learners on the same track
- **Comment / reaction on gallery projects** — Community engagement on submitted projects
- **Rich text project descriptions** — Markdown support in project description field
- **Email unsubscribe** — Preference management so users can opt out of weekly nudges

---

## License

Private project. All rights reserved.
