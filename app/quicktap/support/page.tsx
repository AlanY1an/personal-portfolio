"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "How do I enable the QuickTap keyboard?",
    a: 'Go to Settings > General > Keyboard > Keyboards > Add New Keyboard, select "QuickTap", then tap it and enable "Allow Full Access" for shared data access.',
  },
  {
    q: "Why do I need to allow Full Access?",
    a: "Full Access is required so the keyboard extension can read your saved snippets from the shared App Group container. Without it, the keyboard cannot display your snippets.",
  },
  {
    q: "How do I create a snippet?",
    a: 'Open the QuickTap app, tap the "+" button, enter a title and content, choose a color, and optionally assign it to a folder.',
  },
  {
    q: "What are dynamic components?",
    a: "Dynamic components are live elements you can embed in snippets — such as the current date, time, GPS location, or a contact's info. They update automatically each time the snippet is inserted.",
  },
  {
    q: "Do my snippets sync across devices?",
    a: "Yes. QuickTap uses iCloud to sync your snippets and folders automatically across all devices signed in to the same Apple ID.",
  },
  {
    q: "What does QuickTap Pro include?",
    a: "Pro unlocks unlimited snippets, image & GIF support, AI rewrite, and contact components. You can subscribe monthly, yearly, or purchase a lifetime plan.",
  },
  {
    q: "How do I restore my purchase?",
    a: 'Open QuickTap > Settings > tap "Restore Purchases". Make sure you are signed in with the same Apple ID used for the original purchase.',
  },
  {
    q: "How do I cancel my subscription?",
    a: "Open the Settings app on your device > tap your name > Subscriptions > select QuickTap > Cancel Subscription.",
  },
];

export default function QuickTapSupport() {
  return (
    <main className="flex flex-col items-center px-4 pb-20">
      {/* Hero */}
      <motion.section
        className="mt-8 mb-16 max-w-[45rem] text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl text-white shadow-lg">
            ⌨️
          </div>
        </div>
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          QuickTap Support
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create, organize, and instantly insert text snippets via a custom
          keyboard extension. Type less, do more.
        </p>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="mb-16 w-full max-w-[45rem]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="mb-8 text-center text-2xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg border border-black/10 bg-white px-6 py-4 dark:border-white/10 dark:bg-white/5"
            >
              <summary className="cursor-pointer font-medium text-gray-900 dark:text-gray-100 list-none flex items-center justify-between">
                {item.q}
                <span className="ml-2 transition-transform group-open:rotate-45 text-lg">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        className="w-full max-w-[45rem] text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="mb-4 text-2xl font-bold">Still Need Help?</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          If you have any questions, feedback, or issues not covered above,
          feel free to reach out.
        </p>
        <a
          href="mailto:yiange131@gmail.com"
          className="inline-block rounded-full bg-gray-900 px-8 py-3 text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Contact Us
        </a>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
          yiange131@gmail.com
        </p>
      </motion.section>
    </main>
  );
}
