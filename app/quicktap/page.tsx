"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiCommand,
  FiFolder,
  FiCloud,
  FiZap,
  FiGlobe,
  FiClock,
  FiMapPin,
  FiUser,
  FiStar,
  FiShield,
  FiSmartphone,
} from "react-icons/fi";

const features = [
  {
    icon: FiCommand,
    title: "Custom Keyboard",
    desc: "Access your snippets directly from any app through the QuickTap keyboard extension.",
  },
  {
    icon: FiFolder,
    title: "Folder Organization",
    desc: "Organize snippets into folders with nested subfolders, custom icons, and colors.",
  },
  {
    icon: FiZap,
    title: "Dynamic Components",
    desc: "Embed live date, time, location, and contact info that updates on every insert.",
  },
  {
    icon: FiCloud,
    title: "iCloud Sync",
    desc: "Your snippets and folders sync seamlessly across all your Apple devices.",
  },
  {
    icon: FiGlobe,
    title: "Multi-Language",
    desc: "Full localization support including English and Chinese.",
  },
  {
    icon: FiShield,
    title: "Privacy First",
    desc: "Your data stays on your devices and in your iCloud. No third-party servers.",
  },
];

const components = [
  {
    icon: FiClock,
    label: "Date & Time",
    desc: "Current or specific, multiple formats",
  },
  {
    icon: FiMapPin,
    label: "Location",
    desc: "GPS or custom address",
  },
  {
    icon: FiUser,
    label: "Contact",
    desc: "Name, phone, email from contacts",
  },
  {
    icon: FiStar,
    label: "Marketplace",
    desc: "Browse & add reusable components",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function QuickTapLanding() {
  return (
    <main className="flex flex-col items-center overflow-hidden">
      {/* Hero */}
      <section className="relative flex w-full flex-col items-center px-6 pb-24 pt-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/quicktap-icon.png"
            alt="QuickTap App Icon"
            width={120}
            height={120}
            className="rounded-[28px] shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl"
        >
          Quick
          <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Tap
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-3 max-w-md text-lg text-gray-600 dark:text-gray-400"
        >
          Create, organize, and instantly insert text snippets via a custom
          keyboard extension.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mb-10 text-2xl font-semibold text-gray-800 dark:text-gray-200"
        >
          Type less, do more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-white shadow-lg transition hover:bg-gray-800 hover:shadow-xl dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <FiSmartphone className="text-lg" />
            <span className="font-medium">Download on the App Store</span>
          </a>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-4xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-3xl font-bold sm:text-4xl"
        >
          How It Works
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Create Snippets",
              desc: "Add text snippets with custom titles, colors, and folders.",
            },
            {
              step: "2",
              title: "Enable Keyboard",
              desc: "Add QuickTap keyboard in Settings and allow full access.",
            },
            {
              step: "3",
              title: "Tap to Insert",
              desc: "Switch to QuickTap keyboard in any app and tap to paste.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-xl font-bold text-white shadow-lg">
                {item.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-3xl font-bold sm:text-4xl"
        >
          Features
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border border-black/5 bg-white/60 p-6 backdrop-blur-sm transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
            >
              <f.icon className="mb-4 text-2xl text-blue-500" />
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynamic Components */}
      <section className="w-full max-w-4xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-3xl font-bold sm:text-4xl"
        >
          Dynamic Components
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-gray-600 dark:text-gray-400"
        >
          Embed live data that updates every time you insert a snippet.
        </motion.p>

        <div className="grid gap-4 sm:grid-cols-2">
          {components.map((c, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4 rounded-xl border border-black/5 bg-white/60 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30">
                <c.icon className="text-xl text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">{c.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pro */}
      <section className="w-full max-w-3xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-black/5 bg-gradient-to-br from-blue-50 to-indigo-50 p-10 text-center dark:border-white/10 dark:from-blue-950/30 dark:to-indigo-950/30"
        >
          <h2 className="mb-4 text-3xl font-bold">QuickTap Pro</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Unlock the full potential of QuickTap.
          </p>
          <div className="mb-8 grid gap-3 text-left sm:grid-cols-2">
            {[
              "Unlimited snippets",
              "Image & GIF support",
              "AI rewrite",
              "Contact components",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-blue-500">&#10003;</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Available as monthly, yearly, or lifetime plans.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to type less?
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Download QuickTap and start saving time today.
          </p>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-white shadow-lg transition hover:bg-gray-800 hover:shadow-xl dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <FiSmartphone className="text-lg" />
            <span className="font-medium">Download on the App Store</span>
          </a>
        </motion.div>
      </section>

      {/* Footer links */}
      <footer className="w-full border-t border-black/5 py-8 text-center dark:border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/quicktap/support" className="hover:text-gray-900 dark:hover:text-gray-200 transition">
            Support
          </Link>
          <a href="mailto:yiange131@gmail.com" className="hover:text-gray-900 dark:hover:text-gray-200 transition">
            Contact
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} QuickTap. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
