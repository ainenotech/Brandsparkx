"use client";

import { useEffect, useSyncExternalStore } from "react";
import PhoneInput, { parsePhoneNumber, type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { CountrySelect } from "@/components/forms/CountrySelect";

// Visitors in India get +91 preselected; everyone else starts on the UAE. The server
// snapshot is always the UAE, so hydration matches and the browser value applies right after.
const noSubscribe = () => () => {};
const countryFromTimeZone = (): Country => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return tz === "Asia/Kolkata" || tz === "Asia/Calcutta" ? "IN" : "AE";
};
const serverCountry = (): Country => "AE";

// Gulf and key markets first, then everyone else alphabetically.
const countryOrder = ["AE", "IN", "SA", "QA", "OM", "KW", "BH", "US", "GB", "|", "..."] as const;

/**
 * Phone number with a searchable country picker (SVG flags). `value` is E.164
 * (e.g. "+971501234567"), or undefined while empty. Styled by `.cf-phone` in globals.css.
 */
export function PhoneField({
  id,
  value,
  onChange,
  invalid,
  describedBy,
}: {
  id: string;
  value?: string;
  onChange: (value?: string) => void;
  invalid?: boolean;
  describedBy?: string;
}) {
  const defaultCountry = useSyncExternalStore(noSubscribe, countryFromTimeZone, serverCountry);
  // Text typed before hydration is in the DOM but never reached onChange; pick it up once.
  useEffect(() => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    const typed = input?.value.trim();
    if (!typed || value) return;
    try {
      onChange(parsePhoneNumber(typed, defaultCountry)?.number ?? typed);
    } catch {
      onChange(typed);
    }
    // Mount only: later edits go through PhoneInput's own onChange.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PhoneInput
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className="cf-phone"
      value={value}
      onChange={onChange}
      defaultCountry={defaultCountry}
      countryOptionsOrder={[...countryOrder]}
      addInternationalOption={false}
      countrySelectComponent={CountrySelect}
      flags={flags}
      inputMode="tel"
      autoComplete="tel"
      maxLength={24}
      placeholder="Phone number"
    />
  );
}
