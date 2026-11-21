# Afnan Abdul Rahiman — Portfolio

Personal portfolio built with **Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion and Lenis**.

## Run it locally

Requires **Node.js 20+** (https://nodejs.org).

```bash
npm install
npm run dev
```

Open http://localhost:3000. The page reloads as you save files.

Production build: `npm run build` then `npm start`.

## Where to edit

| What | Where |
|---|---|
| All text, projects, case studies, experience, skills | `src/data/portfolio.ts` |
| Hero photo | save as `public/profile.png`, set `photo: "/profile.png"` |
| Project screenshots | `public/projects/*.png`, set each project's `image` |
| Big scroll-zoom image | `public/showcase.jpg`, set `showcaseImage` |
| Colours (orange, paper, ink) | `src/app/globals.css` (`:root`) |
| Fonts, page title, SEO | `src/app/layout.tsx` |
| Section order | `src/app/page.tsx` |
| Case study page layout | `src/components/CaseStudy.tsx` |
| Resume download | replace `public/resume.pdf` |

Any `image` left empty shows generated orange artwork instead.

See **STRATEGY.md** for positioning, the visitor journey and a prioritized to-do list.

## Pages

- `/` home: hero, brands, about + recruiter quick view, services, work, experience, why me, showcase, toolkit, contact
- `/work/<slug>` one case study per project (generated from `projects` in `portfolio.ts`)

## Motion

Smooth scrolling (Lenis), letter and word blur-in headings, a hero that zooms and blurs as content slides over it,
parallax cards, count-up numbers, logo and toolkit marquees, a full-screen menu, a scroll progress bar and an
animated architecture diagram on case studies. Everything falls back to simple fades for reduced-motion users.

## Contact form

The form opens the visitor's email app with the message pre-filled, so it needs no backend.
To receive messages directly, create a free form at https://formspree.io and post to it in
`handleSubmit` inside `src/components/Contact.tsx`.

## Deploy (free)

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → **New Project** → import the repo → **Deploy**.
3. Each `git push` redeploys. Add a custom domain under Project → Settings → Domains.

## Roadmap ideas

- Add real screenshots to project cards (`public/projects/*.png`)
- Blog section with MDX
- Formspree/Resend contact form
- Vercel Analytics
