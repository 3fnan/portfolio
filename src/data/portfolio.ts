// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
//  Images: drop files into /public and set the matching `image` path.
//  Leave an `image` empty ("") to show the generated accent artwork.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Afnan Abdul Rahiman",
  firstName: "Afnan",
  brand: "3fnan",
  initials: "AA",
  role: "AI Developer",
  roleLong: "AI/ML & Python Developer",
  location: "From Kannur · Based in Calicut, India",
  // Short intro: who you are + what you're doing right now
  heroIntro: "AI/ML & backend engineer who turns models into production-ready products",
  valueProp:
    "I've just graduated, and I'm at the start of my career. So far that means three internships, a live website for a client, and AI projects I built end to end.",
  summary:
    "I graduated in 2026 with a B.E. in Computer Science (AI & ML). Through internships and projects I've worked with Python, FastAPI, Django, PostgreSQL and React, and explored deep learning, computer vision and generative AI. I'm open to opportunities where I can keep learning and contribute to a good team.",
  email: "afnanabdulrahiman.aa@gmail.com",
  phone: "+91 93834 66313",
  // WhatsApp number: country code + number, digits only (used for wa.me links)
  whatsapp: "919383466313",
  whatsappMessage: "Hi Afnan, I came across your portfolio and would like to connect.",
  resume: "/resume.pdf",
  // Your portrait. A PNG with the background removed looks best in the hero.
  // Save it as public/profile.png and set photo: "/profile.png".
  photo: "/me.WEBP" as string,
  // Wide lifestyle/workspace photo for the big scroll-to-zoom block, e.g. "/showcase.jpg"
  showcaseImage: "/ride.webp" as string,
  socials: {
    github: "https://github.com/3fnan",
    linkedin: "https://linkedin.com/in/afnanabdulrahiman",
  },
  lookingFor: "Open to new opportunities in AI/ML, Python backend and software development",
  availability: "Open to opportunities",
};

// "My story so far": told like a personal file (letter, record, on file)
export const storyFile = {
  stampImage: "/ride.webp", // small "stamp" photo next to the letter
  meta: [
    { k: "FILE", v: "N°01" },
    { k: "EST", v: "2022" },
    { k: "FROM", v: "KANNUR" },
    { k: "BASED", v: "CALICUT, IN" },
    { k: "STATUS", v: "OPEN" },
  ],
  greeting: "Hey, you found my file.",
  letter: [
    "I'm Afnan, a Computer Science (AI & ML) graduate from Kannur, Kerala, now based in Calicut. I started my degree at Sahyadri College in 2022 because I wanted to understand how machines learn. Lectures only took me so far, so I started building.",
    "My first real project, Hummello, turned humming into bansuri flute audio. Then came the internships: at TrueByte Innovation I worked on the backend of their product, CVETrack.ai; at Blend-ed I started a software engineering internship learning Python web development through Harvard's CS50 Web course; and now I'm doing research at XandY Learning. Somewhere in between, I built my first website for a client in the UAE.",
    "I've finished my degree, but I'm still early in my career, and I like it that way. I'm open to opportunities where I can keep learning, ask good questions and build useful things with a good team.",
  ],
  signOff: "Afnan",
  // words that light up in the accent colour as the letter plays
  highlights: ["Afnan", "Sahyadri", "Hummello", "bansuri", "CVETrack.ai", "TrueByte", "Blend-ed", "CS50", "XandY", "UAE", "learning"],
};

// Options in the contact form; the choice goes into the email subject
export const enquiryTypes = ["Job opportunity", "Project or collaboration", "Freelance work", "Just saying hi"];

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "What I do" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// "Worked with & certified by" strip: where I worked first, then education and certifications
export const brands = [
  "XandY Learning",
  "TrueByte Innovation",
  "Blend-ed",
  "Sahyadri College",
  "Harvard CS50",
  "Oracle",
  "Infosys Springboard",
];

export const stats = [
  {
    value: 15,
    suffix: "+",
    label: "APIs built",
    text: "CRUD APIs I worked on during my internship at TrueByte.",
  },
  {
    value: 3,
    suffix: "",
    label: "Internships",
    text: "At XandY Learning, TrueByte Innovation and Blend-ed, working on real codebases and learning from teams.",
  },
];

export type Service = {
  title: string;
  text: string;
  tags: string[];
  image: string;
  art: Art;
};

