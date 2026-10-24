"use client";

import {
  BriefcaseIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  LinkSimpleIcon,
  MapPinIcon,
  UploadSimpleIcon,
  UserIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { APPLY_EVENT } from "@/components/careers/CareerBoard";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { IconField } from "@/components/forms/IconField";
import { LazyPhoneField as PhoneField } from "@/components/forms/LazyPhoneField";
import { Icon } from "@/components/Icon";
import { careerLocations, careerPositions } from "@/content/careers";
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

const messages: Record<Exclude<CareerField, "message">, string> = {
  name: "Enter your name.",
  email: "Enter a valid email, like name@company.com.",
  phone: "Enter a valid number for the selected country.",
  position: "Choose the team you're applying for.",
  experience: "Enter your experience, e.g. 3 years or Fresher.",
  location: "Choose your location.",
  portfolio: "Enter a full address starting with http:// or https://.",
};
const otherPositionMessage = "Enter the position you are applying for.";

const cvMessage = "Upload your CV as a PDF, DOC or DOCX file up to 5 MB.";
const cvAccept = [".pdf", ".doc", ".docx", ...cvMimeTypes].join(",");
const failMessage =
  "Something went wrong. Please try again or email your CV to prashanth@brandsparkx.com.";

// Show the script's own message when it is about the CV (type, size or missing file).
const isCvError = (message: string) => /\b(cv|resume|file)\b/i.test(message);

const OTHER = "Other";

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CareersForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const touched = useRef(new Set<CareerField>());
  const cvRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<Record<CareerField, boolean>>>({});
  const [cvError, setCvError] = useState(false);
  const [cv, setCv] = useState<{ name: string; size: number } | null>(null);
  const [cvOver, setCvOver] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(failMessage);
  // Phone is held in E.164 (e.g. "+971501234567"); undefined while empty.
  const [phone, setPhone] = useState<string | undefined>();
  // Team from the select; "Other" reveals a free-text field.
  const [positionChoice, setPositionChoice] = useState("");
  const [positionOther, setPositionOther] = useState("");
  const [sentTo, setSentTo] = useState("");
  // A ref, not state, so a second click before React re-renders is still ignored.
  const sending = useRef(false);

  // "Apply" on a team card: pre-fill Position, bring the form into view, focus Name.
  useEffect(() => {
    const onApply = (event: Event) => {
      const team = (event as CustomEvent<string>).detail;
      setPositionChoice(team);
      setErrors((current) => ({ ...current, position: false }));
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("apply")?.scrollIntoView?.({ behavior: reduce ? "auto" : "smooth" });
      document.getElementById("c-name")?.focus({ preventScroll: true });
    };
    window.addEventListener(APPLY_EVENT, onApply);
    return () => window.removeEventListener(APPLY_EVENT, onApply);
  }, []);

  const selectedCv = () => cvRef.current?.files?.[0] ?? null;

  const checkCv = () => {
    const ok = isCareerCv(selectedCv());
    setCvError(!ok);
    return ok;
  };

  const position = positionChoice === OTHER ? positionOther.trim() : positionChoice;

  const valueOf = (name: CareerField) => {
    if (name === "phone") return phone ?? "";
    if (name === "position") return position;
    const field = formRef.current?.elements.namedItem(name);
    return field && "value" in field ? field.value : "";
  };

  const check = (name: CareerField, value = valueOf(name)) => {
    const ok = careerRules[name](value);
    setErrors((current) => ({ ...current, [name]: !ok }));
    return ok;
  };

  // Fields are matched by id (`c-<name>`), so the phone input and the "Other" position
  // text field, which have no matching name, count too.
  const fieldName = (target: EventTarget) => {
    const name = (target as HTMLElement).id
      ?.replace(/^c-/, "")
      .replace(/-other$/, "") as CareerField;
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
    // Phone and position re-check from their own handlers, once the new value is known.
    if (name && name !== "phone" && name !== "position" && errors[name]) check(name);
  };

  const onPhoneChange = (value?: string) => {
    setPhone(value);
    if (errors.phone) check("phone", value ?? "");
  };

  const onPositionChoice = (value: string) => {
    setPositionChoice(value);
    if (errors.position) check("position", value === OTHER ? positionOther.trim() : value);
  };

  const onPositionOther = (value: string) => {
    setPositionOther(value);
    if (errors.position) check("position", value.trim());
  };

  const onCv = () => {
    const file = selectedCv();
    setCv(file ? { name: file.name, size: file.size } : null);
    if (cvError) checkCv();
  };

  const clearCv = () => {
    if (cvRef.current) cvRef.current.value = "";
    onCv();
    setCvError(false);
    cvRef.current?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const results = careerFields.map((name) => [name, check(name)] as const);
    const firstInvalid = results.find(([, ok]) => !ok)?.[0];
    const cvOk = checkCv();
    const file = selectedCv();
    if (firstInvalid || !cvOk || !file) {
      setStatus("invalid");
      if (firstInvalid === "position" && positionChoice === OTHER) {
        document.getElementById("c-position-other")?.focus();
      } else if (firstInvalid) {
        document.getElementById(`c-${firstInvalid}`)?.focus();
      } else {
        cvRef.current?.focus();
      }
      return;
    }

    sending.current = true;
    setStatus("sending");
    try {
      const data = new FormData(form);
      const read = (name: string) => String(data.get(name) ?? "").trim();
      const name = read("name");
      await postToScript({
        formType: "career",
        name,
        email: read("email"),
        phone: phone ?? "",
        position,
        experience: read("experience"),
        location: read("location"),
        linkedin: read("portfolio"),
        message: read("message"),
        resume: { name: file.name, type: file.type, data: await readAsDataUrl(file) },
        hp: String(data.get("hp") ?? ""),
      });
      form.reset();
      touched.current.clear();
      setErrors({});
      setPhone(undefined);
      setPositionChoice("");
      setPositionOther("");
      setCv(null);
      setCvError(false);
      setSentTo(name.split(/\s+/)[0]);
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

  if (status === "sent") {
    return (
      <FormSuccess
        title={`Thank you${sentTo ? `, ${sentTo}` : ""}!`}
        text="We've received your application and will be in touch if your profile is a match."
      />
    );
  }

  const errorId = (name: CareerField) => `c-${name}-msg`;
  const field = (name: CareerField) => ({
    name,
    id: `c-${name}`,
    "aria-invalid": errors[name] || undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
  });
  const fieldClass = (name: CareerField, full = false) =>
    ["fld", full && "full", errors[name] && "err"].filter(Boolean).join(" ");
  const errorText = (name: Exclude<CareerField, "message">) =>
    errors[name] && (
      <span className="msg" id={errorId(name)}>
        {name === "position" && positionChoice === OTHER ? otherPositionMessage : messages[name]}
      </span>
    );
  const otherInvalid = errors.position && positionChoice === OTHER;

  return (
    <form
      className="form cf-form"
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onBlur={onBlur}
      onInput={onEdit}
      onChange={onEdit}
    >
      <div className={fieldClass("name")}>
        <label htmlFor="c-name">
          Name <i aria-hidden="true">*</i>
        </label>
        <IconField icon={<UserIcon />}>
          <input
            {...field("name")}
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your full name"
          />
        </IconField>
        {errorText("name")}
      </div>
      <div className={fieldClass("email")}>
        <label htmlFor="c-email">
          Email <i aria-hidden="true">*</i>
        </label>
        <IconField icon={<EnvelopeSimpleIcon />}>
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@example.com"
            suppressHydrationWarning
          />
        </IconField>
        {errorText("email")}
      </div>
      <div className={fieldClass("phone")}>
        <label htmlFor="c-phone">Phone</label>
        <PhoneField
          id="c-phone"
          value={phone}
          onChange={onPhoneChange}
          invalid={errors.phone}
          describedBy={errors.phone ? errorId("phone") : undefined}
        />
        {errorText("phone")}
      </div>
      <div className={fieldClass("position")}>
        <label htmlFor="c-position">
          Position <i aria-hidden="true">*</i>
        </label>
        <IconField icon={<UsersThreeIcon />}>
          <select
            id="c-position"
            name="position-choice"
            required
            value={positionChoice}
            onChange={(e) => onPositionChoice(e.target.value)}
            aria-invalid={(errors.position && !otherInvalid) || undefined}
            aria-describedby={errors.position && !otherInvalid ? errorId("position") : undefined}
          >
            <option value="">Select a team</option>
            {careerPositions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </IconField>
        {positionChoice === OTHER && (
          <input
            id="c-position-other"
            name="position-other"
            className="cf-other"
            aria-label="Your position"
            required
            maxLength={120}
            placeholder="Which role are you applying for?"
            value={positionOther}
            onChange={(e) => onPositionOther(e.target.value)}
            aria-invalid={otherInvalid || undefined}
            aria-describedby={otherInvalid ? errorId("position") : undefined}
          />
        )}
        {errorText("position")}
      </div>
      <div className={fieldClass("experience")}>
        <label htmlFor="c-experience">
          Experience <i aria-hidden="true">*</i>
        </label>
        <IconField icon={<BriefcaseIcon />}>
          <input {...field("experience")} required maxLength={80} placeholder="e.g. 3 years" />
        </IconField>
        {errorText("experience")}
      </div>
      <div className={fieldClass("location")}>
        <label htmlFor="c-location">
          Location <i aria-hidden="true">*</i>
        </label>
        <IconField icon={<MapPinIcon />}>
          <select {...field("location")} required defaultValue="">
            <option value="">Select a location</option>
            {careerLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </IconField>
        {errorText("location")}
      </div>
      <div className={fieldClass("portfolio", true)}>
        <label htmlFor="c-portfolio">LinkedIn / Portfolio</label>
        <IconField icon={<LinkSimpleIcon />}>
          <input
            {...field("portfolio")}
            type="url"
            inputMode="url"
            placeholder="https://linkedin.com/in/yourname"
            maxLength={200}
          />
        </IconField>
        {errorText("portfolio")}
      </div>
      <div className={fieldClass("message", true)}>
        <label htmlFor="c-message">Message</label>
        <textarea
          {...field("message")}
          maxLength={2000}
          placeholder="Tell us a little about yourself and what you'd like to work on."
        />
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
          CV <i aria-hidden="true">*</i>
        </label>
        <div
          className={["cv-drop", cv && "has-file", cvOver && "is-over"].filter(Boolean).join(" ")}
        >
          {/* The real file input covers the box, so click and drag-and-drop both work. */}
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
            {cv ? <FileTextIcon /> : <UploadSimpleIcon />}
          </span>
          <span className="cv-drop__text">
            {cv ? (
              <>
                <strong>{cv.name}</strong>
                <small id="c-cv-note">{formatSize(cv.size)}</small>
              </>
            ) : (
              <>
                <strong>
                  <u>Upload your CV</u> or drag it here
                </strong>
                <small id="c-cv-note">PDF, DOC or DOCX, up to 5 MB.</small>
              </>
            )}
          </span>
          {cv && (
            <button
              type="button"
              className="cv-drop__remove"
              onClick={clearCv}
              aria-label={`Remove ${cv.name}`}
            >
              <Icon name="i-x" />
            </button>
          )}
        </div>
        {cvError && (
          <span className="msg" id="c-cv-msg">
            {cvMessage}
          </span>
        )}
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

      <div className="cf-submit">
        <button type="submit" className="btn btn-red" disabled={status === "sending"}>
          {status === "sending" ? "Submitting…" : "Submit application"} <Icon name="i-arrow" />
        </button>
      </div>
    </form>
  );
}
