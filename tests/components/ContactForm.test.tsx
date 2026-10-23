import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/contact/ContactForm";

// The component reads the endpoint at module load, so set it before the import runs.
const SCRIPT_URL = vi.hoisted(() => {
  const url = "https://script.google.com/macros/s/test/exec";
  process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL = url;
  return url;
});

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
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
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
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const submitBtn = screen.getByRole("button", { name: /send message/i });

    fireEvent.click(submitBtn);

    expect(
      screen.getByText("Some fields need attention. Check the highlighted fields and try again."),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  async function fillValidForm() {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/Work email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/WhatsApp \/ phone/i), "+971 50 123 4567");
    await user.type(
      screen.getByLabelText(/Message/i),
      "We want to build an AI voice assistant for appointments.",
    );
    await user.click(screen.getByRole("checkbox", { name: "AI Voice & Calling" }));
    await user.click(screen.getByRole("checkbox", { name: "AI Sales" }));
    return user;
  }

  it("posts the payload as a simple text/plain request and resets on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/Thank you!/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(SCRIPT_URL);
    expect(init.method).toBe("POST");
    expect(init.headers).toBeUndefined();
    expect(JSON.parse(init.body)).toEqual({
      name: "Jane Doe",
      company: "",
      email: "jane@example.com",
      phone: "+971 50 123 4567",
      website: "",
      services: expect.arrayContaining(["AI Sales", "AI Voice & Calling"]),
      message: "We want to build an AI voice assistant for appointments.",
      hp: "",
    });
    expect(screen.getByLabelText(/Name/i)).toHaveValue("");
  });

  it("disables the button while sending and ignores double submits", async () => {
    let resolve!: (v: unknown) => void;
    const fetchMock = vi.fn(() => new Promise((r) => (resolve = r)));
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm();

    const submitBtn = screen.getByRole("button", { name: /send message/i });
    await user.click(submitBtn);
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent("Sending…");
    fireEvent.submit(submitBtn.closest("form")!);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolve({ json: async () => ({ ok: true }) });
    expect(await screen.findByText(/Thank you!/i)).toBeInTheDocument();
  });

  it("shows an error and keeps the input when the script returns ok:false", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: async () => ({ ok: false, error: "boom" }) }),
    );
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toHaveValue("Jane Doe");
    expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled();
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
