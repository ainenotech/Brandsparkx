"use client";

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { interests } from "@/content/interests";
import { site } from "@/content/site";
import {
  contactFields,
  contactRules,
  requiredFields,
  type ContactField,
} from "@/lib/validation";

type Status = "idle" | "invalid" | "ready";

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
  const [errors, setErrors] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [draftHref, setDraftHref] = useState("");

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
    if (status === "ready") {
      setStatus("idle");
      setDraftHref("");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const results = contactFields.map((name) => [name, check(name)] as const);
    const firstInvalid = results.find(([, ok]) => !ok)?.[0];
    if (firstInvalid) {
      setStatus("invalid");
      (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      return;
    }

    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      website: String(fd.get("website") ?? "").trim(),
      interests: fd.getAll("interest").map(String),
      message: String(fd.get("message") ?? "").trim(),
    };
    const body = [
      `Name: ${data.name}`,
      data.company && `Company: ${data.company}`,
      `Work email: ${data.email}`,
      data.phone && `Phone: ${data.phone}`,
      data.website && `Website: ${data.website}`,
      data.interests.length > 0 && `Interested in: ${data.interests.join(", ")}`,
      "",
      "Message:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");
    const subject = `Project enquiry from ${data.name}`;
    setDraftHref(
      `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setStatus("ready");
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

      <div className={status === "invalid" ? "fstate e show" : "fstate e"} role="alert">
        {status === "invalid" && (
          <>
            <Icon name="i-info" />
            <span>Some fields need attention. Check the highlighted fields and try again.</span>
          </>
        )}
      </div>
      <div className={status === "ready" ? "fstate s show" : "fstate s"} role="status">
        {status === "ready" && (
          <>
            <Icon name="i-mail" />
            <span>
              <b>Email draft prepared.</b> Nothing has been sent. Open the draft and send it from
              your email app.{" "}
              <a href={draftHref}>Open email draft</a>
            </span>
          </>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-red"
      >
        {status === "ready" ? "Update email draft" : "Prepare email draft"}{" "}
        <Icon name="i-arrow" />
      </button>
    </form>
  );
}
