"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import useSectionInView from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import PlantDrawer, {
  PathSpec,
  PlantDrawerHandle,
} from "./plant-drawer";

// Canvas for the plant-drawer overlay around the "My Digital Garden" button.
// Main stems trace the top + bottom edges of the button; sub-branches spawn
// outward along the way, so decorations end up in the surrounding space.
const PLANT_CANVAS = { width: 900, height: 560 };
const PLANT_CENTER = {
  x: PLANT_CANVAS.width / 2,
  y: PLANT_CANVAS.height / 2,
};
// Button visual dimensions (pill: ~220×52 plus a few px of breathing room).
const BW = 120; // half-width
const BH = 28; // half-height
const cx = PLANT_CENTER.x;
const cy = PLANT_CENTER.y;

// Two vines creeping along the button rim. Top vine crawls left→right
// with a gentle arc above the pill; bottom vine crawls right→left with
// a mirrored arc below. Each stem's sub-branches sprout outward as it
// draws, so leaves/flowers end up in the surrounding negative space.
const PLANT_PATHS: PathSpec[] = [
  {
    start: { x: cx - BW, y: cy - BH },
    d: `M ${cx - BW} ${cy - BH} C ${cx - BW / 2} ${cy - BH - 18}, ${cx + BW / 2} ${cy - BH - 18}, ${cx + BW} ${cy - BH}`,
    sections: 10,
  },
  {
    start: { x: cx + BW, y: cy + BH },
    d: `M ${cx + BW} ${cy + BH} C ${cx + BW / 2} ${cy + BH + 18}, ${cx - BW / 2} ${cy + BH + 18}, ${cx - BW} ${cy + BH}`,
    sections: 10,
  },
];

// Static "seed" leaves rendered at rest so the button looks decorated
// even before hover. Two of them sit exactly at the main stem roots so
// when the plant grows on hover it appears to sprout from them; the
// third is an asymmetric accent. Each sways ±2° on its base to catch
// peripheral attention. Transform origin is 50% 0% in fill-box space,
// which maps to (0,0) in the leaf's local coordinates — the base of
// the leaf path — so rotation pivots on the anchor point.
const DECOR_LEAVES = [
  // Top-left stem root — points NW
  {
    x: cx - BW,
    y: cy - BH,
    rotate: 135,
    path: "M 0 0 Q -9 8 0 22 Q 9 8 0 0 Z",
    color: "#008861",
    duration: 4.2,
    delay: 0,
    sway: 4.6,
    driftX: -1.4,
    driftY: -2.6,
    scale: 0.08,
    beckon: 0.9,
  },
  // Bottom-right stem root — points SE
  {
    x: cx + BW,
    y: cy + BH,
    rotate: 315,
    path: "M 0 0 Q -8.5 7 0 20 Q 8.5 7 0 0 Z",
    color: "#00976C",
    duration: 4.8,
    delay: 0.7,
    sway: 4.1,
    driftX: 1.8,
    driftY: 2.2,
    scale: 0.07,
    beckon: 0.55,
  },
  // Asymmetric accent above the top edge — points NE
  {
    x: cx + BW * 0.45,
    y: cy - BH * 1.05,
    rotate: 225,
    path: "M 0 0 Q -8 9 0 24 Q 8 9 0 0 Z",
    color: "#007956",
    duration: 5.2,
    delay: 1.3,
    sway: 5.2,
    driftX: 2.6,
    driftY: -3.1,
    scale: 0.1,
    beckon: 1.15,
  },
  // Smaller accent on the left shoulder — points SW
  {
    x: cx - BW * 0.52,
    y: cy + BH * 0.62,
    rotate: 112,
    path: "M 0 0 Q -6.5 6 0 17 Q 6.5 6 0 0 Z",
    color: "#0A8F68",
    duration: 4.9,
    delay: 1.8,
    sway: 3.6,
    driftX: -1.6,
    driftY: 1.9,
    scale: 0.06,
    beckon: 0.5,
  },
  // Smaller accent on the right crown — points NE
  {
    x: cx + BW * 0.16,
    y: cy - BH * 1.46,
    rotate: 204,
    path: "M 0 0 Q -6 7 0 18 Q 6 7 0 0 Z",
    color: "#049468",
    duration: 5.5,
    delay: 2.2,
    sway: 3.9,
    driftX: 1.9,
    driftY: -2.4,
    scale: 0.065,
    beckon: 0.7,
  },
];