// Abstract shapes (services) + project illustrations (see ProjectIllustration.tsx)
export type Art = "ring" | "sphere" | "grid" | "wave" | "stack" | "policy" | "resume" | "flute" | "website" | "planner";

export const services: Service[] = [
  {
    title: "AI/ML & Deep Learning",
    text: "Training models for audio, images and text in academic and personal projects.",
    tags: ["PyTorch", "TensorFlow / Keras", "Computer Vision", "NLP", "scikit-learn"],
    image: "",
    art: "wave",
  },
  {
    title: "Backend Development",
    text: "Building REST APIs and database schemas in Python, the area I've worked in most.",
    tags: ["FastAPI", "Django / DRF", "PostgreSQL", "REST APIs", "Docker"],
    image: "",
    art: "stack",
  },
  {
    title: "Full-stack Web",
    text: "Building responsive websites and simple web apps with React and Next.js.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "",
    art: "grid",
  },
  {
    title: "Generative AI & LLM Apps",
    text: "Experimenting with LLM APIs in small projects, like a resume feedback tool.",
    tags: ["Gemini API", "LLM APIs", "Prompt design", "Oracle GenAI certified"],
    image: "",
    art: "sphere",
  },
];

export type CaseStep = { title: string; text: string };
export type Metric = { value: string; label: string };

export type Project = {
  slug: string; // URL: /work/<slug>
  title: string;
  category: string;
  year: string;
  tagline: string; // one-line value statement
  description: string; // card hover text
  role: string;
  timeline: string;
  context: string; // e.g. "Internship · TrueByte Innovation"
  stack: string[];
  github?: string;
  live?: string;
  image: string; // e.g. "/projects/resumeiq.png"
  art: Art;
  problem: string;
  approach: CaseStep[];
  architecture: string[]; // flow diagram, left → right
  results: Metric[];
  highlights: string[];
  // Your own reflections. Shown on the case study page only when filled in.
  learnings: string[];
};

