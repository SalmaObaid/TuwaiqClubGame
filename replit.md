# Replit.md

## Overview

This is a single-page interactive browser game called **"Hit at 10 – Perfect Timing"** built for a girls' event at Tuwaig Academy Club. The game challenges players to click the Tuwaiq Club logo at exactly 10.00 seconds on a running timer. Results are scored based on timing accuracy, with confetti animations for perfect hits. The app features a multi-screen flow (Home → Game → Result) with a leaderboard stored both locally and in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router) with three main routes: `/` (Home), `/game` (Game), `/result` (Result)
- **Styling**: Tailwind CSS with a custom purple/lavender feminine theme using CSS variables, plus shadcn/ui component library (new-york style)
- **Animations**: Framer Motion for page transitions and interactive elements
- **Effects**: canvas-confetti for celebration effects on perfect timing
- **State Management**: React Query (@tanstack/react-query) for server state; React hooks for local state
- **Build Tool**: Vite with React plugin
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript, executed via tsx
- **API Structure**: RESTful JSON API with two endpoints:
  - `POST /api/results` — Save a game result
  - `GET /api/results` — Retrieve latest game results (top 10)
- **Validation**: Zod schemas for input validation, shared between client and server via `shared/routes.ts`
- **Development**: Vite dev server runs as middleware in Express during development (HMR via `server/vite.ts`)
- **Production**: Vite builds static files to `dist/public`; server is bundled with esbuild to `dist/index.cjs`

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema** (in `shared/schema.ts`): Single table `game_results` with fields:
  - `id` (serial, primary key)
  - `playerName` (text, defaults to "Player")
  - `timeClicked` (double precision — the exact second the player clicked)
  - `difference` (double precision — difference from 10.00)
  - `isPerfect` (boolean — true if within ±50ms of 10.00)
  - `createdAt` (timestamp, auto-set)
- **Migrations**: Drizzle Kit with `drizzle-kit push` for schema sync (config in `drizzle.config.ts`)
- **Local Storage**: Client-side leaderboard also maintained in `localStorage` under key `tuwaiq_leaderboard`

### Shared Code
- `shared/schema.ts` — Database schema and Zod insert schemas (used by both client and server)
- `shared/routes.ts` — API route definitions with paths, methods, input schemas, and response schemas (acts as a typed API contract)

### Key Design Patterns
- **Typed API Contract**: The `shared/routes.ts` file defines API endpoints with Zod schemas, ensuring type safety across the stack
- **Storage Abstraction**: `server/storage.ts` uses an `IStorage` interface with a `DatabaseStorage` implementation, allowing easy swapping of storage backends
- **Component Architecture**: Custom game components (`GameLogo`, `TimerDisplay`, `BigButton`) alongside shadcn/ui primitives

### Game Logic
- Timer runs from 0 to 15 seconds using `performance.now()` for high precision
- Player clicks the logo to stop the timer; accuracy is measured against 10.00 seconds
- Perfect hit defined as ±50ms tolerance
- Results passed to Result page via URL query parameters (`?time=X.XX&name=PlayerName`)

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection via `DATABASE_URL` environment variable. Used with Drizzle ORM and `connect-pg-simple` for potential session storage.

### NPM Packages (Key)
- `express` — HTTP server
- `drizzle-orm` + `drizzle-zod` + `drizzle-kit` — ORM and migrations
- `pg` — PostgreSQL client
- `@tanstack/react-query` — Server state management
- `framer-motion` — Animations
- `canvas-confetti` — Celebration effects
- `wouter` — Client-side routing
- `zod` — Schema validation
- `shadcn/ui` components (via Radix UI primitives)
- `lucide-react` — Icons

### External Assets
- Google Fonts: Plus Jakarta Sans, Outfit, JetBrains Mono
- Sound effect loaded from `mixkit.co` CDN (correct answer tone)
- Tuwaiq Club Logo: stored locally at `attached_assets/Tuwaiq_Logo_1770702265320.png`

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)