import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickTap - Support",
  description:
    "Get help with QuickTap — the iOS keyboard app for text snippets. Find answers to common questions or contact support.",
};

export default function QuickTapSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