// Ordered by impact: the first one is featured in the hero. My own projects come first;
// the TrueByte internship (work on their product, CVETrack.ai) is listed last.
// Everything here comes from the resume. Add real links, screenshots and learnings.
export const projects: Project[] = [
  {
    slug: "resumeiq-ai",
    title: "ResumeIQ AI",
    category: "AI",
    year: "2026",
    tagline: "A personal project that uses AI to give feedback on resumes.",
    description:
      "Next.js app that reads a PDF resume and uses Gemini to give an ATS-style score, missing skills and a job-match check.",
    role: "Solo personal project",
    timeline: "2026",
    context: "Personal project",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "pdf-parse", "Playwright"],
    github: "https://github.com/3fnan",
    live: "https://resume-ai-iq.vercel.app/",
    image: "/projects/resumeiq.webp",
    art: "resume",
    problem:
      "Job seekers rarely know why a resume gets filtered out. Generic feedback doesn't help; they need a score, the missing skills, and how well the resume matches a specific job description.",
    approach: [
      { title: "Read the PDF", text: "Used pdf-parse on the server to pull the text out of uploaded resumes." },
      { title: "Ask the AI", text: "Sent the text to Gemini 2.5 Flash for an ATS score, skill gaps and job-description matching, asking for JSON in a fixed format so the UI could display it reliably." },
      { title: "Show the results", text: "Built a dashboard with simple score charts and a printable report." },
      { title: "Test it", text: "Wrote a few Playwright tests for the main flows." },
    ],
    architecture: ["PDF upload", "pdf-parse (server)", "Gemini 2.5 Flash", "JSON response", "Dashboard & report"],
    results: [
      { value: "3", label: "Checks: ATS score, skill gap, job match" },
      { value: "E2E", label: "Main flows tested with Playwright" },
    ],
    highlights: [
      "Learned to get structured JSON out of an LLM",
      "Printable reports",
      "My first time writing end-to-end tests",
    ],
    learnings: [],
  },
  {
    slug: "hummello",
    title: "Hummello",
    category: "Deep Learning",
    year: "2025",
    tagline: "Hum a melody, hear it played back as a bansuri flute.",
    description:
      "College project that turns humming into bansuri-like audio using pitch features and a Transformer autoencoder.",
    role: "Academic project (B.E. Computer Science)",
    timeline: "2025",
    context: "Academic project",
    stack: ["Python", "TensorFlow", "Keras", "Librosa", "pyWORLD", "Streamlit"],
    image: "/projects/hummello.webp",
    art: "flute",
    problem:
      "Most people can hum a tune but can't play an instrument. Turning untrained humming into expressive instrument audio needs accurate pitch tracking and a model that maps voice features to instrument timbre.",
    approach: [
      { title: "Extract the melody", text: "Implemented F0 and energy-envelope extraction with WORLD DIO + StoneMask." },
      { title: "Learn the timbre", text: "Trained a Transformer autoencoder on bansuri audio, then learned a feature-to-latent mapping from humming features." },
      { title: "Make it usable", text: "Built a Streamlit interface for uploading humming, viewing mel-spectrograms and comparing input and generated audio." },
    ],
    architecture: ["Humming upload", "DSP: F0 + energy", "Feature → latent map", "Transformer decoder", "Bansuri audio"],
    results: [
      { value: "434.2 Hz", label: "Mean extracted pitch" },
      { value: "437.6 Hz", label: "Reference pitch" },
      { value: "99.2%", label: "Pitch match on our test audio" },
    ],
    highlights: [
      "Combined audio processing with deep learning",
      "Mel-spectrogram comparison in the UI",
    ],
    learnings: [],
  },
  {
    slug: "al-fan-al-aniq",
    title: "Al Fan Al Aniq",
    category: "Client Web",
    year: "2026",
    tagline: "A website I built for a technical services company in the UAE.",
    description:
      "Responsive company website with reusable sections, put live on the client's own domain.",
    role: "Freelance web developer",
    timeline: "2026",
    context: "Client project · UAE",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    live: "https://www.alfanalaniq.ae",
    image: "/projects/alfan.webp",
    art: "website",
    problem:
      "A technical services company needed a simple website to show its services, projects and clients, one that would be easy to update later.",
    approach: [
      { title: "Plan the pages", text: "Made reusable sections for services, projects, clients and company info." },
      { title: "Keep it easy to edit", text: "Kept the content in data files so text can change without touching the layout." },
      { title: "Put it online", text: "Set up hosting and connected the client's domain." },
    ],
    architecture: ["Content data", "Reusable sections", "Next.js build", "Hosting", "Custom domain"],
    results: [
      { value: "Live", label: "Website online for the client" },
      { value: "Responsive", label: "Works on phone and desktop" },
    ],
    highlights: ["Worked with a real client on their requirements", "Reusable, data-driven sections"],
    learnings: [],
  },
  {
    slug: "lifeos",
    title: "LifeOS",
    category: "Django",
    year: "2026",
    tagline: "One place for long-term goals, daily tasks and schedules.",
    description:
      "A Django app I'm building for my own goals, tasks, reminders and schedules. Still a work in progress.",
    role: "Solo developer",
    timeline: "2026 · in progress",
    context: "Personal project",
    stack: ["Python", "Django", "PostgreSQL", "SQLite", "JavaScript"],
    github: "https://github.com/3fnan",
    image: "/projects/lifeos.webp",
    art: "planner",
    problem:
      "Goals, tasks, reminders and learning usually live in separate apps, so long-term goals lose touch with what gets done each day.",
    approach: [
      { title: "Model the domain", text: "Designing goals, tasks, schedules and reminders as connected, database-backed workflows." },
      { title: "Secure it", text: "Implementing user authentication and per-user data." },
      { title: "Make it daily-usable", text: "Building responsive web interfaces for quick, everyday use." },
    ],
    architecture: ["User", "Django views & auth", "Goal / task models", "PostgreSQL", "Responsive UI"],
    results: [
      { value: "WIP", label: "Still building" },
      { value: "4", label: "Core modules: goals, tasks, reminders, schedule" },
    ],
    highlights: ["Django ORM relationships", "Auth and scheduling"],
    learnings: [],
  },
  {
    slug: "cvetrack-policy-engine",
    title: "TrueByte Internship",
    category: "Internship",
    year: "2026",
    tagline: "My internship work on CVETrack.ai, TrueByte Innovation's cybersecurity product.",
    description:
      "As an intern at TrueByte Innovation LLP, I worked on the policy engine of their product CVETrack.ai: nested AND/OR rules, a PostgreSQL schema, CRUD APIs and parts of the React UI.",
    role: "Software engineer intern (mostly backend). CVETrack.ai is TrueByte's product; I contributed to it.",
    timeline: "Jan – Apr 2026 · 4 months",
    context: "Internship · TrueByte Innovation LLP",
    stack: ["FastAPI", "PostgreSQL", "React", "TypeScript", "REST"],
    image: "",
    art: "policy",
    problem:
      "CVETrack.ai is a cybersecurity product built by TrueByte Innovation LLP. Its users need to write rules like “block packages with a critical CVE AND (license is GPL OR maintainer unknown)” and see why a policy passed or failed. During my internship I worked on the policy engine that makes this possible.",
    approach: [
      { title: "Model nested logic", text: "Helped build policies as trees of rule groups joined by AND/OR, evaluated recursively so groups can nest to any depth." },
      { title: "Design the schema", text: "Designed the 5-table PostgreSQL schema for the policy engine: policies, rule groups, rules, conditions and evaluation history." },
      { title: "Build the APIs", text: "Wrote 15+ CRUD APIs for CVETrack.ai's Package, License and Vulnerability services, with pagination, role-based access and error handling." },
      { title: "Connect the UI", text: "Worked on a React/TypeScript screen for creating rule groups and viewing evaluation history." },
    ],
    architecture: ["React policy UI", "FastAPI services", "Recursive evaluator", "PostgreSQL (5 tables)", "Evaluation history"],
    results: [
      { value: "15+", label: "APIs I worked on" },
      { value: "5", label: "Database tables" },
      { value: "AND/OR", label: "Nested rule groups" },
    ],
    highlights: [
      "First time working on recursive logic in a real codebase",
      "Learned role-based access control and pagination",
      "Worked across both backend and frontend",
    ],
    learnings: [],
  },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Research Intern",
    company: "XandY Learning",
    location: "Calicut",
    period: "Oct 2026 – Present",
    current: true,
    summary: "App development and research for Find My Path (findmypath.ai), a student career assessment platform.",
    points: [
      "Testing and validating assessments so career and stream recommendations match responses.",
      "Founder's Office EdTech research on learning approaches and market trends.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "TrueByte Innovation",
    location: "Bengaluru",
    period: "Jan 2026 – Apr 2026",
    summary: "Interned on the backend team of CVETrack.ai, TrueByte's own cybersecurity product.",
    points: [
      "Helped build a rule engine with nested AND/OR conditions.",
      "Designed a PostgreSQL schema and wrote CRUD APIs with role-based access.",
      "Worked on parts of the React/TypeScript UI.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Blend-ed",
    location: "Cyber Park, Calicut",
    period: "Aug 2026 – Sep 2026",
    summary:
      "Software engineering internship focused on learning Python web development through Harvard's CS50 Web course. It was my first hands-on step into Django, and where I learned to build web backends properly.",
    points: [
      "Worked through Django models, authentication, forms, routing, CRUD, pagination and migrations.",
      "Course projects: a social network, an auction platform and an encyclopedia app.",
    ],
  },
];

