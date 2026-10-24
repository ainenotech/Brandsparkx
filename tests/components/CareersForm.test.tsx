import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CareersForm } from "@/components/careers/CareersForm";

// postToScript reads the endpoint from the environment, so set it before the form runs.
const SCRIPT_URL = vi.hoisted(() => {
  const url = "https://script.google.com/macros/s/test/exec";
  process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL = url;
  return url;
});

const FAIL_TEXT =
  "Something went wrong. Please try again or email your CV to prashanth@brandsparkx.com.";

const PAYLOAD_KEYS = [
  "formType",
  "name",
  "email",
  "phone",
  "position",
  "experience",
  "location",
  "linkedin",
  "message",
  "resume",
  "hp",
];

describe("CareersForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  async function fillValidForm({
    cv = new File(["cv"], "amina.pdf", { type: "application/pdf" }),
    position = "AI & Automation",
  } = {}) {
    const user = userEvent.setup();
    render(<CareersForm />);
    await user.type(screen.getByLabelText(/^Name/i), "Amina Shah");
    await user.type(screen.getByLabelText(/^Email/i), "amina@example.com");
    await user.type(screen.getByLabelText(/^Phone/i), "+971 50 123 4567");
    await user.selectOptions(screen.getByLabelText(/^Position/i), position);
    await user.type(screen.getByLabelText(/^Experience/i), "4 years");
    await user.selectOptions(screen.getByLabelText(/^Location/i), "Dubai, UAE");
    await user.type(screen.getByLabelText(/LinkedIn \/ Portfolio/i), "https://amina.example");
    await user.upload(screen.getByLabelText(/^CV/i), cv);
    return user;
  }

  it("blocks submission when required fields and the CV are missing", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<CareersForm />);

    fireEvent.click(screen.getByRole("button", { name: /submit application/i }));

    expect(
      screen.getByText("Some fields need attention. Check the highlighted fields and try again."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/^Position/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Choose the team you're applying for.")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Experience/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Enter your experience, e.g. 3 years or Fresher.")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Location/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Choose your location.")).toBeInTheDocument();
    expect(screen.getByLabelText(/^CV/i)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a CV that is not PDF, DOC or DOCX", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm({
      cv: new File(["cv"], "amina.png", { type: "image/png" }),
    });

    await user.click(screen.getByRole("button", { name: /submit application/i }));

    expect(screen.getByLabelText(/^CV/i)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the chosen CV with its size and lets you remove it", async () => {
    const user = userEvent.setup();
    render(<CareersForm />);
    const file = new File(["x".repeat(2048)], "amina-cv.pdf", { type: "application/pdf" });

    await user.upload(screen.getByLabelText(/^CV/i), file);

    expect(screen.getByText("amina-cv.pdf")).toBeInTheDocument();
    expect(screen.getByText("2 KB")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Remove amina-cv.pdf" }));
    expect(screen.queryByText("amina-cv.pdf")).not.toBeInTheDocument();
    expect((screen.getByLabelText(/^CV/i) as HTMLInputElement).files).toHaveLength(0);
  });

  it("posts the application with the same keys, phone in E.164 and the CV as base64", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: /submit application/i }));

    expect(await screen.findByRole("heading", { name: "Thank you, Amina!" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "We've received your application and will be in touch if your profile is a match.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /submit application/i })).not.toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(SCRIPT_URL);
    expect(init.method).toBe("POST");
    expect(init.headers).toBeUndefined();
    const body = JSON.parse(init.body);
    expect(Object.keys(body)).toEqual(PAYLOAD_KEYS);
    expect(body).toEqual({
      formType: "career",
      name: "Amina Shah",
      email: "amina@example.com",
      phone: "+971501234567",
      position: "AI & Automation",
      experience: "4 years",
      location: "Dubai, UAE",
      linkedin: "https://amina.example",
      message: "",
      resume: {
        name: "amina.pdf",
        type: "application/pdf",
        data: `data:application/pdf;base64,${btoa("cv")}`,
      },
      hp: "",
    });
  });

  it('sends the typed role when the position is "Other"', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm({ position: "Other" });

    // An empty "Other" role blocks the submit with its own message.
    await user.click(screen.getByRole("button", { name: /submit application/i }));
    expect(screen.getByText("Enter the position you are applying for.")).toBeInTheDocument();
    const other = screen.getByRole("textbox", { name: "Your position" });
    expect(other).toHaveAttribute("aria-invalid", "true");
    expect(other).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();

    await user.type(other, "Data Analyst");
    await user.click(screen.getByRole("button", { name: /submit application/i }));

    await screen.findByRole("heading", { name: "Thank you, Amina!" });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).position).toBe("Data Analyst");
  });

  it("shows an inline error for an invalid phone and blocks submission", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<CareersForm />);
    const phone = screen.getByLabelText(/^Phone/i);

    await user.type(phone, "+971 50 12");
    await user.tab();

    expect(screen.getByText("Enter a valid number for the selected country.")).toBeInTheDocument();
    expect(phone).toHaveAttribute("aria-invalid", "true");
    await user.click(screen.getByRole("button", { name: /submit application/i }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("disables the button while submitting and ignores double submits", async () => {
    let resolve!: (v: unknown) => void;
    const fetchMock = vi.fn(() => new Promise((r) => (resolve = r)));
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm();

    const submitBtn = screen.getByRole("button", { name: /submit application/i });
    await user.click(submitBtn);
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent("Submitting…");
    fireEvent.submit(submitBtn.closest("form")!);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolve({ json: async () => ({ ok: true }) });
    expect(await screen.findByText(/Thank you, Amina!/i)).toBeInTheDocument();
  });

  it("shows the server's message when it is about the CV", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ ok: false, error: "CV file is larger than 5 MB." }),
      }),
    );
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: /submit application/i }));

    expect(await screen.findByText("CV file is larger than 5 MB.")).toBeInTheDocument();
  });

  it("shows the generic error and keeps the input on other failures", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: /submit application/i }));

    expect(await screen.findByText(FAIL_TEXT)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/i)).toHaveValue("Amina Shah");
    expect(screen.getByLabelText(/^Position/i)).toHaveValue("AI & Automation");
    expect(screen.getByRole("button", { name: /submit application/i })).toBeEnabled();
  });
});
