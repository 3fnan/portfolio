# Portfolio strategy: positioning, structure and conversion

## 1. Positioning

**Audience, in priority order**
1. Recruiters and hiring managers at big tech and well-funded startups (AI/ML, backend, SWE roles)
2. Founders and small businesses who need something built (freelance)

**Positioning statement**
> AI/ML & backend engineer who turns models into production-ready products.

**Why it works for a fresher:** most new graduates show coursework. You can show production work:
- APIs and a policy engine for a real cybersecurity platform (TrueByte / CVETrack.ai)
- A live website for a paying client (Al Fan Al Aniq)
- AI products built end to end (ResumeIQ, Hummello)

So the site leads with **proof of shipping**, not with "fresher".

**Value proposition (About section)**
> Fresh graduate, already shipping: production APIs for a cybersecurity platform, a live site for a paying client, and AI products built end to end.

## 2. The visitor journey

| Step | Section | Job it does | Conversion path |
|---|---|---|---|
| 1. Hook (0–5 s) | Hero | Who you are, what you do, that you're available | "See case studies" / "Hire me" / Resume in nav |
| 2. Credibility | "Worked with" strip | Real company names | — |
| 3. Fit check | About + **Recruiter quick view** | The 6 facts a recruiter scans for: role, degree, stack, AI, location, status | Resume, LinkedIn |
| 4. Capability | What I do | 4 clear service areas mapped to job titles | — |
| 5. Proof | Selected work → **case studies** | Problem → approach → architecture → results | "Hire me" block at the end of every case study, then "Next case study" |
| 6. Trajectory | Experience | 3 internships + degree | — |
| 7. Reassurance | Why work with me | Hard numbers and certification | — |
| 8. Depth | Toolkit | Full stack at a glance | — |
| 9. Convert | Contact | Form with intent: Full-time / Internship / Freelance / Hi | Email, phone, resume, LinkedIn, GitHub |

The floating **"Hire Afnan"** button is visible everywhere after the hero, so a visitor can convert at any point.

## 3. Case study format (what big-tech interviewers look for)

Every project page follows the same structure, which mirrors a system-design / behavioural interview answer:
1. **Problem**: the user or business need, not the tech
2. **Approach**: 3–4 decisions you made and why
3. **Architecture**: an animated flow diagram
4. **Results**: numbers first, then highlights and stack
5. **What I learned**: shown only when you fill it in (`learnings` in `src/data/portfolio.ts`)

Projects are ordered by impact: CVETrack.ai (production backend) → ResumeIQ (AI product) → Hummello (deep learning) → Al Fan Al Aniq (client work) → LifeOS (in progress).

## 4. Your to-do list (highest impact first)

1. **Photo**: save your studio portrait as `public/profile.png` and set `photo: "/profile.png"`. The hero blends its white background into the orange.
2. **Screenshots**: add one per project in `public/projects/` and set each `image`. Real screenshots are the biggest credibility upgrade.
3. **Links**: add the real GitHub repo and live URL for each project (`github`, `live`).
4. **Learnings**: write 2–3 honest sentences per case study in your own voice. Interviewers will ask about these.
5. **Metrics**: if you have any (users, response times, test counts, accuracy), add them to `results`.
6. **Showcase image**: the bike photo or a workspace shot as `showcaseImage`.
7. **Deploy** on Vercel with a custom domain (e.g. `afnan.dev`), then put the link on your resume, LinkedIn and GitHub profile.
8. **Contact form**: switch from mailto to Formspree so messages arrive even when the visitor has no email app.

## 5. Getting noticed by big tech

- Pin ResumeIQ and the strongest repos on GitHub with good READMEs (architecture diagram + screenshots).
- Write one short technical post per case study (LinkedIn or a blog). The CVETrack recursive evaluator is a strong topic.
- Use the case study pages as talking points in interviews: they're already structured as problem → decisions → results.
