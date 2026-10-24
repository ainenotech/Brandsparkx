"use client";

import {
  BuildingsIcon,
  CheckIcon,
  EnvelopeSimpleIcon,
  GlobeIcon,
  UserIcon,
} from "@phosphor-icons/react";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { IconField } from "@/components/forms/IconField";
import { LazyPhoneField as PhoneField } from "@/components/forms/LazyPhoneField";
import { Icon } from "@/components/Icon";
import { interests } from "@/content/interests";
import { postToScript } from "@/lib/postToScript";
import { contactFields, contactRules, requiredFields, type ContactField } from "@/lib/validation";

type Status = "idle" | "invalid" | "sending" | "sent" | "failed";

const messages: Record<ContactField, string> = {
  name: "Enter your name.",
  email: "Enter a valid email, like name@company.com.",
  phone: "Enter a valid number for the selected country.",
  message: "Tell us a little about what you need (at least 10 characters).",
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const touched = useRef(new Set<ContactField>());
  // A ref, not state, so a second click before React re-renders is still ignored.
  const sending = useRef(false);
  const [errors, setErrors] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  // Phone is held in E.164 (e.g. "+971501234567"); undefined while empty.
  const [phone, setPhone] = useState<string | undefined>();
  const [sentTo, setSentTo] = useState("");

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
    name === "phone"
      ? (phone ?? "")
      : ((formRef.current?.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "");

  const check = (name: ContactField, value = valueOf(name)) => {
    const ok = contactRules[name](value);
    setErrors((e) => ({ ...e, [name]: !ok }));
    return ok;
  };

  // Blur and input events bubble up to the form, so one handler covers every field.
  // Fields are matched by id (`f-<name>`) so the phone input, which has no name, counts too.
  const fieldName = (target: EventTarget) => {
    const name = (target as HTMLElement).id?.replace(/^f-/, "") as ContactField;
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
    // Phone re-checks from its own onChange, once the new value is known.
    if (name && name !== "phone" && errors[name]) check(name);
  };

  const onPhoneChange = (value?: string) => {
    setPhone(value);
    if (errors.phone) check("phone", value ?? "");
  };

  // Enter toggles a service chip like Space does (instead of submitting the form).
  const onChipKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending.current) return;
    const form = e.currentTarget;
    const results = contactFields.map((name) => [name, check(name)] as const);
    const firstInvalid = results.find(([, ok]) => !ok)?.[0];
    if (firstInvalid) {
      setStatus("invalid");
      form.querySelector<HTMLElement>(`#f-${firstInvalid}`)?.focus();
      return;
    }

    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: phone ?? "",
      website: String(fd.get("website") ?? "").trim(),
      services: fd.getAll("interest").map(String),
      message: String(fd.get("message") ?? "").trim(),
      hp: String(fd.get("hp") ?? ""),
    };

    sending.current = true;
    setStatus("sending");
    try {
      await postToScript(payload);
      form.reset();
      touched.current.clear();
      setErrors({});
      setPhone(undefined);
      setSentTo(payload.name.split(/\s+/)[0]);
      setStatus("sent");
    } catch (err) {
      console.error("Contact form submission failed", err);
      setStatus("failed");
    } finally {
      sending.current = false;
    }
  };

  if (status === "sent") {
    return (
      <FormSuccess
        title={`Thank you${sentTo ? `, ${sentTo}` : ""}!`}
        text="We've received your message and will get back to you within 24 hours."
      >
        <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </FormSuccess>
    );
  }

  // Shared props for each validated field.
  const field = (name: ContactField, hint?: boolean) => {
    const described = [hint && !errors[name] && `f-${name}-hint`, errors[name] && `f-${name}-msg`]
      .filter(Boolean)
      .join(" ");
    return {
      id: `f-${name}`,
      "aria-invalid": errors[name] || undefined,
      "aria-describedby": described || undefined,
    };
  };
  const fieldClass = (name: ContactField, full = false) =>
    ["fld", full && "full", errors[name] && "err"].filter(Boolean).join(" ");
  const errorText = (name: ContactField) =>
    errors[name] && (
      <span className="msg" id={`f-${name}-msg`}>
        {messages[name]}
      </span>
    );

  return (
    <form
      className="form cf-form"
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onBlur={onBlur}
      onInput={onInput}
    >
      <div className={fieldClass("name")}>
        <label htmlFor="f-name">
          Name <i aria-hidden="true">*</i>
        </label>
        <IconField icon={<UserIcon />}>
          <input
            {...field("name")}
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your full name"
          />
        </IconField>
        {errorText("name")}
      </div>
      <div className="fld">
        <label htmlFor="f-company">Company</label>
        <IconField icon={<BuildingsIcon />}>
          <input
            id="f-company"
            name="company"
            autoComplete="organization"
            maxLength={120}
            placeholder="Company name"
          />
        </IconField>
      </div>
      <div className={fieldClass("email")}>
        <label htmlFor="f-email">
          Work email <i aria-hidden="true">*</i>
        </label>
        <IconField icon={<EnvelopeSimpleIcon />}>
          <input
            {...field("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
            suppressHydrationWarning
          />
        </IconField>
        {errorText("email")}
      </div>
      <div className={fieldClass("phone")}>
        <label htmlFor="f-phone">WhatsApp / phone</label>
        <PhoneField
          id="f-phone"
          value={phone}
          onChange={onPhoneChange}
          invalid={errors.phone}
          describedBy={field("phone")["aria-describedby"]}
        />
        {errorText("phone")}
      </div>
      {/* Optional and not validated: any form of address is fine (www.…, https://…). */}
      <div className="fld full">
        <label htmlFor="f-website">Website</label>
        <IconField icon={<GlobeIcon />}>
          <input
            id="f-website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            maxLength={200}
            placeholder="yourwebsite.com"
          />
        </IconField>
      </div>
      <fieldset className="fld full cf-services" aria-describedby="f-services-hint">
        <legend>What are you looking to improve?</legend>
        <span className="cf-hint" id="f-services-hint">
          Select all that apply
        </span>
        <div className="opts">
          {interests.map((x) => (
            <label key={x}>
              <input type="checkbox" name="interest" value={x} onKeyDown={onChipKey} />
              <span>
                <CheckIcon className="cf-chip-check" weight="bold" aria-hidden="true" />
                {x}
              </span>
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
          Message <i aria-hidden="true">*</i>
        </label>
        <textarea
          {...field("message", true)}
          name="message"
          required
          maxLength={2000}
          placeholder="What would you like to improve, automate or build?"
        />
        {errors.message ? (
          errorText("message")
        ) : (
          <span className="cf-hint" id="f-message-hint">
            At least 10 characters
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
            <span>
              Something went wrong. Please try again or email us at{" "}
              <a href="mailto:prasant@brandsparkx.com">prasant@brandsparkx.com</a>.
            </span>
          </>
        )}
      </div>

      <div className="cf-submit">
        <button type="submit" className="btn btn-red" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"} <Icon name="i-arrow" />
        </button>
        <p>We reply within 24 hours. Your details stay private.</p>
      </div>
    </form>
  );
}
