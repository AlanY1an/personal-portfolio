"use client";

import React, { useEffect, useState } from "react";

export default function Footer() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visit")
      .then((r) => r.json())
      .then((data: { count: number; enabled: boolean }) => {
        if (cancelled) return;
        if (data.enabled) setVisits(data.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">&copy; 2026 Yian Ge</small>
      <p className="text-xs">
        <span className="font-semibold">About this website: </span>{" "}
        <a href="#" className="underline">
          Github
        </a>
      </p>
      {visits !== null && (
        <p className="mt-2 text-xs text-gray-400 tabular-nums">
          👁 {visits.toLocaleString()} visits
        </p>
      )}
    </footer>
  );
}