export const education = {
  degree: "B.E. Computer Science — AI & Machine Learning",
  school: "Sahyadri College of Engineering and Management",
  location: "Mangalore, Karnataka",
  period: "2022 – 2026",
};

// The first one is featured on its own card; the rest are listed under it
export const certifications: { name: string; issuer: string; year: string; url?: string }[] = [
  {
    name: "CS50's Web Programming with Python and JavaScript",
    issuer: "Harvard University (CS50)",
    year: "2026",
    url: "https://cs50.harvard.edu/certificates/68a4dd98-cd25-4f04-9791-5be6df6816b1",
  },
  { name: "OCI 2025 Certified Generative AI Professional", issuer: "Oracle University", year: "2025" },
  { name: "Applied Deep Learning with Keras", issuer: "Infosys Springboard", year: "2025" },
];

// "A few highlights" bento
export const highlights = {
  apis: { value: 15, suffix: "+", label: "APIs", text: "Written during my internship at TrueByte." },
  accuracy: {
    value: 99.2,
    suffix: "%",
    label: "Pitch match",
    text: "From my Hummello college project: 434.2 Hz average pitch vs a 437.6 Hz reference.",
  },
  schema: { value: 5, suffix: "", label: "DB tables", text: "The PostgreSQL schema I designed for the policy engine in CVETrack.ai, during my TrueByte internship." },
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "SQL", "C/C++", "Java"] },
  { group: "Backend", items: ["FastAPI", "Django", "DRF", "REST APIs", "Docker"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { group: "AI / ML", items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "OpenCV"] },
  { group: "GenAI", items: ["LLM APIs", "Gemini", "NLP", "Prompt design"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"] },
  { group: "Tools", items: ["Git", "Postman", "Jupyter", "Linux", "Colab"] },
];

export const languages = [
  { name: "Malayalam", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
  { name: "Arabic", level: "Conversational" },
];
