// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
//  Images: drop files into /public and set the matching `image` path.
//  Leave an `image` empty ("") to show the generated orange artwork.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Afnan Abdul Rahiman",
  firstName: "Afnan",
  brand: "Afnan",
  initials: "AA",
  role: "AI/ML Engineer",
  roleLong: "AI/ML & Python Backend Engineer",
  location: "Calicut, Kerala, India",
  // Unique value proposition: what you do + proof + who it's for
  heroIntro: "AI/ML & backend engineer who turns models into production-ready products",
  valueProp:
    "Fresh graduate, already shipping: production APIs for a cybersecurity platform, a live site for a paying client, and AI products built end to end.",
  summary:
    "B.E. Computer Science graduate specializing in AI/ML, with hands-on experience in Python backend, REST APIs and full-stack development. I've built production systems with FastAPI, PostgreSQL, React and Django, and worked on deep learning, computer vision and Generative AI.",
  email: "afnanabdulrahiman.aa@gmail.com",
  phone: "+91 93834 66313",
  resume: "/resume.pdf",
  // Your portrait. A PNG with the background removed looks best in the hero.
  // Save it as public/profile.png and set photo: "/profile.png".
  photo: "" as string,
  // Wide lifestyle/workspace photo for the big scroll-to-zoom block, e.g. "/showcase.jpg"
  showcaseImage: "" as string,
  socials: {
    github: "https://github.com/3fnan",
    linkedin: "https://linkedin.com/in/afnanabdulrahiman",
  },
  lookingFor: "Open to AI/ML, Python backend & software engineering roles",
  availability: "Available now · Full-time & freelance",
};

// "Recruiter quick view": the facts a hiring manager scans for in 10 seconds
export const quickFacts = [
  { label: "Roles", value: "AI/ML Engineer · Backend Engineer · SWE" },
  { label: "Degree", value: "B.E. CSE (AI & ML), 2026" },
  { label: "Core stack", value: "Python · FastAPI · Django · PostgreSQL · React" },
  { label: "AI", value: "PyTorch · TensorFlow · LLM APIs · Oracle GenAI certified" },
  { label: "Based in", value: "Calicut, Kerala, India" },
  { label: "Status", value: "Available now" },
];

// Options in the contact form; the choice goes into the email subject
export const enquiryTypes = ["Full-time role", "Internship", "Freelance project", "Just saying hi"];

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// "Worked with & certified by" logo strip
export const brands = [
  "XandY Learning",
  "TrueByte Innovation",
  "Blend-ed",
  "Oracle",
  "Infosys Springboard",
  "Sahyadri College",
];

export const stats = [
  {
    value: 15,
    suffix: "+",
    label: "REST APIs shipped",
    text: "Production CRUD APIs with pagination, RBAC and error handling.",
  },
  {
    value: 3,
    suffix: "",
    label: "Internships",
    text: "Backend, full-stack and research roles across EdTech and cybersecurity.",
  },
];

export type Service = {
  title: string;
  text: string;
  tags: string[];
  image: string;
  art: Art;
};

export type Art = "ring" | "sphere" | "grid" | "wave" | "stack";

