<div align="center">

  <img src=".github/logo.svg" alt="Erik Gabriel" width="100" />

  <h1>Personal Website</h1>

  <p>
    <h3>erikgabriel.vercel.app</h3>
  </p>

  <p>
    Personal website and developer portfolio built with
    <strong>Next.js</strong>, <strong>Payload CMS</strong> and <strong>Vercel</strong>.
  </p>

  <p>
    <a href="https://github.com/EriikGabriel/portfolio">
      <img src="https://img.shields.io/github/stars/EriikGabriel/portfolio?style=for-the-badge&logo=github&logoColor=white&color=f55a00&label=Stars" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/EriikGabriel/portfolio/forks">
      <img src="https://img.shields.io/github/forks/EriikGabriel/portfolio?style=for-the-badge&logo=github&logoColor=white&color=f55a00&label=Forks" alt="GitHub Forks" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-f55a00?style=for-the-badge" alt="MIT License" />
    </a>
    <a href="https://vercel.com/eriikgabriel/portfolio">
      <img src="https://img.shields.io/github/deployments/EriikGabriel/portfolio/production?label=Vercel&style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployment" />
    </a>
  </p>

  <p>
    <a href="https://erikgabriel.vercel.app">Live Website</a>
    ·
    <a href="https://github.com/EriikGabriel/portfolio">Repository</a>
  </p>

</div>

---

## About

This repository contains my personal website and developer portfolio.

The project is built as a full-stack application using the **Next.js App Router** and **Payload CMS**, combining the public website, content management system, API, database layer and administrative interface into a single application.

The website focuses on an interactive and animated experience while keeping the underlying architecture modular and maintainable.

**Live:** https://erikgabriel.vercel.app

---

## Architecture

The application is organized around two main areas inside the Next.js App Router:

```text
                                ┌─────────────────────┐
                                │       Next.js       │
                                │      App Router     │
                                └──────────┬──────────┘
                                           │
                     ┌─────────────────────┴─────────────────────┐
                     │                                           │
                     ▼                                           ▼
             ┌────────────────┐                         ┌────────────────┐
             │    Frontend    │                         │  Payload CMS   │
             │                │◄───────────────────────►│                │
             │ Hero           │                         │ Admin          │
             │ About          │                         │ API            │
             │ Projects       │                         │ Collections    │
             │ Social         │                         │ Globals        │
             │ Technologies   │                         │ Access Control │
             └────────────────┘                         │ Migrations     │
                                                        └───────┬────────┘
                                                                │
                                             ┌──────────────────┼──────────────────┐
                                             ▼                  ▼                  ▼
                                       PostgreSQL             Media            Migrations
```

### Frontend

The `(frontend)` route group contains the public portfolio.

It is responsible for:

* Page composition
* Navigation
* Hero section
* About section
* Projects
* Technologies
* Social media
* Animations and transitions
* Interactive UI components
* Loading and page transitions

```text
app/(frontend)/
├── components/
│   ├── sections/
│   │   ├── about/
│   │   ├── hero/
│   │   ├── projects/
│   │   ├── social/
│   │   └── techs/
│   │
│   ├── ui/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── logo.tsx
│   └── splash-screen.tsx
│
├── contexts/
├── utils/
├── styles/
├── globals.css
├── layout.tsx
└── page.tsx
```

### Payload CMS

The `(payload)` route group contains the backend and content management layer.

Payload is integrated directly into the Next.js application and provides the admin interface, API, access control, collections, globals and database migrations.

```text
app/(payload)/
├── access/
├── admin/
├── api/
├── collections/
├── globals/
├── migrations/
├── layout.tsx
├── payload.config.ts
└── payload-types.ts
```

This architecture allows the portfolio content to be managed dynamically without requiring a separate backend application.

---

## Content Model

Portfolio content is managed through Payload collections and globals.

### Collections

```text
collections/
├── media.ts
├── projects.ts
├── tags.ts
├── tech.ts
└── users.ts
```

| Collection | Purpose                                              |
| ---------- | ---------------------------------------------------- |
| `projects` | Stores projects displayed on the portfolio           |
| `tags`     | Categorizes projects and provides filtering          |
| `tech`     | Stores technologies displayed throughout the website |
| `media`    | Handles uploaded assets used by the CMS and website  |
| `users`    | Handles Payload users and CMS authentication         |

Projects can be associated with both technologies and tags, allowing the frontend to build a dynamic and filterable projects section.

### Globals

```text
globals/
└── about.ts
```

The `about` global stores content that is not tied to a specific collection item, such as the main personal/about section.

---

## Frontend

The frontend is divided into reusable sections and UI primitives.

```text
components/sections/
├── about/
├── hero/
├── projects/
├── social/
└── techs/
```

The Projects section is the most modular part of the application:

```text
projects/
├── index.tsx
├── project-card.tsx
├── project-dropdown.tsx
├── project-filters.tsx
├── project-form.tsx
├── project-grid.tsx
└── project-tags.tsx
```

This separation keeps project rendering, filtering, forms, tags and layout independent and easier to maintain.

---

## UI System

Reusable visual components are located under:

