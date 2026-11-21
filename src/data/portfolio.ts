// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Afnan Abdul Rahiman",
  firstName: "Afnan",
  initials: "AA",
  role: "AI/ML & Python Backend Engineer",
  location: "Calicut, Kerala, India",
  available: true,
  tagline:
    "I build production backends with FastAPI, Django and PostgreSQL, and ship AI products with deep learning and LLMs.",
  summary:
    "B.E. Computer Science graduate specializing in AI/ML, with hands-on experience in Python backend, REST APIs and full-stack development. I've built production systems with FastAPI, PostgreSQL, React and Django, and worked on deep learning, computer vision and Generative AI. Oracle-certified Generative AI Professional.",
  email: "afnanabdulrahiman.aa@gmail.com",
  phone: "+91 93834 66313",
  resume: "/resume.pdf",
  // Put your photo at public/profile.jpg and set this to "/profile.jpg"
  photo: "" as string,
  socials: {
    github: "https://github.com/3fnan",
    linkedin: "https://linkedin.com/in/afnanabdulrahiman",
  },
};

export const stats = [
  { value: "3", label: "Internships" },
  { value: "15+", label: "REST APIs shipped" },
  { value: "4", label: "Major projects" },
  { value: "2", label: "Certifications" },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Research Intern",
    company: "XandY Learning Pvt. Ltd.",
    location: "Calicut",
    period: "Oct 2026 – Present",
    current: true,
    points: [
      "Contributing to app development and research for Find My Path (findmypath.ai), a career assessment platform for students.",
      "Testing and validating student assessments so career and stream recommendations accurately match responses.",
      "Working in the Founder's Office on EdTech research, presenting findings on learning approaches and market trends.",
    ],
    tags: ["EdTech", "Research", "Product"],
  },
  {
    role: "Software Engineer Intern",
    company: "TrueByte Innovation LLP",
    location: "Bengaluru",
    period: "Jan 2026 – Apr 2026",
    points: [
      "Built the backend for CVETrack.ai, an AI-powered cybersecurity intelligence platform.",
      "Designed a rule-based policy engine with nested AND/OR expressions and recursive group evaluation, exposed via FastAPI.",
      "Architected a 5-table normalized PostgreSQL schema for policies, rule groups, rules, conditions and evaluation history.",
      "Built 15+ RESTful CRUD APIs with pagination, role-based access control and error handling.",
      "Developed a React/TypeScript policy UI with rule-group creation and evaluation history.",
    ],
    tags: ["FastAPI", "PostgreSQL", "React", "TypeScript"],
  },
  {
    role: "Software Engineer Intern",
    company: "Blend-ed",
    location: "Cyber Park, Calicut",
    period: "Aug 2026 – Sep 2026",
    points: [
      "Completed structured training in Python web development through CS50's Web Programming with Python and JavaScript.",
      "Implemented Django apps covering models, views, forms, routing, authentication, CRUD, pagination and migrations.",
      "Built a social network, an auction platform and an encyclopedia app with the Django ORM.",
    ],
    tags: ["Django", "Python", "JavaScript"],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  year: string;
  description: string;
  highlights: string[];
  stack: string[];
  github?: string;
  live?: string;
  accent: string; // card gradient, any CSS colour
};

// Add your real repo / demo URLs below.
export const projects: Project[] = [
  {
    title: "ResumeIQ AI",
    subtitle: "AI-powered resume analyzer",
    year: "2026",
    description:
      "Full-stack AI platform that scores resumes for ATS, finds skill gaps and matches them against job descriptions.",
    highlights: [
      "Server-side PDF pipeline with pdf-parse + Gemini 2.5 Flash",
      "Interactive dashboard with typed JSON contracts and score visualizations",
      "Print-optimized reports and end-to-end Playwright tests",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Gemini API", "Playwright"],
    github: "https://github.com/3fnan",
    live: "#",
    accent: "#c8f169",
  },
  {
    title: "Hummello",
    subtitle: "AI music generator from raw humming",
    year: "2025",
    description:
      "Deep learning pipeline that turns a hummed melody into expressive bansuri-like audio.",
    highlights: [
      "DSP feature extraction + Transformer autoencoder",
      "F0 extraction with WORLD DIO + StoneMask: 434.2 Hz vs 437.6 Hz reference",
      "Streamlit UI with mel-spectrogram comparison",
    ],
    stack: ["Python", "TensorFlow", "Keras", "Librosa", "pyWORLD", "Streamlit"],
    accent: "#a78bfa",
  },
  {
    title: "Al Fan Al Aniq",
    subtitle: "Corporate website for a UAE firm",
    year: "2026",
    description:
      "Responsive corporate website for a UAE technical services company, delivered live on a custom domain.",
    highlights: [
      "Reusable, data-driven sections for services, projects and clients",
      "Custom-domain deployment and production hosting",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    live: "#",
    accent: "#60a5fa",
  },
  {
    title: "LifeOS",
    subtitle: "Personal productivity & goal platform",
    year: "2026",
    description:
      "Django platform for managing long-term goals, daily tasks, reminders, schedules and learning.",
    highlights: [
      "User auth, goal and task management, scheduling",
      "Database-backed workflows with responsive interfaces",
    ],
    stack: ["Python", "Django", "PostgreSQL", "JavaScript"],
    github: "https://github.com/3fnan",
    accent: "#fb923c",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "SQL", "C/C++", "Java"] },
  {
    group: "Backend",
    items: ["FastAPI", "Django", "Django REST Framework", "REST APIs", "Docker"],
  },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  {
    group: "AI / ML",
    items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "OpenCV", "LLM APIs"],
  },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"] },
  { group: "Tools", items: ["Git", "Postman", "Jupyter", "Linux", "Colab"] },
];

export const education = {
  degree: "B.E. Computer Science Engineering — AI & Machine Learning",
  school: "Sahyadri College of Engineering and Management",
  location: "Mangalore, Karnataka",
  period: "2022 – 2026",
};

export const certifications = [
  {
    name: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle University",
    year: "2025",
  },
  {
    name: "Applied Deep Learning with Keras",
    issuer: "Infosys Springboard",
    year: "2025",
  },
];

export const languages = [
  { name: "Malayalam", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
  { name: "Arabic", level: "Conversational" },
];
