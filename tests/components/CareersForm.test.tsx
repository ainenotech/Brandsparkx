import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CareersForm } from "@/components/careers/CareersForm";
import { site } from "@/content/site";

describe("CareersForm", () => {
  it("blocks submission when required fields are empty", () => {
    render(<CareersForm />);

    fireEvent.click(screen.getByRole("button", { name: /prepare my application/i }));

    expect(
      screen.getByText("Some fields need attention. Check the highlighted fields and try again."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Email draft prepared/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/^Position/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("builds a mailto draft with required fields and only the optional fields that were filled", async () => {
    const user = userEvent.setup();
    render(<CareersForm />);

    await user.type(screen.getByLabelText(/^Name/i), "Amina Shah");
    await user.type(screen.getByLabelText(/^Email/i), "amina@example.com");
    await user.type(screen.getByLabelText(/^Phone/i), "+971 50 123 4567");
    await user.type(screen.getByLabelText(/^Position/i), "AI Engineer");
    await user.type(screen.getByLabelText(/^Experience/i), "4 years");
    await user.type(screen.getByLabelText(/LinkedIn \/ Portfolio/i), "https://amina.example");
    await user.upload(
      screen.getByLabelText(/^CV/i),
      new File(["cv"], "amina.pdf", { type: "application/pdf" }),
    );

    await user.click(screen.getByRole("button", { name: /prepare my application/i }));

    expect(screen.getByText(/Email draft prepared/i)).toBeInTheDocument();
    const href = screen.getByRole("link", { name: /open email draft/i }).getAttribute("href");

    expect(href).toContain(`mailto:${site.careers.email}?subject=`);
    expect(href).toContain(encodeURIComponent("Career application from Amina Shah"));
    expect(href).toContain(encodeURIComponent("Email: amina@example.com"));
    expect(href).toContain(encodeURIComponent("Phone: +971 50 123 4567"));
    expect(href).toContain(encodeURIComponent("Position: AI Engineer"));
    expect(href).toContain(encodeURIComponent("Experience: 4 years"));
    expect(href).toContain(encodeURIComponent("LinkedIn / Portfolio: https://amina.example"));
    expect(href).toContain(encodeURIComponent("CV file: amina.pdf"));
    expect(href).not.toContain(encodeURIComponent("Location:"));
    expect(href).not.toContain(encodeURIComponent("Message:"));
  });

  it("clears the prepared draft when a field changes", async () => {
    const user = userEvent.setup();
    render(<CareersForm />);

    await user.type(screen.getByLabelText(/^Name/i), "Amina Shah");
    await user.type(screen.getByLabelText(/^Email/i), "amina@example.com");
    await user.type(screen.getByLabelText(/^Position/i), "AI Engineer");
    await user.click(screen.getByRole("button", { name: /prepare my application/i }));

    expect(screen.getByText(/Email draft prepared/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^Message/i), "I build agents.");

    expect(screen.queryByText(/Email draft prepared/i)).not.toBeInTheDocument();
  });
});
