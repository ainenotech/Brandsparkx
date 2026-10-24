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

/** Pretends the browser is in the given IANA time zone. */
function mockTimeZone(timeZone: string) {
  const real = Intl.DateTimeFormat;
  vi.spyOn(Intl, "DateTimeFormat").mockImplementation(((
    ...args: ConstructorParameters<typeof Intl.DateTimeFormat>
  ) => {
    const fmt = new real(...args);
    const resolved = fmt.resolvedOptions();
    fmt.resolvedOptions = () => ({ ...resolved, timeZone });
    return fmt;
  }) as unknown as typeof Intl.DateTimeFormat);
}

const countryButton = () => screen.getByRole("button", { name: /Country code/i });

describe("ContactForm Component", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "" },
      writable: true,
      configurable: true,
    });
    mockTimeZone("Asia/Dubai");
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

    // Blur message without input: the hint is replaced by the error
    expect(screen.getByText("At least 10 characters")).toBeInTheDocument();
    fireEvent.blur(messageInput);
    expect(screen.getByText(/Tell us a little about what you need/i)).toBeInTheDocument();
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
    // National format for the preselected UAE.
    await user.type(screen.getByLabelText(/WhatsApp \/ phone/i), "50 123 4567");
    await user.type(
      screen.getByLabelText(/Message/i),
      "We want to build an AI voice assistant for appointments.",
    );
    await user.click(screen.getByRole("checkbox", { name: "AI Voice & Calling" }));
    await user.click(screen.getByRole("checkbox", { name: "AI Sales" }));
    return user;
  }

  it("posts the payload with the phone in E.164 and shows a personal confirmation", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByRole("heading", { name: "Thank you, Jane!" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(SCRIPT_URL);
    expect(init.method).toBe("POST");
    expect(init.headers).toBeUndefined();
    expect(JSON.parse(init.body)).toEqual({
      name: "Jane Doe",
      company: "",
      email: "jane@example.com",
      phone: "+971501234567",
      website: "",
      services: expect.arrayContaining(["AI Sales", "AI Voice & Calling"]),
      message: "We want to build an AI voice assistant for appointments.",
      hp: "",
    });

    // "Send another message" brings back an empty form.
    await user.click(screen.getByRole("button", { name: "Send another message" }));
    expect(screen.getByLabelText(/Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/WhatsApp \/ phone/i)).toHaveValue("");
  });

  it("accepts any website text without validating it", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/Work email/i), "jane@example.com");
    const website = screen.getByLabelText(/Website/i);
    await user.type(website, "www.brandsparkx.com");
    await user.tab();
    expect(website).not.toHaveAttribute("aria-invalid");
    await user.type(screen.getByLabelText(/Message/i), "Just a quick question for you.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await screen.findByRole("heading", { name: "Thank you, Jane!" });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).website).toBe("www.brandsparkx.com");
  });

  it("sends an empty phone when the optional field is left blank", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/Work email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/Message/i), "Just a quick question for you.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await screen.findByRole("heading", { name: "Thank you, Jane!" });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).phone).toBe("");
  });

  it("shows an inline error for an invalid phone number and blocks submission", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    const phone = screen.getByLabelText(/WhatsApp \/ phone/i);

    await user.type(phone, "50 12");
    await user.tab();

    expect(screen.getByText("Enter a valid number for the selected country.")).toBeInTheDocument();
    expect(phone).toHaveAttribute("aria-invalid", "true");

    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(fetchMock).not.toHaveBeenCalled();

    // Completing the number clears the error.
    await user.type(phone, "3 4567");
    expect(
      screen.queryByText("Enter a valid number for the selected country."),
    ).not.toBeInTheDocument();
  });

  it("defaults the country to the UAE, or India for an Indian time zone", () => {
    const { unmount } = render(<ContactForm />);
    expect(countryButton()).toHaveTextContent("+971");
    unmount();

    vi.restoreAllMocks();
    mockTimeZone("Asia/Kolkata");
    render(<ContactForm />);
    expect(countryButton()).toHaveTextContent("+91");
  });

  it("lists priority countries first and lets you search and pick with the keyboard", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    countryButton().focus();
    await user.keyboard("{ArrowDown}");
    const search = screen.getByRole("combobox", { name: "Search countries" });
    expect(search).toHaveFocus();

    // Accessible names are "<country> <dial code>"; the flags are decorative.
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveAccessibleName("United Arab Emirates +971");
    const names = options.map((o) => o.querySelector(".cs__name")?.textContent);
    expect(names.slice(0, 9)).toEqual([
      "United Arab Emirates",
      "India",
      "Saudi Arabia",
      "Qatar",
      "Oman",
      "Kuwait",
      "Bahrain",
      "United States",
      "United Kingdom",
    ]);
    expect(screen.getByRole("option", { name: /United Arab Emirates/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.type(search, "saudi");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{Enter}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(countryButton()).toHaveTextContent("+966");
    expect(countryButton()).toHaveFocus();
  });

  it("toggles service chips with Enter and Space without submitting", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    const chip = screen.getByRole("checkbox", { name: "AI Growth" });

    chip.focus();
    await user.keyboard("{Enter}");
    expect(chip).toBeChecked();
    await user.keyboard(" ");
    expect(chip).not.toBeChecked();
    expect(fetchMock).not.toHaveBeenCalled();
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
    expect(await screen.findByText(/Thank you, Jane!/i)).toBeInTheDocument();
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
