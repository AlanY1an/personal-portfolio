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
      "Graduated with a 3.9 GPA. Relevant coursework includes Object-Oriented Programming, Discrete Math, and Real Analysis.",
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2022 - May 2024",
  },
  {
    title: "M.S. in Software Engineering Systems",
    location: "Northeastern University, Boston, MA",
    description:
      "Currently pursuing a master's degree with a focus on Software development. Expected graduation in May 2026.",
    icon: React.createElement(LuGraduationCap),
    date: "Sep 2024 - Expected May 2026",
  },
  {
    title: "Website Developer Intern at BeTogether Hub",
    location: "Remote",
    description:
      "Developed a fully functional WordPress website from Figma designs, optimized performance to reduce page load time by 30%, managed blog and podcast pages with custom themes and plugins, and created comprehensive documentation for administrators.",
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2024 - Present",
  },
  {
    title:
      "Graduate Research Assistant at Global Resilience InstituteNortheastern University",
    location: "Boston, MA",
    description:
      "Conduct research for the Defense Industrial Base Initiative (DIBI) on U.S. defense manufacturing, supply chains, and workforce readiness. Assist with case studies, stakeholder engagement, and policy analysis to enhance industrial resilience.",
    icon: React.createElement(CgWorkAlt),
    date: "Dec 2024 - Present",
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
