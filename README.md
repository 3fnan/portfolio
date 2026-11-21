# Afnan Abdul Rahiman — Portfolio

Personal portfolio built with **Next.js 15, React 19, TypeScript, Tailwind CSS v4 and Framer Motion**.

## Run it locally

Requires **Node.js 20+** (https://nodejs.org).

```bash
npm install
npm run dev
```

Open http://localhost:3000. The page reloads as you save files.

Production build: `npm run build` then `npm start`.

## Where to edit

| What | File |
|---|---|
| All text: bio, jobs, projects, skills, links | `src/data/portfolio.ts` |
| Colours (dark + light palettes) | `src/app/globals.css` (`:root` and `.dark`) |
| Fonts, page title, SEO | `src/app/layout.tsx` |
| Resume download | replace `public/resume.pdf` |
| Profile photo | add `public/profile.jpg`, set `photo: "/profile.jpg"` in `portfolio.ts` |
| Section order / remove a section | `src/app/page.tsx` |
| A section's layout | `src/components/<Section>.tsx` |

**Project links:** set `github` and `live` for each project in `portfolio.ts`
(the ones marked `"#"` are placeholders).

## Structure

```
src/
├── app/
│   ├── layout.tsx      fonts, theme provider, metadata
│   ├── page.tsx        assembles the sections
│   └── globals.css     colour tokens, animations
├── components/
│   ├── Navbar.tsx      sticky pill nav, theme toggle, mobile menu
│   ├── Hero.tsx        headline, CTAs, photo card, stats
│   ├── About.tsx       bento grid: summary, current role, education, certs, languages
│   ├── Experience.tsx  timeline
│   ├── Projects.tsx    project cards
│   ├── Skills.tsx      marquee + grouped skills
│   ├── Contact.tsx     contact card + form (opens email app)
│   ├── Footer.tsx
│   ├── Reveal.tsx      scroll-in animation wrapper
│   └── SectionHeading.tsx
└── data/
    └── portfolio.ts    ← your content
```

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
