"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { BlogProject } from "@/lib/get-projects";

interface ProjectProps {
  project: BlogProject;
}

export default function Project({ project }: ProjectProps) {
  const { title, description, tech, coverUrl, repoUrl, liveUrl, detailUrl } =
    project;

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
        {/* Stretched link covers the whole card → clicking anywhere
            except the nested Source/Demo links opens the blog case
            study. Source/Demo below use z-10 to sit above. */}
        <a
          href={detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} — read the full case study`}
          className="absolute inset-0"
        />

        {coverUrl && (
          <a
            href={detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} — read the full case study`}
            className="block h-[20rem] top-0 p-4 relative right-0 m-auto sm:p-0 sm:absolute sm:-right-40 sm:top-10 w-[28.25rem] z-10
              sm:group-even:right-[initial] group-even:left-0 sm:group-even:-left-40"
          >
            <Image
              src={coverUrl}
              alt={title}
              width={452}
              height={320}
              quality={95}
              unoptimized
              className="block h-full w-full object-cover object-top rounded-t-lg shadow-2xl
                transition

                sm:group-hover:scale-[1.04]
                sm:group-hover:-translate-x-3
                sm:group-hover:translate-y-3
                sm:group-hover:-rotate-2

                sm:group-even:group-hover:translate-x-3
                sm:group-even:group-hover:translate-y-3
                sm:group-even:group-hover:rotate-2"
            />
          </a>
        )}

        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem] ">
          <h3 className="text-2xl font-semibold text-center sm:text-start">
            {title}
          </h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70 line-clamp-5">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-1.5 sm:mt-auto justify-center sm:justify-start">
            {tech.slice(0, 3).map((tag, index) => (
              <li
                className="bg-black/[0.7] px-2.5 py-0.5 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>

          {(repoUrl || liveUrl) && (
            <div className="relative z-10 flex flex-wrap gap-4 mt-4 justify-around sm:mt-auto">
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline font-medium whitespace-nowrap"
                >
                  <FaGithub className="mr-2" />
                  Source
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline font-medium whitespace-nowrap"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Demo
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
