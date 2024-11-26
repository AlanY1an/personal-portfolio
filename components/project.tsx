"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  source,
  demo,
}: ProjectProps) {

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[22rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        
        <Image
            src={imageUrl}
            alt="Project I worked on"
            quality={95}
              className="block h-[20rem] object-cover object-top top-0 p-4 relative right-0 m-auto sm:p-0 sm:absolute sm:-right-40 sm:top-10 w-[28.25rem] rounded-t-lg shadow-2xl
              transition 
              
              sm:group-hover:scale-[1.04]
              sm:group-hover:-translate-x-3
              sm:group-hover:translate-y-3
              sm:group-hover:-rotate-2

              sm:group-even:group-hover:translate-x-3
              sm:group-even:group-hover:translate-y-3
              sm:group-even:group-hover:rotate-2

              sm:group-even:right-[initial] group-even:left-0 sm:group-even:-left-40"
        />
        
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem] ">
          <h3 className="text-2xl font-semibold text-center sm:text-start">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto justify-center sm:justify-start">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex gap-4 mt-4 justify-around sm:mt-auto">
            {source && (
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline font-medium whitespace-nowrap"
              >
                <FaGithub className="mr-2"/>Source
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline font-medium whitespace-nowrap"
              >
                <FaExternalLinkAlt className="mr-2"/>Demo
              </a>
            )}
          </div>


        </div>


      </section>
    </motion.div>
  );
}
