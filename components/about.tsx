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
        I&apos;m <span className="font-medium">Alan (Yian) Ge</span>, a{" "}
        <span className="font-medium">software engineer</span> currently
        interning at <span className="font-medium">OptiSigns</span>, where I
        ship production features for{" "}
        <span className="italic">100+ enterprise clients</span>. I studied{" "}
        <span className="font-medium">Applied Mathematics at UT Austin</span>{" "}
        and I&apos;m finishing an{" "}
        <span className="font-medium">
          MS in Software Engineering Systems at Northeastern
        </span>
        .
      </p>

      <p className="mb-3">
        I build{" "}
        <span className="font-medium">
          AI products, full-stack apps, and developer tools
        </span>{" "}
        with{" "}
        <span className="font-medium">
          React, Next.js, TypeScript, Python, Tailwind, and FastAPI
        </span>
        . I care about building tools that feel polished, useful, and easy to
        use. I also write{" "}
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
