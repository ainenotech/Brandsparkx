"use client";

import dynamic from "next/dynamic";

/**
 * PhoneField with its code split out. The country picker ships every SVG flag (~100 KB), so a
 * direct import made every page download it when Next.js prefetched /contact or /careers from a
 * link. Loaded this way it is still server-rendered, but its JavaScript only loads on the pages
 * that actually show a form.
 */
export const LazyPhoneField = dynamic(() =>
  import("@/components/forms/PhoneField").then((m) => m.PhoneField),
);
