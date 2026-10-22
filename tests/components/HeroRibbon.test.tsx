import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroRibbon } from "@/components/home/HeroRibbon";

describe("HeroRibbon Component", () => {
  it("renders the outer wrapper with aria-hidden='true'", () => {
    const { container } = render(<HeroRibbon />);
    const wrapper = container.querySelector(".hero-ribbon");
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("renders two ribbon sets, with the duplicate copy marked aria-hidden='true'", () => {
    const { container } = render(<HeroRibbon />);
    const sets = container.querySelectorAll(".hero-ribbon-set");

    expect(sets).toHaveLength(2);
    // Primary set does not have aria-hidden
    expect(sets[0]).not.toHaveAttribute("aria-hidden");
    // Duplicate set has aria-hidden="true"
    expect(sets[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("renders topic items with stars", () => {
    const { container } = render(<HeroRibbon />);
    const items = container.querySelectorAll(".hero-ribbon-item");
    expect(items.length).toBeGreaterThan(0);

    const firstItemText = items[0].textContent;
    expect(firstItemText).toContain("AI Voice Agents");
  });
});
