import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import project1Img from "@/public/project1.jpg";
import project2Img from "@/public/project2.jpg";
import project3Img from "@/public/project3.jpg";
import project4Img from "@/public/project4.jpg";

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
    title: "Applied Mathematics, Minor in CS (Transferred)",
    location: "Baylor University, Waco, TX",
    description:
      "Recognized on the Dean's List and contributed as a Minister in the Chinese Students and Scholars Association.",
    icon: React.createElement(LuGraduationCap),
    date: "Aug 2020 - May 2022",
  },
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
] as const;

export const projectsData = [
  {
    title: "AgendaPro Desktop App",
    description:
      "A productivity desktop app built with JavaFX, showcasing task, event management, and utilities like timers.",
    tags: ["JavaFX", "Scene Builder", "Java", "API"],
    imageUrl: project4Img, // Replace with your image variable
    source: "https://github.com/AlanY1an/AgendaPro", // Replace with the actual link if available
    demo: "https://github.com/AlanY1an/AgendaPro", // Replace with the actual demo link if available
  },
  {
    title: "Portfolio Template",
    description: "A reusable and scalable portfolio template using Next.js",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: project1Img, // Replace with your image variable
    source: "https://github.com/AlanY1an/personal-portfolio", // Replace with the actual link if available
    demo: "https://your-demo-link.com", // Replace with the actual demo link if available
  },
  {
    title: "Online Flower Shop",
    description:
      "A responsive SPA for an online flower shop built with React.js and Vite, focusing on performance optimization and accessibility.",
    tags: ["React.js", "Vite", "HTML", "CSS", "JavaScript"],
    imageUrl: project2Img, // Replace with your image variable
    source: "https://github.com/AlanY1an/BloomGraceWeb", // Replace with the actual link if available
    demo: "https://bloom-grace-web.vercel.app/", // Replace with the actual demo link if available
  },
  {
    title: "Restaurant Management System",
    description:
      "A full-stack Django-based restaurant management system featuring table reservations, meal ordering, and an integrated blog.",
    tags: ["Django", "Python", "SQLite", "PostgreSQL"],
    imageUrl: project3Img, // Replace with your image variable
    source: "https://github.com/AlanY1an/Restaurant-Manage-System", // Replace with the actual link if available
    demo: "https://yian01.pythonanywhere.com/", // Replace with the actual demo link if available
  },
] as const;

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
