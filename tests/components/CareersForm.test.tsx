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

describe("CareersForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  async function fillValidForm(cv = new File(["cv"], "amina.pdf", { type: "application/pdf" })) {
    const user = userEvent.setup();
    render(<CareersForm />);
    await user.type(screen.getByLabelText(/^Name/i), "Amina Shah");
    await user.type(screen.getByLabelText(/^Email/i), "amina@example.com");
    await user.type(screen.getByLabelText(/^Phone/i), "+971 50 123 4567");
    await user.type(screen.getByLabelText(/^Position/i), "AI Engineer");
    await user.type(screen.getByLabelText(/^Experience/i), "4 years");
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
    expect(screen.getByLabelText(/^CV/i)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a CV that is not PDF, DOC or DOCX", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm(new File(["cv"], "amina.png", { type: "image/png" }));

    await user.click(screen.getByRole("button", { name: /submit application/i }));

    expect(screen.getByLabelText(/^CV/i)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the application with the CV as base64 and resets on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: /submit application/i }));

    expect(await screen.findByText(/Thank you!/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(SCRIPT_URL);
    expect(init.method).toBe("POST");
    expect(init.headers).toBeUndefined();
    expect(JSON.parse(init.body)).toEqual({
      formType: "career",
      name: "Amina Shah",
      email: "amina@example.com",
      phone: "+971 50 123 4567",
      position: "AI Engineer",
      experience: "4 years",
      location: "",
      linkedin: "https://amina.example",
      message: "",
      resume: {
        name: "amina.pdf",
        type: "application/pdf",
        data: `data:application/pdf;base64,${btoa("cv")}`,
      },
      hp: "",
    });
    expect(screen.getByLabelText(/^Name/i)).toHaveValue("");
    expect((screen.getByLabelText(/^CV/i) as HTMLInputElement).files).toHaveLength(0);
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
    expect(await screen.findByText(/Thank you!/i)).toBeInTheDocument();
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
    expect(screen.getByRole("button", { name: /submit application/i })).toBeEnabled();
  });
});
