/**
 * Contact and careers form rules.
 * Pure functions so the same rules can run on the server in Phase 2.
 */

import { careerLocations } from "@/content/careers";

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

/**
 * Careers application rules. Same name, email, phone, and link checks as contact.
 * Location must match the choices on the page.
 */
export const careerFields = [
  "name",
  "email",
  "phone",
  "position",
  "experience",
  "location",
  "portfolio",
  "message",
] as const;
export type CareerField = (typeof careerFields)[number];

/** Required fields are validated on blur even when left empty. */
export const careerRequiredFields: CareerField[] = ["name", "email", "position"];

const isAllowed = (options: readonly string[], value: string) => options.includes(value.trim());

export const careerRules: Record<CareerField, (value: string) => boolean> = {
  name: contactRules.name,
  email: contactRules.email,
  phone: contactRules.phone,
  position: (value) => value.trim().length > 1,
  experience: () => true,
  location: (value) => !value.trim() || isAllowed(careerLocations, value),
  portfolio: contactRules.website,
  message: () => true,
};

/** Required CV upload. PDF, DOC or DOCX, up to 5 MB. */
export const maxCvBytes = 5 * 1024 * 1024;

export const cvMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const cvExtensions = [".pdf", ".doc", ".docx"];

export function isCareerCv(file: File | null) {
  if (!file) return false;
  const extensionOk = cvExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
  const typeOk = !file.type || cvMimeTypes.has(file.type);
  return extensionOk && typeOk && file.size > 0 && file.size <= maxCvBytes;
}
