import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CaseCards } from "@/components/home/CaseCards";
import { cases, type CaseStudy } from "@/content/cases";

describe("CaseCards", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    });
  });

  it("shows example use cases without demo labels or placeholder impact text", () => {
    const { container } = render(<CaseCards items={cases} />);

    expect(container).not.toHaveTextContent(/Demonstration project/i);
    expect(container).not.toHaveTextContent(/Demo ·/);
    expect(container).not.toHaveTextContent(/Verified results to be added/i);
    expect(screen.queryByText("Impact")).not.toBeInTheDocument();
    expect(screen.getByText("Real estate")).toBeInTheDocument();
  });

  it("shows the impact once a verified result exists", () => {
    const verified: CaseStudy = { ...cases[0], impact: "Approved outcome text.", published: true };
    render(<CaseCards items={[verified]} />);

    expect(screen.getByText("Impact")).toBeInTheDocument();
    expect(screen.getByText("Approved outcome text.")).toBeInTheDocument();
  });
});
