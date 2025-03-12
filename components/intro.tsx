"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare, FaGlobe, FaSeedling } from "react-icons/fa";
import useSectionInView from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.75);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[50rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              duration: 0.4,
            }}
          >
            <Image
              src="/profile-photo.jpeg"
              alt="Yian Ge"
              width="192"
              height="192"
              quality="95"
              // priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>
          <motion.span
            className="text-4xl absolute bottom-0 right-0"
            initial={{ opacity: 0, scale: 0, rotate: -180 }} // rotate angle
            animate={{ opacity: 1, scale: 1, rotate: 0 }} // end rotate angle
            transition={{
              type: "spring",
              bounce: 1,
              stiffness: 125,
              delay: 0.1,
              duration: 1,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-normal leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hello, My name is <span className="font-bold">Yian.</span> I&apos;m a{" "}
        <span className="font-bold">passionate</span> software engineer who
        loves creating innovative{" "}
        <span className="italic">projects & apps</span> that make a difference
        in people&apos;s lives.
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 text-lg"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-80 group-hover:translate-x-1 transition" />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href="/CV.pdf"
          download
        >
          Download CV
          <HiDownload className="opacity-80 group-hover:translate-y-1 transition" />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:text-gray-950 hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/yian-ge/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.3rem] rounded-full hover:text-gray-950 focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/AlanY1an"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 text-lg"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <div className="relative p-4 group hover:scale-110 transition-all duration-300">
          <div className="absolute inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full blur-xl opacity-60"></div>
          <a
            className="relative bg-gradient-to-r p-[2px] rounded-full"
            href="https://alanyian.com"
            target="_blank"
          >
            <div className="relative bg-white dark:bg-gray-900 rounded-full px-6 py-3 flex flex-col items-center gap-1 transition-all duration-300 group-hover:bg-opacity-90">
              <div className="flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 font-medium text-lg">
                  My Digital Garden
                </span>
                <FaSeedling className="text-green-600 group-hover:rotate-12 transition-all duration-300" />
              </div>
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
