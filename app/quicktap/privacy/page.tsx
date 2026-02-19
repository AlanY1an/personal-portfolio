"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function QuickTapPrivacy() {
  return (
    <main className="flex flex-col items-center px-4 pb-20">
      {/* Header */}
      <motion.section
        className="mt-8 mb-12 max-w-[45rem] text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/quicktap" className="mb-6 inline-block">
          <Image
            src="/quicktap-icon.png"
            alt="QuickTap"
            width={64}
            height={64}
            className="rounded-2xl shadow-lg"
          />
        </Link>
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: February 18, 2025
        </p>
      </motion.section>

      {/* Content */}
      <motion.article
        className="w-full max-w-[45rem] space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Section title="Overview">
          <p>
            QuickTap (&quot;the App&quot;) is designed with your privacy in
            mind. We do not collect, store, or share your personal data on any
            external servers. Your snippets and data remain on your device and in
            your personal iCloud account.
          </p>
        </Section>

        <Section title="Data Collection">
          <p>
            <strong>We do not collect any personal information.</strong> The App
            does not use analytics services, tracking pixels, or any form of
            user monitoring. We have no servers that receive your data.
          </p>
        </Section>

        <Section title="Data Storage">
          <p>
            All data you create in QuickTap — including snippets, folders, and
            settings — is stored locally on your device using Apple&apos;s
            SwiftData framework. If you have iCloud enabled, your data syncs
            across your devices through your personal iCloud account. We have no
            access to your iCloud data.
          </p>
        </Section>

        <Section title="Keyboard Extension">
          <p>
            The QuickTap keyboard extension requires &quot;Allow Full
            Access&quot; to read your saved snippets from the shared App Group
            container. This permission is used solely to display your snippets
            within the keyboard.{" "}
            <strong>
              The keyboard does not log keystrokes, transmit text, or send any
              data to external servers.
            </strong>
          </p>
        </Section>

        <Section title="Location Data">
          <p>
            If you use the Location dynamic component, the App may request
            access to your device&apos;s location. This data is used only to
            insert location text into your snippets at the moment of use. Your
            location data is never stored, transmitted, or shared.
          </p>
        </Section>

        <Section title="Contacts">
          <p>
            If you use the Contact dynamic component, the App may request access
            to your contacts. This data is used only to insert contact
            information into your snippets. Your contacts data is never stored
            beyond the snippet content, transmitted, or shared.
          </p>
        </Section>

        <Section title="In-App Purchases">
          <p>
            QuickTap Pro subscriptions and purchases are processed entirely by
            Apple through StoreKit. We do not have access to your payment
            information, Apple ID, or purchase history.
          </p>
        </Section>

        <Section title="Third-Party Services">
          <p>
            The App does not integrate any third-party analytics, advertising,
            or tracking services. The only external service involved is
            Apple&apos;s iCloud for data syncing, which is governed by{" "}
            <a
              href="https://www.apple.com/legal/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-600"
            >
              Apple&apos;s Privacy Policy
            </a>
            .
          </p>
        </Section>

        <Section title="Children's Privacy">
          <p>
            QuickTap does not knowingly collect any personal information from
            children. The App does not require any personal information to
            function.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated date.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:yiange131@gmail.com"
              className="text-blue-500 underline hover:text-blue-600"
            >
              yiange131@gmail.com
            </a>
            .
          </p>
        </Section>
      </motion.article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-black/5 bg-white/60 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
}
