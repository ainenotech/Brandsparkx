/**
 * Contact form rules — identical to the original site.
 * Pure functions so the same rules can run on the server in Phase 2.
 */

export const contactFields = ["name", "email", "phone", "website", "message"] as const;
export type ContactField = (typeof contactFields)[number];

export const contactRules: Record<ContactField, (value: string) => boolean> = {
  name: (v) => v.trim().length > 1,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
  phone: (v) => !v || /^\+?[\d\s()-]{7,}$/.test(v),
  website: (v) => !v || /^https?:\/\/\S+\.\S+/.test(v),
  message: (v) => v.trim().length >= 10,
};

/** Required fields are validated on blur even when left empty. */
export const requiredFields: ContactField[] = ["name", "email", "message"];

export type ContactData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  interests: string[];
  message: string;
};
