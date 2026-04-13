"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import useSectionInView from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About", 1);

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I&apos;m <span className="font-medium">Yian Ge</span>, a{" "}
        <span className="font-medium">software engineer</span> currently
        interning at{" "}
        <span className="font-medium">OptiSigns</span> in Houston, where I
        ship production features for{" "}
        <span className="italic">100+ enterprise clients</span> — Power BI
        integrations, backend migrations, and developer tooling that makes the
        rest of the team faster. I hold a BS in Applied Mathematics from{" "}
        <span className="font-medium">UT Austin</span> and am completing an MS
        in Software Engineering Systems at{" "}
        <span className="font-medium">Northeastern</span>, both with 3.9+ GPAs.
      </p>

      <p className="mb-3">
        I like building end-to-end things that feel like tools, not demos. My
        recent work spans{" "}
        <span className="font-medium">
          AI products, full-stack web apps, and developer platforms
        </span>{" "}
        — from a LangGraph-powered travel planner to an AI room re-designer
        with per-furniture editing, a context-aware RAG trading copilot, and a
        template-driven LaTeX editor. I&apos;m fluent in{" "}
        <span className="font-medium">
          React, Next.js, TypeScript, Python, Tailwind, and FastAPI
        </span>
        , and I care about what the code feels like to use as much as what it
        does.
      </p>

      <p className="mb-3">
        Outside of work I play guitar, take photos on a Nikon Z6 II, and try
        to visit somewhere new whenever I can. I write{" "}
        <a
          href="https://alanyian.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-white"
        >
          notes and case studies
        </a>{" "}
        on my digital garden in both English and Chinese.
      </p>
    </motion.section>
  );
}
