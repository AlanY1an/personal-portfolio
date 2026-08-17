import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Software Engineer at OptiSigns Inc. (intern through May 2026)",
    location: "Houston, TX (On-site)",
    bullets: [
      "Co-authored the internal tooling AI coding agents use across the company's ~40 repositories, including cross-repo context loaders and a reusable skill library with a meta-skill for onboarding any third-party API; designed a three-session agent workflow (plan / code / verify) where the verifier cannot edit what it checks; measured where agent time actually goes, and the findings were adopted as engineering practice.",
      "Integrated the product across 21 device platforms (Samsung Tizen, LG webOS, Amazon Fire TV, TCL, Roku, ChromeOS, Android, embedded Linux), each with its own SDK, signing chain and capability limits, and took 4 of them from vendor SDK to full portal integration.",
      "Shipped device management for a fleet of 200,000+ screens across a React/TypeScript portal, a NestJS/GraphQL backend, device agents and embedded Linux firmware, replacing three hand-maintained lists of what each device model supports, which had drifted apart, with one generated from what the hardware actually reports and guarded by a CI check.",
      "Built the on-device operating-system interface customers see on the screen, from first-boot setup through diagnostics, fully operable from a phone for a display that has no keyboard, shipping enabled in the default product image.",
    ],
    icon: React.createElement(CgWorkAlt),
    date: "Jun 2025 – Present",
  },
  {
    title:
      "Graduate Research Assistant at Global Resilience Institute, Northeastern University",
    location: "Boston, MA",
    bullets: [
      "Assembled a 67-source evidence base on manufacturing capacity and supply-chain resilience, and wrote the resulting reports.",
      "Handled content updates and upkeep for the institute's website.",
    ],
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2024 – May 2025",
  },
  {
    title: "M.S. in Software Engineering Systems",
    location: "Northeastern University, Boston, MA",
    bullets: [
      "Completed the MS in Software Engineering Systems, graduating May 2026.",
      "Coursework: Program Structure & Algorithms, Theory & Practical Applications of AI Generative Models, Prompt Engineering for Generative AI, Operating Systems, Object-Oriented Design, UX Design & Testing.",
    ],
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2024 – May 2026",
  },
  {
    title: "Website Developer Intern at BeTogether Hub",
    location: "Remote",
    bullets: [
      "Translated Figma designs into a fully functional WordPress site for a nonprofit focused on mental-health and anti-loneliness services.",
      "Reduced page load time by 20% through styling, image compression, and site config.",
      "Built custom themes and plugins for blog and podcast hosting, with category management and admin documentation.",
    ],
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2024 – May 2025",
  },
  {
    title: "B.S. in Applied Mathematics",
    location: "University of Texas at Austin, Austin, TX",
    bullets: [
      "Graduated with a 3.9 GPA.",
      "Honoree Listing 2024 and Honors Graduate.",
      "Coursework covered Object-Oriented Programming, Discrete Math, and Real Analysis.",
    ],
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2022 – May 2024",
  },
] as const;

// `projectsData` was removed. The project list is now fetched at build
// time from the Astro blog's /api/projects.json endpoint via
// `lib/get-projects.ts`. See components/projects.tsx.

// Ordered so the AI / LLM work shows up first — those are the
// technologies behind the recent project work (VoyageAI, Elder Trading
// Copilot, Roomet, SmartBin), and the stagger animation reveals them
// in order from left to right.
export const skillsData = [
  // AI / ML / LLM
  "LangGraph",
  "LangChain",
  "OpenAI",
  "Gemini",
  "PyTorch",
  "Hugging Face",
  "FAISS",
  "RAG",
  "YOLO",
  "Streamlit",

  // Web frontend
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Astro",
  "Vite",
  "Framer Motion",

  // Backend
  "FastAPI",
  "Python",
  "Node.js",
  "Express",
  "Django",

  // Data / databases
  "PostgreSQL",
  "Supabase",
  "Redis",
  "SQL",
  "MySQL",

  // DevOps / tooling
  "Docker",
  "AWS",
  "CI/CD",
  "Git",
  "Linux",
  "Postman",

  // Other languages
  "JavaScript",
  "Java",
  "Swift",
  "C++",
  "HTML",
  "CSS",
  "JavaFX",
  "LaTeX",
] as const;
