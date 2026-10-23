"use client";

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { interests } from "@/content/interests";
import {
  contactFields,
  contactRules,
  requiredFields,
  type ContactField,
} from "@/lib/validation";

type Status = "idle" | "invalid" | "sending" | "sent" | "failed";

const scriptUrl = process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL;

const messages: Record<ContactField, string> = {
  name: "Enter your name.",
  email: "Enter a valid email, like name@company.com.",
  phone: "Use digits, spaces and an optional leading +.",
  website: "Enter a full address starting with http:// or https://.",
  message: "Tell us a little about what you need (at least 10 characters).",
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const touched = useRef(new Set<ContactField>());
  // A ref, not state, so a second click before React re-renders is still ignored.
  const sending = useRef(false);
  const [errors, setErrors] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  // `?interest=AI%20Sales` pre-selects that interest; the page also tells the CSS it is the contact page.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("interest");
    if (wanted && formRef.current) {
      formRef.current
        .querySelectorAll<HTMLInputElement>('input[name="interest"]')
        .forEach((input) => (input.checked = input.value === wanted));
    }
    document.body.classList.add("on-contact");
    return () => document.body.classList.remove("on-contact");
  }, []);

  const valueOf = (name: ContactField) =>
    (formRef.current?.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "";

  const check = (name: ContactField) => {
    const ok = contactRules[name](valueOf(name));
    setErrors((e) => ({ ...e, [name]: !ok }));
    return ok;
  };

  // Blur and input events bubble up to the form, so one handler covers every field.
  const fieldName = (target: EventTarget) => {
    const name = (target as HTMLInputElement).name as ContactField;
    return contactFields.includes(name) ? name : null;
  };

  const onBlur = (e: FocusEvent<HTMLFormElement>) => {
    const name = fieldName(e.target);
    if (!name) return;
    if (valueOf(name) || requiredFields.includes(name)) touched.current.add(name);
    if (touched.current.has(name)) check(name);
  };

  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const name = fieldName(e.target);
    if (name && errors[name]) check(name);
    if (status === "sent") setStatus("idle");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending.current) return;
    const form = e.currentTarget;
    const results = contactFields.map((name) => [name, check(name)] as const);
    const firstInvalid = results.find(([, ok]) => !ok)?.[0];
    if (firstInvalid) {
      setStatus("invalid");
      (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      return;
    }

    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      website: String(fd.get("website") ?? "").trim(),
      services: fd.getAll("interest").map(String),
      message: String(fd.get("message") ?? "").trim(),
      hp: String(fd.get("hp") ?? ""),
    };

    sending.current = true;
    setStatus("sending");
    try {
      if (!scriptUrl) throw new Error("NEXT_PUBLIC_CONTACT_SCRIPT_URL is not set");
      // No Content-Type header: it keeps this a simple text/plain request, so the
      // browser skips the CORS preflight that Apps Script cannot answer.
      const res = await fetch(scriptUrl, { method: "POST", body: JSON.stringify(payload) });
      const result = (await res.json()) as { ok?: boolean; error?: string };
      if (!result.ok) throw new Error(result.error || "Submission rejected");
      form.reset();
      touched.current.clear();
      setErrors({});
      setStatus("sent");
    } catch (err) {
      console.error("Contact form submission failed", err);
      setStatus("failed");
    } finally {
      sending.current = false;
    }
  };

  // Shared props for each validated field.
  const field = (name: ContactField) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": errors[name] || undefined,
    "aria-describedby": errors[name] ? `f-${name}-msg` : undefined,
  });
  const fieldClass = (name: ContactField, full = false) =>
    ["fld", full && "full", errors[name] && "err"].filter(Boolean).join(" ");
  const errorText = (name: ContactField) => (
    <span className="msg" id={`f-${name}-msg`}>
      {messages[name]}
    </span>
  );

  return (
    <form
      className="form"
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onBlur={onBlur}
      onInput={onInput}
    >
      <div className={fieldClass("name")}>
        <label htmlFor="f-name">
          Name <i>*</i>
        </label>
        <input {...field("name")} autoComplete="name" required maxLength={100} />
        {errorText("name")}
      </div>
      <div className="fld">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" autoComplete="organization" maxLength={120} />
      </div>
      <div className={fieldClass("email")}>
        <label htmlFor="f-email">
          Work email <i>*</i>
        </label>
        <input
          {...field("email")}
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          suppressHydrationWarning
        />
        {errorText("email")}
      </div>
      <div className={fieldClass("phone")}>
        <label htmlFor="f-phone">WhatsApp / phone</label>
        <input
          {...field("phone")}
          type="tel"
          autoComplete="tel"
          placeholder="+971"
          maxLength={30}
        />
        {errorText("phone")}
      </div>
      <div className={fieldClass("website", true)}>
        <label htmlFor="f-website">Website</label>
        <input {...field("website")} type="url" placeholder="https://" maxLength={200} />
        {errorText("website")}
      </div>
      <fieldset className="fld full" style={{ border: 0 }}>
        <legend style={{ fontWeight: 500, fontSize: ".9rem", marginBottom: 10 }}>
          What are you looking to improve?
        </legend>
        <div className="opts">
          {interests.map((x) => (
            <label key={x}>
              <input type="checkbox" name="interest" value={x} />
              <span>{x}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped server-side. */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <div className={fieldClass("message", true)}>
        <label htmlFor="f-message">
          Message <i>*</i>
        </label>
        <textarea
          {...field("message")}
          required
          maxLength={2000}
          placeholder="What would you like to improve, automate or build?"
        />
        {errorText("message")}
      </div>

      <div
        className={status === "invalid" || status === "failed" ? "fstate e show" : "fstate e"}
        role="alert"
      >
        {status === "invalid" && (
          <>
            <Icon name="i-info" />
            <span>Some fields need attention. Check the highlighted fields and try again.</span>
          </>
        )}
        {status === "failed" && (
          <>
            <Icon name="i-info" />
            <span>
              Something went wrong. Please try again or email us at{" "}
              <a href="mailto:prasant@brandsparkx.com">prasant@brandsparkx.com</a>.
            </span>
          </>
        )}
      </div>
      <div className={status === "sent" ? "fstate s show" : "fstate s"} role="status">
        {status === "sent" && (
          <>
            <Icon name="i-mail" />
            <span>
              <b>Thank you!</b> We&apos;ve received your message and will get back to you within
              24 hours.
            </span>
          </>
        )}
      </div>

      <button type="submit" className="btn btn-red" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"} <Icon name="i-arrow" />
      </button>
    </form>
  );
}
