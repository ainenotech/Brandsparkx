import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

describe("Footer Component", () => {
  it("renders Contact us and Careers headings with correct tel: and mailto: links", () => {
    render(<Footer />);

    expect(screen.getByRole("heading", { name: "Contact us" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Careers" })).toBeInTheDocument();

    // Check contact phone and email
    const contactPhoneLink = screen.getByRole("link", {
      name: new RegExp(site.phone.replace("+", "\\+"), "i"),
    });
    expect(contactPhoneLink).toHaveAttribute("href", site.phoneHref);

    const contactEmailLink = screen.getByRole("link", {
      name: new RegExp(site.email, "i"),
    });
    expect(contactEmailLink).toHaveAttribute("href", `mailto:${site.email}`);

    // Check careers phone and email
    const careersPhoneLink = screen.getByRole("link", {
      name: new RegExp(site.careers.phone.replace("+", "\\+"), "i"),
    });
    expect(careersPhoneLink).toHaveAttribute("href", site.careers.phoneHref);

    const careersEmailLink = screen.getByRole("link", {
      name: new RegExp(site.careers.email, "i"),
    });
    expect(careersEmailLink).toHaveAttribute("href", `mailto:${site.careers.email}`);

    expect(screen.getByRole("link", { name: "View careers" })).toHaveAttribute("href", "/careers");
  });

  it("ensures solutions list starts with 'AI Voice & Calling'", () => {
    render(<Footer />);

    const solutionsHeading = screen.getByRole("heading", { name: "Solutions" });
    const solutionsColumn = solutionsHeading.closest("div")!;
    const solutionLinks = solutionsColumn.querySelectorAll("ul li a");

    expect(solutionLinks.length).toBeGreaterThan(0);
    expect(solutionLinks[0].textContent).toBe("AI Voice & Calling");
    expect(solutionLinks[0].getAttribute("href")).toBe("/ai-voice-calling");
  });

  it("leaves AI Marketing and AI Sales out of the footer solutions", () => {
    render(<Footer />);

    expect(screen.queryByRole("link", { name: "AI Marketing" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "AI Sales" })).not.toBeInTheDocument();
  });

  it("shows office names only, each opening its full address in Google Maps", () => {
    const { container } = render(<Footer />);

    for (const office of site.offices) {
      const link = screen.getByRole("link", {
        name: `Open ${office.city} office in Google Maps`,
      });
      expect(link).toHaveTextContent(office.city);
      expect(link).toHaveAttribute(
        "href",
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`,
      );
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(container).not.toHaveTextContent(office.address);
    }
  });

  it("puts the WhatsApp and Email buttons beside the Contact us link", () => {
    render(<Footer />);

    const row = screen.getByRole("link", { name: "Contact us" }).closest(".cl-row")!;
    expect(row).not.toBeNull();
    expect(within(row as HTMLElement).getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      site.whatsappHref,
    );
    expect(within(row as HTMLElement).getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });
});
