"use client";

import dynamic from "next/dynamic";

/** Loads the floating controls and chat assistant after the page is interactive (keeps initial JS small). */
export const LazyFloatingControls = dynamic(
  () => import("@/components/chat/FloatingControls").then((m) => m.FloatingControls),
  { ssr: false },
);
