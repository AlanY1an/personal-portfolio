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
        My name is <span className="font-medium">Yian Ge</span>, a dedicated
        <span className="font-medium"> software engineer</span> specializing in
        building
        <span className="italic"> efficient and scalable solutions</span> that
        deliver
        <span className="italic"> exceptional user experiences</span>. I have
        expertise in
        <span className="font-medium"> Java, Python, SQL, and MATLAB</span>,
        with experience in frameworks and tools like
        <span className="font-medium">
          {" "}
          Django, Spring Boot, React.js, Next.js, TypeScript, and Tailwind CSS
        </span>
        . I am passionate about developing applications that align with business
        needs and am eager to grow through impactful projects.
      </p>

      <p className="mb-3">
        I hold a{" "}
        <span className="font-medium"> Bachelor’s in Applied Mathematics</span>
        from the{" "}
        <span className="font-medium"> University of Texas at Austin</span> and
        am pursuing a{" "}
        <span className="font-medium">
          {" "}
          Master’s in Software Engineering Systems
        </span>
        at <span className="font-medium"> Northeastern University</span>,
        reflecting my
        <span className="italic"> commitment to continuous learning</span> in
        <span className="font-medium"> software engineering</span>.
      </p>

      <p className="mb-3">
        Outside of work, I enjoy playing the guitar, cycling, and traveling to
        experience new cultures and perspectives. These activities bring
        creativity and balance to my life, making my personal and professional
        journey more fulfilling.
      </p>
    </motion.section>
  );
}