export const services: Service[] = [
  {
    title: "AI/ML & Deep Learning",
    text: "Training and shipping models for audio, vision and language, from data pipeline to demo.",
    tags: ["PyTorch", "TensorFlow / Keras", "Computer Vision", "NLP", "scikit-learn"],
    image: "",
    art: "wave",
  },
  {
    title: "Backend Engineering",
    text: "Clean, well-modelled APIs and databases that hold up in production.",
    tags: ["FastAPI", "Django / DRF", "PostgreSQL", "REST APIs", "Docker"],
    image: "",
    art: "stack",
  },
  {
    title: "Full-stack Web",
    text: "Responsive, typed web apps and sites, deployed on custom domains.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "",
    art: "grid",
  },
  {
    title: "Generative AI & LLM Apps",
    text: "LLM-powered features with structured outputs, from resume analysis to assistants.",
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

// Ordered by impact: the first one is featured in the hero.
// Everything here comes from the resume. Add real links, screenshots and learnings.
export const projects: Project[] = [
  {
    slug: "cvetrack-policy-engine",
    title: "CVETrack.ai",
    category: "Backend",
    year: "2026",
    tagline: "A recursive policy engine for an AI-powered cybersecurity platform.",
    description:
      "Rule-based policy engine with nested AND/OR groups, a normalized PostgreSQL schema and 15+ REST APIs, wired to a React UI.",
    role: "Backend engineer (full-stack internship)",
    timeline: "Jan – Apr 2026 · 4 months",
    context: "Internship · TrueByte Innovation LLP",
    stack: ["FastAPI", "PostgreSQL", "React", "TypeScript", "REST"],
    image: "",
    art: "stack",
    problem:
      "Security teams need to express rules like “block packages with a critical CVE AND (license is GPL OR maintainer unknown)”, then see why a policy passed or failed. Flat rule lists can't express nested logic, and results have to stay consistent as policies change.",
    approach: [
      { title: "Model nested logic", text: "Designed policies as trees of rule groups joined by AND/OR, evaluated recursively so groups can nest to any depth." },
      { title: "Design the schema", text: "Architected a 5-table normalized PostgreSQL schema for policies, rule groups, rules, conditions and evaluation history, keeping data integrity across policy operations." },
      { title: "Ship the APIs", text: "Built 15+ RESTful CRUD APIs for Package, License and Vulnerability services with pagination, role-based access control and error handling." },
      { title: "Close the loop in the UI", text: "Developed a React/TypeScript policy UI for creating rule groups, browsing evaluation history and handling API errors." },
    ],
    architecture: ["React policy UI", "FastAPI services", "Recursive evaluator", "PostgreSQL (5 tables)", "Evaluation history"],
    results: [
      { value: "15+", label: "REST APIs shipped" },
      { value: "5", label: "Normalized tables" },
      { value: "AND/OR", label: "Nested rule groups, evaluated recursively" },
    ],
    highlights: [
      "Recursive group evaluation for arbitrarily nested AND/OR expressions",
      "Role-based access control and pagination across services",
      "UI–backend synchronization with consistent error handling",
    ],
    learnings: [],
  },
  {
    slug: "resumeiq-ai",
    title: "ResumeIQ AI",
    category: "AI",
    year: "2026",
    tagline: "AI resume analysis with ATS scoring, skill gaps and job matching.",
    description:
      "Full-stack AI platform: server-side PDF pipeline with Gemini 2.5 Flash, typed JSON contracts and Playwright-tested dashboards.",
    role: "Solo: design, build and test",
    timeline: "2026",
    context: "Personal project",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "pdf-parse", "Playwright"],
    github: "https://github.com/3fnan",
    live: "",
    image: "",
    art: "ring",
    problem:
      "Job seekers rarely know why a resume gets filtered out. Generic feedback doesn't help; they need a score, the missing skills, and how well the resume matches a specific job description.",
    approach: [
      { title: "Parse on the server", text: "Engineered a server-side PDF pipeline with pdf-parse so uploads are processed securely and consistently." },
      { title: "Structure the AI output", text: "Used Gemini 2.5 Flash for ATS scoring, skill-gap analysis and JD matching, constrained by typed JSON contracts so the UI never receives malformed data." },
      { title: "Make it readable", text: "Built an interactive dashboard with score visualizations and print-optimized reports." },
      { title: "Test end to end", text: "Covered the critical flows with Playwright end-to-end tests." },
    ],
    architecture: ["PDF upload", "pdf-parse (server)", "Gemini 2.5 Flash", "Typed JSON contract", "Dashboard & report"],
    results: [
      { value: "3", label: "Analyses: ATS, skill gap, JD match" },
      { value: "E2E", label: "Playwright-tested flows" },
      { value: "Typed", label: "JSON contracts for every AI response" },
    ],
    highlights: [
      "Typed contracts between the LLM and the UI",
      "Print-optimized reports",
      "End-to-end tests with Playwright",
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
      "Deep learning pipeline turning raw humming into bansuri-like audio with DSP features and a Transformer autoencoder.",
    role: "ML engineer",
    timeline: "2025",
    context: "Academic project",
    stack: ["Python", "TensorFlow", "Keras", "Librosa", "pyWORLD", "Streamlit"],
    image: "",
    art: "wave",
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
      { value: "99.2%", label: "Pitch agreement" },
    ],
    highlights: [
      "End-to-end DSP + deep learning pipeline",
      "Mel-spectrogram comparison in the UI",
    ],
    learnings: [],
  },
  {
    slug: "al-fan-al-aniq",
    title: "Al Fan Al Aniq",
    category: "Client Web",
    year: "2026",
    tagline: "A complete, live corporate website for a UAE technical services firm.",
    description:
      "Responsive corporate site with reusable, data-driven sections, deployed on the client's custom domain.",
    role: "Freelance developer: design to deployment",
    timeline: "2026",
    context: "Client project · UAE",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    live: "",
    image: "",
    art: "grid",
    problem:
      "A growing technical services company needed a credible web presence to show its services, projects and clients, and a site its team could keep updated.",
    approach: [
      { title: "Design around content", text: "Built reusable sections for services, projects, clients and company info." },
      { title: "Keep it editable", text: "Drove every section from data so content changes don't require layout work." },
      { title: "Ship to production", text: "Configured the custom domain and production hosting, delivering a complete live website." },
    ],
    architecture: ["Content data", "Reusable sections", "Next.js build", "Production hosting", "Custom domain"],
    results: [
      { value: "Live", label: "Delivered to a real client" },
      { value: "Responsive", label: "Every section, every screen size" },
      { value: "1", label: "Custom-domain deployment" },
    ],
    highlights: ["Real client, real deadline", "Data-driven, reusable sections"],
    learnings: [],
  },
  {
    slug: "lifeos",
    title: "LifeOS",
    category: "Django",
    year: "2026",
    tagline: "One place for long-term goals, daily tasks and schedules.",
    description:
      "Django productivity platform for goals, tasks, reminders, schedules and learning. In active development.",
    role: "Solo developer",
    timeline: "2026 · in progress",
    context: "Personal project",
    stack: ["Python", "Django", "PostgreSQL", "SQLite", "JavaScript"],
    github: "https://github.com/3fnan",
    image: "",
    art: "sphere",
    problem:
      "Goals, tasks, reminders and learning usually live in separate apps, so long-term goals lose touch with what gets done each day.",
    approach: [
      { title: "Model the domain", text: "Designing goals, tasks, schedules and reminders as connected, database-backed workflows." },
      { title: "Secure it", text: "Implementing user authentication and per-user data." },
      { title: "Make it daily-usable", text: "Building responsive web interfaces for quick, everyday use." },
    ],
    architecture: ["User", "Django views & auth", "Goal / task models", "PostgreSQL", "Responsive UI"],
    results: [
      { value: "WIP", label: "Actively developing" },
      { value: "4", label: "Core modules: goals, tasks, reminders, schedule" },
    ],
    highlights: ["Django ORM relationships", "Auth and scheduling"],
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
    summary: "Built the backend for CVETrack.ai, an AI-powered cybersecurity intelligence platform.",
    points: [
      "Rule-based policy engine with nested AND/OR expressions and recursive evaluation.",
      "5-table normalized PostgreSQL schema and 15+ RESTful CRUD APIs with RBAC.",
      "React/TypeScript policy UI with evaluation history.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Blend-ed",
    location: "Cyber Park, Calicut",
    period: "Aug 2026 – Sep 2026",
    summary: "Structured Python web development training through CS50 Web.",
    points: [
      "Django apps covering models, auth, forms, routing, CRUD, pagination and migrations.",
      "Built a social network, an auction platform and an encyclopedia app.",
    ],
  },
];

export const education = {
  degree: "B.E. Computer Science — AI & Machine Learning",
  school: "Sahyadri College of Engineering and Management",
  location: "Mangalore, Karnataka",
  period: "2022 – 2026",
};

export const certifications = [
  { name: "OCI 2025 Certified Generative AI Professional", issuer: "Oracle University", year: "2025" },
  { name: "Applied Deep Learning with Keras", issuer: "Infosys Springboard", year: "2025" },
];

// "Why work with me" bento
export const highlights = {
  apis: { value: 15, suffix: "+", label: "REST APIs", text: "Shipped for Package, License and Vulnerability services at TrueByte." },
  accuracy: {
    value: 99.2,
    suffix: "%",
    label: "Pitch accuracy",
    text: "Hummello's F0 extraction: 434.2 Hz mean pitch vs a 437.6 Hz reference.",
  },
  schema: { value: 5, suffix: "", label: "Table schema", text: "Normalized PostgreSQL design for the CVETrack.ai policy engine." },
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