const DECOR_BUDS = [
  {
    x: cx + BW * 0.74,
    y: cy - BH * 0.72,
    rotate: 22,
    color: "#F59EAD",
    centerColor: "#FDE68A",
    duration: 5.9,
    delay: 1.1,
    sway: 3.2,
    driftX: 1.5,
    driftY: -2.1,
    scale: 0.075,
    beckon: 0.6,
    size: 0.8,
  },
];

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.75);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const plantRef = useRef<PlantDrawerHandle>(null);
  const decorRefs = useRef<(SVGPathElement | null)[]>([]);
  const budRefs = useRef<(SVGGElement | null)[]>([]);

  // Sway each decor leaf on a sine wave by writing the SVG transform
  // attribute directly. This bypasses every CSS transform / fill-box /
  // framer-motion / gsap matrix composition issue — we just paint the
  // frame ourselves. translate(x, y) moves the leaf's base to its
  // anchor, then rotate() pivots around the new origin (= the base),
  // so the leaf swings on its own stem.
  useEffect(() => {
    let raf = 0;
    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const paint = (now: number) => {
      const elapsed = (now - start) / 1000;
      for (let i = 0; i < DECOR_LEAVES.length; i++) {
        const el = decorRefs.current[i];
        if (!el) continue;
        const leaf = DECOR_LEAVES[i];
        const phase =
          ((elapsed + leaf.delay) / leaf.duration) * Math.PI * 2;
        const driftPhase = phase + Math.PI / 3;
        const beckonPhase =
          ((elapsed + leaf.delay * 0.8) / 8.5) * Math.PI * 2;
        const beckonWave = Math.max(0, Math.sin(beckonPhase)) ** 6;
        const rotation =
          leaf.rotate +
          Math.sin(phase) * leaf.sway +
          beckonWave * leaf.sway * leaf.beckon;
        const tx =
          leaf.x +
          Math.sin(driftPhase) * leaf.driftX +
          beckonWave * leaf.driftX * 1.3;
        const ty =
          leaf.y +
          Math.cos(driftPhase) * leaf.driftY -
          beckonWave * (1.6 + Math.abs(leaf.driftY) * 0.35);
        const scale =
          1 +
          Math.sin(phase + Math.PI / 6) * leaf.scale +
          beckonWave * leaf.scale * 0.65;
        el.setAttribute(
          "transform",
          `translate(${tx.toFixed(2)}, ${ty.toFixed(2)}) rotate(${rotation.toFixed(2)}) scale(${scale.toFixed(3)})`,
        );
        el.setAttribute(
          "opacity",
          `${(
            0.88 +
            Math.sin(phase + Math.PI / 2) * 0.08 +
            beckonWave * 0.08
          ).toFixed(3)}`,
        );
      }
      for (let i = 0; i < DECOR_BUDS.length; i++) {
        const el = budRefs.current[i];
        if (!el) continue;
        const bud = DECOR_BUDS[i];
        const phase =
          ((elapsed + bud.delay) / bud.duration) * Math.PI * 2;
        const driftPhase = phase + Math.PI / 5;
        const beckonPhase =
          ((elapsed + bud.delay * 0.8) / 9.2) * Math.PI * 2;
        const beckonWave = Math.max(0, Math.sin(beckonPhase)) ** 5;
        const rotation =
          bud.rotate + Math.sin(phase) * bud.sway + beckonWave * 2.2;
        const tx =
          bud.x +
          Math.sin(driftPhase) * bud.driftX +
          beckonWave * bud.driftX * 0.8;
        const ty =
          bud.y +
          Math.cos(driftPhase) * bud.driftY -
          beckonWave * 1.2;
        const scale =
          bud.size +
          Math.sin(phase + Math.PI / 8) * bud.scale +
          beckonWave * bud.scale * 0.5;
        el.setAttribute(
          "transform",
          `translate(${tx.toFixed(2)}, ${ty.toFixed(2)}) rotate(${rotation.toFixed(2)}) scale(${scale.toFixed(3)})`,
        );
        el.setAttribute(
          "opacity",
          `${(
            0.8 +
            Math.sin(phase + Math.PI / 3) * 0.07 +
            beckonWave * 0.1
          ).toFixed(3)}`,
        );
      }
      raf = requestAnimationFrame(paint);
    };
    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, []);

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
              alt="Alan (Yian) Ge"
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
        Hello, My name is <span className="font-bold">Alan (Yian).</span>{" "}
        I&apos;m a <span className="font-bold">passionate</span> software
        engineer who loves creating innovative{" "}
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
        className="flex items-center justify-center mt-6 px-4 text-lg"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
        }}
      >
        <div
          className="group relative inline-block"
          onMouseEnter={() =>
            plantRef.current?.growAlongPaths(PLANT_PATHS)
          }
          onMouseLeave={() => plantRef.current?.clear()}
        >
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible"
            width={PLANT_CANVAS.width}
            height={PLANT_CANVAS.height}
            viewBox={`0 0 ${PLANT_CANVAS.width} ${PLANT_CANVAS.height}`}
            aria-hidden="true"
          >
            {DECOR_LEAVES.map((leaf, i) => (
              <path
                key={i}
                ref={(el) => {
                  decorRefs.current[i] = el;
                }}
                d={leaf.path}
                fill={leaf.color}
              />
            ))}
            {DECOR_BUDS.map((bud, i) => (
              <g
                key={`bud-${i}`}
                ref={(el) => {
                  budRefs.current[i] = el;
                }}
              >
                <path
                  d="M 0 8 C 1 4, 3 1, 6 0 C 9 1, 11 4, 12 8 C 12 13, 8.5 17, 6 19 C 3.5 17, 0 13, 0 8 Z"
                  fill={bud.color}
                />
                <ellipse
                  cx="6"
                  cy="7.5"
                  rx="2"
                  ry="1.4"
                  fill={bud.centerColor}
                  opacity="0.85"
                />
              </g>
            ))}
          </svg>
          <PlantDrawer
            ref={plantRef}
            width={PLANT_CANVAS.width}
            height={PLANT_CANVAS.height}
            sections={10}
            grid={45}
            branchSpeed={1.2}
            leafScale={1.2}
            flowerScale={1.8}
            thornScale={1.3}
            spawnRates={{
              branch: 0.012,
              thorn: 0.015,
              flower: 0.012,
              leaf: 0.08,
            }}
            maxPerBranch={{ flower: 1, leaf: 2 }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible"
          />
          <a
            href="https://alanyian.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my digital garden"
            className="garden-cta relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-green-900/20 bg-gradient-to-b from-emerald-50 to-green-100 px-7 py-3 font-serif italic text-green-900 shadow-sm transition dark:border-emerald-300/20 dark:from-emerald-950/40 dark:to-green-950/30 dark:text-emerald-200"
          >
            <span
              aria-hidden="true"
              className="garden-cta__glow pointer-events-none absolute inset-0 rounded-full"
            />
            <span
              aria-hidden="true"
              className="garden-cta__shine pointer-events-none absolute inset-y-[18%] -left-[24%] w-[32%] rounded-full bg-white/45 blur-[1px] dark:bg-emerald-100/20"
            />
            <span
              aria-hidden="true"
              className="garden-cta__sprout pointer-events-none absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full"
            />
            <span className="garden-cta__label relative flex items-center gap-2 tracking-wide">
              <span>My Digital Garden</span>
              <span
                aria-hidden="true"
                className="garden-cta__arrow text-sm not-italic"
              >
                →
              </span>
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