```text
app/(frontend)/components/ui/
```

The UI layer is intentionally separated from page sections so that components can be reused throughout the application without coupling them to a specific page.

---

## State & Transitions

Application-level interaction state is handled through React contexts:

```text
components/contexts/
├── loading.tsx
└── projects-transition.tsx
```

These contexts coordinate global loading behavior and transitions related to the projects experience.

The project also includes dedicated components for the initial visual experience:

```text
main-content-gate.tsx
splash-screen.tsx
motion.tsx
```

---

## Technologies

### Framework & Language

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

### Backend & CMS

<p>
  <img src="https://img.shields.io/badge/Payload_CMS-000000?style=for-the-badge&logo=payloadcms&logoColor=white" alt="Payload CMS" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL" />
  <img src="https://img.shields.io/badge/REST_API-000000?style=for-the-badge&logo=fastapi&logoColor=white" alt="REST API" />
  <img src="https://img.shields.io/badge/Lexical-000000?style=for-the-badge" alt="Lexical" />
</p>

### Styling & UI

<p>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white" alt="Radix UI" />
  <img src="https://img.shields.io/badge/Tailwind_Variants-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind Variants" />
  <img src="https://img.shields.io/badge/Tailwind_Merge-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind Merge" />
  <img src="https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React" />
</p>

### Animation & Graphics

<p>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=motion&logoColor=white" alt="Motion" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=111111" alt="GSAP" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/React_Three_Fiber-000000?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Three Fiber" />
  <img src="https://img.shields.io/badge/React_Three_Drei-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="React Three Drei" />
  <img src="https://img.shields.io/badge/OGL-000000?style=for-the-badge" alt="OGL" />
  <img src="https://img.shields.io/badge/tsParticles-000000?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="tsParticles" />
  <img src="https://img.shields.io/badge/Simplex_Noise-000000?style=for-the-badge" alt="Simplex Noise" />
  <img src="https://img.shields.io/badge/maath-000000?style=for-the-badge" alt="maath" />
  <img src="https://img.shields.io/badge/Rough_Notation-000000?style=for-the-badge" alt="Rough Notation" />
</p>

### Developer Experience

<p>
  <img src="https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white" alt="Biome" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=111111" alt="Prettier" />
  <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white" alt="PostCSS" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
</p>

---

## Project Structure

```text
portfolio/
├── app/
│   ├── (frontend)/
│   │   ├── components/
│   │   │   ├── sections/
│   │   │   └── ui/
│   │   ├── contexts/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── (payload)/
│   │   ├── access/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── collections/
│   │   ├── globals/
│   │   ├── migrations/
│   │   ├── payload.config.ts
│   │   └── payload-types.ts
│   │
│   ├── robots.ts
│   └── sitemap.ts
│
├── public/
│   ├── assets/
│   └── icons/
│
├── biome.json
├── components.json
├── luxe.json
├── next.config.ts
├── package.json
├── postcss.config.cjs
├── tsconfig.json
└── README.md
```

---

## SEO

SEO and crawler configuration are handled natively through Next.js.

```text
app/
├── robots.ts
└── sitemap.ts
```

### Robots

`robots.ts` generates the application's `robots.txt` configuration and controls which routes can be crawled by search engines.

### Sitemap

`sitemap.ts` dynamically generates the application's sitemap.

There is no manually maintained `sitemap.xml` file in the repository. Next.js generates the XML endpoint from the `sitemap.ts` configuration.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/EriikGabriel/portfolio.git
cd portfolio
```

### 2. Install dependencies

Using Bun:

```bash
bun install
```

Or using npm:

```bash
npm install
```

### 3. Configure environment variables

Create an environment file with the variables required by the application.

The project requires the appropriate configuration for Payload CMS and the database environment.

> Never commit production credentials or secrets to the repository.

### 4. Start the development server

Using Bun:

```bash
bun dev
```

Or using npm:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Development

The main development workflow is centered around Next.js.

```bash
bun dev
```

The Payload CMS admin panel is available at:

```text
/admin
```

The Payload API is exposed through:

```text
/api
```

---

## Database Migrations

Database migrations are versioned inside:

```text
app/(payload)/migrations/
```

Each migration contains the required changes to keep the database schema synchronized with the Payload configuration.

This allows database changes to be tracked and reproduced across environments.

---

## Generated Types

Payload generates TypeScript definitions based on the configured collections and globals.

The generated types are stored in:

```text
app/(payload)/payload-types.ts
```

These types provide type safety between the CMS configuration and the application consuming its data.

---

## Deployment

The project is deployed on Vercel.

**Production:**

https://erikgabriel.vercel.app

The architecture is designed to run the Next.js application and Payload CMS together while connecting the application to its configured database and storage services.

---

## Forking

You're welcome to use this project as a reference or starting point for your own website.

If you fork or reuse substantial parts of the project, please provide proper attribution by linking back to:

**https://erikgabriel.vercel.app**

or mentioning the original repository:

**https://github.com/EriikGabriel/portfolio**

Please don't present the original design or implementation as your own work.

---

## License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) for details.

---

<div align="center">

Developed by **Erik Gabriel**

</div>
