# AGENTS.md

## Project Overview

Next.js 16 + Payload CMS 3 portfolio site. Full-stack: frontend, CMS admin, API, and PostgreSQL database in one app. Deployed on Vercel.

## Commands

```bash
bun dev              # Start dev server (localhost:3000)
bun run build        # Production build
bun run lint         # ESLint (next/core-web-vitals)
bun run payload      # Payload CLI
bun run migrate:create   # Create new migration
bun run generate:types   # Regenerate payload-types.ts
bun run generate:importmap
bun run ci           # migrate + build (CI pipeline)
```

No test suite exists. No typecheck script — type checking happens via `next build`.

## Environment

Copy `.env.example` to `.env.local`. Required:
- `PAYLOAD_SECRET` — random secret
- `DATABASE_URL` — PostgreSQL connection string
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob storage
- `NEXT_PUBLIC_SERVER_URL` — defaults to `http://localhost:3000`

## Path Aliases

Defined in `tsconfig.json`. Key ones:

| Alias | Maps to |
|---|---|
| `@/*` | Root (`./`) |
| `@frontend/*` | `app/(frontend)/*` |
| `@payload/*` | `app/(payload)/*` |
| `@payload-config` | `app/(payload)/payload.config.ts` |
| `@sections/*` | `app/(frontend)/components/sections/*` |
| `@ui/*` | `app/(frontend)/components/ui/*` |
| `@utils/*` | `app/(frontend)/utils/*` |
| `@lib/*` | `app/(frontend)/utils/*` |

Use these aliases in imports, not relative paths.

## Architecture

Two Next.js route groups under `app/`:

- **`(frontend)/`** — Public portfolio: hero, about, projects, social, tech sections. Components in `components/sections/` and `components/ui/`.
- **`(payload)/`** — CMS backend: admin panel (`/admin`), REST/GraphQL API (`/api`), collections, globals, migrations. Config at `payload.config.ts`.

Shared root files: `robots.ts`, `sitemap.ts`, `favicon.ico`.

## Payload CMS

- **Collections**: `projects`, `tags`, `tech`, `media`, `users` (in `app/(payload)/collections/`)
- **Globals**: `about` (in `app/(payload)/globals/`)
- **Types**: Generated to `app/(payload)/payload-types.ts` — run `bun run generate:types` after schema changes
- **Migrations**: Versioned in `app/(payload)/migrations/`

## UI Stack

- **Styling**: Tailwind CSS 4 via PostCSS (`postcss.config.cjs`)
- **Components**: shadcn/ui (new-york style, zinc base) + Radix UI primitives
- **Animation**: Framer Motion / Motion, GSAP, Three.js (React Three Fiber + Drei)
- **Icons**: Lucide React, Iconify, Radix Icons
- **State**: React contexts (in `app/(frontend)/contexts/`)

## Tooling

- **Biome**: Installed but minimal config (CSS tailwind directives only)
- **ESLint**: `next/core-web-vitals` config in `.eslintrc.json`
- **Prettier**: With `prettier-plugin-tailwindcss` for class sorting
- **Package manager**: Bun preferred (also has `package-lock.json`)

## Gotchas

- `payload-types.ts` is generated — don't edit manually
- `next.config.ts` uses `withPayload()` wrapper — must keep it
- `public/media` is gitignored (Payload uploads go to Vercel Blob in prod)
- Three.js / R3F components are client-only — wrap with `"use client"` and dynamic imports
- Route groups `(frontend)` and `(payload)` don't affect URLs — they're organizational only
