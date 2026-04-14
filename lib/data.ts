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
    title: "B.S. in Applied Mathematics",
    location: "University of Texas at Austin, Austin, TX",
    description:
      "Graduated with a 3.9 GPA. Honoree Listing 2024 and Honors Graduate. Coursework covered Object-Oriented Programming, Discrete Math, and Real Analysis.",
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2022 – May 2024",
  },
  {
    title: "Website Developer Intern at BeTogether Hub",
    location: "Remote",
    description:
      "Translated Figma designs into a fully functional WordPress site for a nonprofit focused on mental-health and anti-loneliness services. Reduced page load time by 20% through styling, image compression, and site config. Built custom themes and plugins for blog and podcast hosting, with category management and admin documentation.",
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2024 – May 2025",
  },
  {
    title: "M.S. in Software Engineering Systems",
    location: "Northeastern University, Boston, MA",
    description:
      "Currently pursuing the MS with a 4.0 GPA. Coursework: Web Design, UI/UX, Data Structures and Algorithms. Expected graduation May 2026.",
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2024 – Expected May 2026",
  },
  {
    title:
      "Graduate Research Assistant at Global Resilience Institute, Northeastern University",
    location: "Boston, MA",
    description:
      "Conduct research for the Defense Industrial Base Initiative (DIBI) on U.S. defense manufacturing, supply chains, and workforce readiness. Assist with case studies, stakeholder engagement, and policy analysis to enhance industrial resilience.",
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2024 – Present",
  },
  {
    title: "Software Engineer Intern at OptiSigns Inc.",
    location: "Houston, TX (On-site)",
    description:
      "Shipped a Power BI SDK integration (React / TypeScript + Express) with advanced filtering, serving 100+ enterprise clients. Redesigned and migrated the Clock smallapp (3,000+ users) with a new backend and database architecture, plus migration scripts, to unblock customizable UI/UX templates. Authored developer docs and introduced AI-assisted coding workflows that sped up onboarding and automated repetitive tasks.",
    icon: React.createElement(CgWorkAlt),
    date: "Jun 2025 – Present",
  },
] as const;

// `projectsData` was removed. The project list is now fetched at build
// time from the Astro blog's /api/projects.json endpoint via
// `lib/get-projects.ts`. See components/projects.tsx.

export const skillsData = [
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Spring Boot",
  "Django",
  "POSTMAN",
  "SQL",
  "MATLAB",
  "R",
  "MySQL",
  "Git",
  "Linux",
  "BeautifulSoup",
  "Requests",
  "JavaFX",
  "LATEX",
] as const;
