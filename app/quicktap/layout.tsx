import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickTap — Type Less, Do More",
  description:
    "QuickTap is an iOS app that lets you create, organize, and instantly insert text snippets via a custom keyboard extension.",
};

export default function QuickTapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
