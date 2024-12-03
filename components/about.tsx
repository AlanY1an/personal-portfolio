"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import useSectionInView from '@/lib/hooks';

export default function About() {
  const { ref } = useSectionInView("About", 1);
  
  return (
    <motion.section
      ref = {ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        My name is <span className="font-medium">Yian Ge</span>, and I am a dedicated 
        <span className="font-medium"> software engineer</span> specializing in designing and 
        developing <span className="italic">efficient and scalable software solutions</span>. 
        I bring strong technical expertise in programming languages such as{" "}
        <span className="font-medium">Java, Python, SQL, and MATLAB</span>, and I have hands-on 
        experience with technologies like{" "}
        <span className="font-medium">Django, Spring Boot, React.js, Next.js, TypeScript, 
        and Tailwind CSS</span>. My passion lies in building applications that not only meet 
        business needs but also deliver{" "}
        <span className="italic">exceptional user experiences</span>. I am actively looking for 
        opportunities to further grow my skills and contribute to impactful projects.
      </p>


      <p className="mb-3">
        I hold a <span className="font-medium">Bachelor of Science in Applied Mathematics </span> 
        from the <span className="font-medium">University of Texas at Austin</span> and am currently 
        pursuing a <span className="font-medium">Master of Science in Software Engineering Systems</span> 
        at <span className="font-medium">Northeastern University</span>. This academic journey reflects 
        my <span className="italic">dedication to continuous learning</span> and my drive to advance 
        expertise in <span className="font-medium">software engineering</span>.
      </p>

      <p className="mb-3">
        Outside of work, I enjoy playing the guitar, cycling, and traveling to experience new cultures and perspectives. These activities bring creativity and balance to my life, making my personal and professional journey more fulfilling.
      </p>


    </motion.section>
  );
}
