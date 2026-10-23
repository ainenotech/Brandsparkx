"use client";

import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { careerLocations } from "@/content/careers";
import { postToScript } from "@/lib/postToScript";
import {
  careerFields,
  careerRequiredFields,
  careerRules,
  cvMimeTypes,
  isCareerCv,
  type CareerField,
} from "@/lib/validation";

type Status = "idle" | "invalid" | "sending" | "sent" | "failed";

const messages: Record<Exclude<CareerField, "experience" | "message">, string> = {
  name: "Enter your name.",
  email: "Enter a valid email, like name@company.com.",
  phone: "Use digits, spaces and an optional leading +.",
  position: "Enter the position you are applying for.",
  location: "Choose a location.",
  portfolio: "Enter a full address starting with http:// or https://.",
};

const cvMessage = "Upload your CV as a PDF, DOC or DOCX file up to 5 MB.";
const cvAccept = [".pdf", ".doc", ".docx", ...cvMimeTypes].join(",");
const failMessage =
  "Something went wrong. Please try again or email your CV to prashanth@brandsparkx.com.";

// Show the script's own message when it is about the CV (type, size or missing file).
const isCvError = (message: string) => /\b(cv|resume|file)\b/i.test(message);

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function CareersForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const touched = useRef(new Set<CareerField>());
  const cvRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<Record<CareerField, boolean>>>({});
  const [cvError, setCvError] = useState(false);
  const [cvName, setCvName] = useState("");
  const [cvOver, setCvOver] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(failMessage);
  // A ref, not state, so a second click before React re-renders is still ignored.
  const sending = useRef(false);

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
    if (status === "sent") setStatus("idle");
  };

  const onCv = () => {
    setCvName(selectedCv()?.name ?? "");
    if (cvError) checkCv();
    if (status === "sent") setStatus("idle");
  };

  const clearCv = () => {
    if (cvRef.current) cvRef.current.value = "";
    onCv();
    setCvError(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const results = careerFields.map((name) => [name, check(name)] as const);
    const firstInvalid = results.find(([, ok]) => !ok)?.[0];
    const cvOk = checkCv();
    const cv = selectedCv();
    if (firstInvalid || !cvOk || !cv) {
      setStatus("invalid");
      if (firstInvalid) (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      else cvRef.current?.focus();
      return;
    }

    sending.current = true;
    setStatus("sending");
    try {
      const data = new FormData(form);
      const read = (name: string) => String(data.get(name) ?? "").trim();
      await postToScript({
        formType: "career",
        name: read("name"),
        email: read("email"),
        phone: read("phone"),
        position: read("position"),
        experience: read("experience"),
        location: read("location"),
        linkedin: read("portfolio"),
        message: read("message"),
        resume: { name: cv.name, type: cv.type, data: await readAsDataUrl(cv) },
        hp: String(data.get("hp") ?? ""),
      });
      form.reset();
      if (cvRef.current) cvRef.current.value = "";
      setCvName("");
      setCvError(false);
      touched.current.clear();
      setErrors({});
      setStatus("sent");
    } catch (err) {
      console.error("Career application failed", err);
      const message = err instanceof Error ? err.message : "";
      setError(isCvError(message) ? message : failMessage);
      setStatus("failed");
    } finally {
      sending.current = false;
    }
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
        <input {...field("position")} required maxLength={120} placeholder="Enter the position" />
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
      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped server-side. */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <div className={["fld", "full", cvError && "err"].filter(Boolean).join(" ")}>
        <label htmlFor="c-cv">
          CV <i>*</i>
        </label>
        <div
          className={["cv-drop", cvName && "has-file", cvOver && "is-over"]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            ref={cvRef}
            id="c-cv"
            name="cv"
            type="file"
            accept={cvAccept}
            aria-invalid={cvError || undefined}
            aria-describedby={cvError ? "c-cv-msg c-cv-note" : "c-cv-note"}
            onChange={onCv}
            onDragEnter={() => setCvOver(true)}
            onDragLeave={() => setCvOver(false)}
            onDrop={() => setCvOver(false)}
          />
          <span className="cv-drop__icon" aria-hidden="true">
            <Icon name={cvName ? "i-check" : "i-up"} />
          </span>
          <span className="cv-drop__text">
            <strong>
              {cvName || (
                <>
                  <u>Upload your CV</u> or drag it here
                </>
              )}
            </strong>
            <small id="c-cv-note">PDF, DOC or DOCX, up to 5 MB.</small>
          </span>
          {cvName && (
            <button
              type="button"
              className="cv-drop__remove"
              onClick={clearCv}
              aria-label="Remove CV"
            >
              <Icon name="i-x" />
            </button>
          )}
        </div>
        <span className="msg" id="c-cv-msg">
          {cvMessage}
        </span>
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
            <span>{error}</span>
          </>
        )}
      </div>
      <div className={status === "sent" ? "fstate s show" : "fstate s"} role="status">
        {status === "sent" && (
          <>
            <Icon name="i-mail" />
            <span>
              <b>Thank you!</b> We&apos;ve received your application and will be in touch if your
              profile is a match.
            </span>
          </>
        )}
      </div>

      <button type="submit" className="btn btn-red" disabled={status === "sending"}>
        {status === "sending" ? "Submitting…" : "Submit application"} <Icon name="i-arrow" />
      </button>
    </form>
  );
}
