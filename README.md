````md
# Lara Cunha — Website + Back Office (Sanity)

A minimalist one-page website built with a refined visual identity, strong typography, and subtle animations.

This project is structured to be:

- Easy to update via a custom back office
- Scalable and ready to evolve into a digital product store
- Performance-focused
- Technically solid
- Design-driven and brand-oriented

---

# Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS
- (Planned) Framer Motion for animations

## Back Office / CMS
- Sanity Studio
- Dataset: `production`
- Custom schemas:
  - `service`
  - `project`
  - `faq`
  - `siteSettings`

---

# Project Structure

- `lara-site/` → Next.js frontend
- `lara-site/cms/cms/` → Sanity Studio (back office)

Note: The `cms/cms` structure was created during setup and is fully functional.

---

# Prerequisites

- Node.js (recommended v20)
- pnpm
- Git

Check versions:

```bash
node -v
pnpm -v
git --version
````

---

# What Has Been Built (Step by Step)

## 1. Created the Next.js Website

```bash
pnpm create next-app@latest lara-site
cd lara-site
pnpm dev
```

Frontend runs at:

[http://localhost:3000](http://localhost:3000)

Configured with:

* TypeScript
* ESLint
* Tailwind
* App Router

---

## 2. Created the Sanity Back Office

Inside the project:

```bash
mkdir cms
cd cms
pnpm create sanity@latest
```

During setup:

* Logged in (Google / GitHub)
* Created a new organization
* Selected default dataset (`production`)
* Used “Clean project” template
* Enabled TypeScript

Sanity Studio was created at:

`lara-site/cms/cms`

---

## 3. Resolved the “sanity: command not found” Issue

The issue was caused by missing `node_modules` in the Studio directory due to workspace configuration.

After correctly installing dependencies and adjusting the workspace, the Studio runs successfully.

Sanity Studio now runs at:

[http://localhost:3333](http://localhost:3333)

---

## 4. Created Custom Schemas

Inside:

`lara-site/cms/cms/schemaTypes/`

Created:

* `service.ts`
* `project.ts`
* `faq.ts`
* `siteSettings.ts`

Registered them in:

`schemaTypes/index.ts`

Example:

```ts
export const schemaTypes = [
  service,
  project,
  faq,
  siteSettings,
]
```

Without registering schemas, they do not appear in the Studio UI.

---

# Running the Project Locally

## Frontend (Next.js)

```bash
cd lara-site
pnpm dev
```

Open:

[http://localhost:3000](http://localhost:3000)

---

## Back Office (Sanity Studio)

```bash
cd lara-site/cms/cms
pnpm dev
```

Open:

[http://localhost:3333](http://localhost:3333)

---

# Next Development Steps

## A) Populate the CMS

Inside the Studio:

Create:

### Services

* One Page Website
* Multi-page Website
* Simple Online Store
* Large Online Store

### Projects

Add 2–3 portfolio examples with:

* Title
* Description
* Image
* Tags

### FAQ

Add 4–6 frequently asked questions.

### Site Settings

Create a single document containing:

* Hero headline
* Subheadline
* CTA text
* Social links

---

## B) Connect Next.js to Sanity

Install dependencies:

```bash
cd lara-site
pnpm add next-sanity @sanity/image-url
```

Create `.env.local` in the frontend root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-01-01"
```

Create:

* `lib/sanity/client.ts`
* `lib/sanity/queries.ts`

Planned queries:

* getServices()
* getProjects()
* getFaqs()
* getSiteSettings()

---

## C) Build Homepage Sections

Recommended structure:

* components/sections/Hero.tsx
* components/sections/About.tsx
* components/sections/Services.tsx
* components/sections/Process.tsx
* components/sections/Portfolio.tsx
* components/sections/Faq.tsx
* components/sections/Contact.tsx
* components/layout/Header.tsx
* components/layout/Footer.tsx

Compose everything in:

`app/page.tsx`

---

## D) Contact Form

Two approaches:

### Simple

* Formspree or Basin

### Professional

* Next.js API route + Resend (recommended)

---

## E) Animations (After Content Integration)

Once CMS content renders correctly:

* Install Framer Motion
* Add subtle scroll reveals
* Add refined micro-interactions
* Keep animations intentional and minimal

---

# Future Expansion Plan

This architecture allows:

* Easy content updates via CMS
* Adding new services or projects without code changes
* Expanding into a digital product store (via Stripe)
* Potential user accounts and protected downloads
* Long-term scalability

Sanity = Content management
Next.js = Presentation & performance
Stripe (future) = Digital product sales

---

# Vision

This project is designed as:

* A refined, minimal, brand-driven website
* Built with strong engineering foundations
* Easy to evolve into a more complex product ecosystem
* Performance-first and scalable

The goal is not just a portfolio —

but a structured, scalable digital foundation.

```
```
