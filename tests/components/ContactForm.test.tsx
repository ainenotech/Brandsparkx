import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

describe("ContactForm Component", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "" },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
  });

  it("shows error messages on blur when required fields are empty", async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Work email/i);
    const messageInput = screen.getByLabelText(/Message/i);

    // Blur name without input
    fireEvent.blur(nameInput);
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("aria-invalid", "true");

    // Blur email without input
    fireEvent.blur(emailInput);
    expect(screen.getByText("Enter a valid email, like name@company.com.")).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");

    // Blur message without input
    fireEvent.blur(messageInput);
    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    expect(messageInput).toHaveAttribute("aria-invalid", "true");
  });

  it("blocks form submission when invalid and displays error banner", async () => {
    render(<ContactForm />);
    const submitBtn = screen.getByRole("button", { name: /prepare email draft/i });

    fireEvent.click(submitBtn);

    expect(
      screen.getByText("Some fields need attention. Check the highlighted fields and try again."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Email draft prepared/i)).not.toBeInTheDocument();
  });

  it("builds the correct mailto URL with encoded subject and body when form is valid", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Work email/i);
    const phoneInput = screen.getByLabelText(/WhatsApp \/ phone/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const voiceInterestCheckbox = screen.getByRole("checkbox", { name: "AI Voice & Calling" });

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "jane@example.com");
    await user.type(phoneInput, "+971 50 123 4567");
    await user.type(messageInput, "We want to build an AI voice assistant for appointments.");
    await user.click(voiceInterestCheckbox);

    const submitBtn = screen.getByRole("button", { name: /prepare email draft/i });
    await user.click(submitBtn);

    const statusBanner = screen.getByRole("status");
    expect(statusBanner).toBeInTheDocument();
    expect(screen.getByText(/Email draft prepared/i)).toBeInTheDocument();

    const openDraftLink = screen.getByRole("link", { name: /open email draft/i });
    const href = openDraftLink.getAttribute("href");

    expect(href).not.toBeNull();
    expect(href).toContain(`mailto:${site.email}?subject=`);
    expect(href).toContain(encodeURIComponent("Project enquiry from Jane Doe"));
    expect(href).toContain(encodeURIComponent("Work email: jane@example.com"));
    expect(href).toContain(encodeURIComponent("Interested in: AI Voice & Calling"));
    expect(href).toContain(
      encodeURIComponent("We want to build an AI voice assistant for appointments."),
    );
  });

  it("preselects the interest checkbox when ?interest= is in query string", () => {
    window.location.search = "?interest=AI%20Voice%20%26%20Calling";

    render(<ContactForm />);

    const voiceCheckbox = screen.getByRole("checkbox", {
      name: "AI Voice & Calling",
    }) as HTMLInputElement;
    const salesCheckbox = screen.getByRole("checkbox", {
      name: "AI Sales",
    }) as HTMLInputElement;

    expect(voiceCheckbox.checked).toBe(true);
    expect(salesCheckbox.checked).toBe(false);
  });
});
