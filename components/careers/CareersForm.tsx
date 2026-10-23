"use client";

import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { careerLocations } from "@/content/careers";
import { site } from "@/content/site";
import {
  careerFields,
  careerRequiredFields,
  careerRules,
  isCareerCv,
  type CareerField,
} from "@/lib/validation";

type Status = "idle" | "invalid" | "ready";

const messages: Record<Exclude<CareerField, "experience" | "message">, string> = {
  name: "Enter your name.",
  email: "Enter a valid email, like name@company.com.",
  phone: "Use digits, spaces and an optional leading +.",
  position: "Enter the position you are applying for.",
  location: "Choose a location.",
  portfolio: "Enter a full address starting with http:// or https://.",
};

const cvMessage = "Upload a PDF file up to 5 MB.";

export function CareersForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const touched = useRef(new Set<CareerField>());
  const cvRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<Record<CareerField, boolean>>>({});
  const [cvError, setCvError] = useState(false);
  const [cvName, setCvName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [draftHref, setDraftHref] = useState("");

  const selectedCv = () => cvRef.current?.files?.[0] ?? null;

  const checkCv = () => {
    const ok = isCareerCv(selectedCv());
    setCvError(!ok);
    return ok;
  };

  const valueOf = (name: CareerField) => {
    const field = formRef.current?.elements.namedItem(name);
    return field && "value" in field ? field.value : "";
  };

  const check = (name: CareerField) => {
    const ok = careerRules[name](valueOf(name));
    setErrors((current) => ({ ...current, [name]: !ok }));
    return ok;
  };

  const fieldName = (target: EventTarget) => {
    const name = (target as HTMLInputElement).name as CareerField;
    return careerFields.includes(name) ? name : null;
  };

  const onBlur = (event: FocusEvent<HTMLFormElement>) => {
    const name = fieldName(event.target);
    if (!name) return;
    if (valueOf(name) || careerRequiredFields.includes(name)) touched.current.add(name);
    if (touched.current.has(name)) check(name);
  };

  const onEdit = (event: FormEvent<HTMLFormElement>) => {
    const name = fieldName(event.target);
    if (name && errors[name]) check(name);
    if (status === "ready") {
      setStatus("idle");
      setDraftHref("");
    }
  };

  const onCv = () => {
    setCvName(selectedCv()?.name ?? "");
    if (cvError) checkCv();
    if (status === "ready") {
      setStatus("idle");
      setDraftHref("");
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const results = careerFields.map((name) => [name, check(name)] as const);
    const firstInvalid = results.find(([, ok]) => !ok)?.[0];
    const cvOk = checkCv();
    if (firstInvalid || !cvOk) {
      setStatus("invalid");
      if (firstInvalid) (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      else cvRef.current?.focus();
      return;
    }

    const data = new FormData(form);
    const read = (name: CareerField) => String(data.get(name) ?? "").trim();
    const application = {
      name: read("name"),
      email: read("email"),
      phone: read("phone"),
      position: read("position"),
      experience: read("experience"),
      location: read("location"),
      portfolio: read("portfolio"),
      message: read("message"),
      cv: selectedCv()?.name ?? "",
    };
    const body = [
      `Name: ${application.name}`,
      `Email: ${application.email}`,
      application.phone && `Phone: ${application.phone}`,
      `Position: ${application.position}`,
      application.experience && `Experience: ${application.experience}`,
      application.location && `Location: ${application.location}`,
      application.portfolio && `LinkedIn / Portfolio: ${application.portfolio}`,
      application.cv && `CV file: ${application.cv}`,
      application.message && ["", "Message:", application.message].join("\n"),
    ]
      .filter(Boolean)
      .join("\n");
    const subject = `Career application from ${application.name}`;
    setDraftHref(
      `mailto:${site.careers.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setStatus("ready");
  };

  const field = (name: CareerField) => ({
    name,
    id: `c-${name}`,
    "aria-invalid": errors[name] || undefined,
    "aria-describedby": errors[name] ? `c-${name}-msg` : undefined,
  });
  const fieldClass = (name: CareerField, full = false) =>
    ["fld", full && "full", errors[name] && "err"].filter(Boolean).join(" ");
  const errorText = (name: Exclude<CareerField, "experience" | "message">) => (
    <span className="msg" id={`c-${name}-msg`}>
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
      onInput={onEdit}
      onChange={onEdit}
    >
      <div className={fieldClass("name")}>
        <label htmlFor="c-name">
          Name <i>*</i>
        </label>
        <input
          {...field("name")}
          autoComplete="name"
          required
          maxLength={100}
          placeholder="Enter your name"
        />
        {errorText("name")}
      </div>
      <div className={fieldClass("email")}>
        <label htmlFor="c-email">
          Email <i>*</i>
        </label>
        <input
          {...field("email")}
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="Enter your email"
          suppressHydrationWarning
        />
        {errorText("email")}
      </div>
      <div className={fieldClass("phone")}>
        <label htmlFor="c-phone">Phone</label>
        <input
          {...field("phone")}
          type="tel"
          autoComplete="tel"
          placeholder="Enter your phone number"
          maxLength={30}
        />
        {errorText("phone")}
      </div>
      <div className={fieldClass("position")}>
        <label htmlFor="c-position">
          Position <i>*</i>
        </label>
        <input
          {...field("position")}
          required
          maxLength={120}
          placeholder="Enter the position"
        />
        {errorText("position")}
      </div>
      <div className={fieldClass("experience")}>
        <label htmlFor="c-experience">Experience</label>
        <input {...field("experience")} maxLength={80} placeholder="Enter your experience" />
      </div>
      <div className={fieldClass("location")}>
        <label htmlFor="c-location">Location</label>
        <select {...field("location")} defaultValue="">
          <option value="">Select a location</option>
          {careerLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        {errorText("location")}
      </div>
      <div className={fieldClass("portfolio", true)}>
        <label htmlFor="c-portfolio">LinkedIn / Portfolio</label>
        <input
          {...field("portfolio")}
          type="url"
          placeholder="Enter your LinkedIn or portfolio link"
          maxLength={200}
        />
        {errorText("portfolio")}
      </div>
      <div className={fieldClass("message", true)}>
        <label htmlFor="c-message">Message</label>
        <textarea {...field("message")} maxLength={2000} placeholder="Enter your message" />
      </div>
      <div className={["fld", "full", cvError && "err"].filter(Boolean).join(" ")}>
        <label htmlFor="c-cv">CV</label>
        <input
          ref={cvRef}
          id="c-cv"
          name="cv"
          type="file"
          accept=".pdf,application/pdf"
          aria-invalid={cvError || undefined}
          aria-describedby={cvError ? "c-cv-msg c-cv-note" : "c-cv-note"}
          onChange={onCv}
        />
        <span className="msg" id="c-cv-msg">
          {cvMessage}
        </span>
        <span className="career-field-note" id="c-cv-note">
          {cvName
            ? `${cvName}. Attach this file in your email app before you send.`
            : "PDF only, up to 5 MB. Attach it in your email app before you send."}
        </span>
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
              <b>Email draft prepared.</b> Nothing has been sent.
              {cvName ? ` Attach ${cvName} before you send.` : " "}
              Open the draft and send it from your email app. <a href={draftHref}>Open email draft</a>
            </span>
          </>
        )}
      </div>

      <button type="submit" className="btn btn-red">
        Prepare My Application <Icon name="i-arrow" />
      </button>
    </form>
  );
}
