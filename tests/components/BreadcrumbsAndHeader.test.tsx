import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/layout/Header";
import { nav } from "@/content/site";

describe("Breadcrumbs Component", () => {
  it("renders a breadcrumb trail starting with Home", () => {
    const items = [
      { name: "Solutions", path: "/solutions" },
      { name: "AI Voice & Calling", path: "/ai-voice-calling" },
    ];
    render(<Breadcrumbs items={items} />);

    const navElement = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(navElement).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");

    const solutionsLink = screen.getByRole("link", { name: "Solutions" });
    expect(solutionsLink).toHaveAttribute("href", "/solutions");

    const currentPage = screen.getByText("AI Voice & Calling");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });
});

describe("Header Component", () => {
  it("renders primary and mobile navigation with all configured nav links", () => {
    render(<Header />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(primaryNav).toBeInTheDocument();

    for (const item of nav) {
      const link = primaryNav.querySelector(`a[href="${item.href}"]`);
      expect(link).not.toBeNull();
      expect(link?.textContent).toBe(item.label);
    }
  });

  it("toggles the mobile menu on burger click and closes on Escape", () => {
    render(<Header />);

    const burger = screen.getByRole("button", { name: /Open menu/i });
    expect(burger).toHaveAttribute("aria-expanded", "false");
    expect(document.body.classList.contains("menu-open")).toBe(false);

    // Open menu
    fireEvent.click(burger);
    expect(burger).toHaveAttribute("aria-expanded", "true");
    expect(document.body.classList.contains("menu-open")).toBe(true);

    // Close on Escape key
    fireEvent.keyDown(window, { key: "Escape" });
    expect(burger).toHaveAttribute("aria-expanded", "false");
    expect(document.body.classList.contains("menu-open")).toBe(false);
  });
});
