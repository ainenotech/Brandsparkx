import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FlowDiagram } from "@/components/flow/FlowDiagram";
import { LinearFlow } from "@/components/flow/LinearFlow";
import { contentFlow, growthFlow } from "@/content/flows";

describe("FlowDiagram", () => {
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
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    );
  });

  it("renders three inputs and a hidden step list", () => {
    const { container } = render(<FlowDiagram flow={growthFlow} />);

    expect(screen.getByRole("figure", { name: growthFlow.ariaSummary })).toBeInTheDocument();
    expect(screen.getByText("Website & ads")).toBeInTheDocument();
    expect(screen.getByText("Calls & WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Your tools")).toBeInTheDocument();
    expect(screen.getByText("BrandSparkX AI")).toBeInTheDocument();
    expect(screen.getByText("Nothing missed")).toBeInTheDocument();
    expect(screen.getByText("Qualified leads")).toBeInTheDocument();

    const steps = container.querySelector(".dflow-sr");
    expect(steps).not.toBeNull();
    expect(steps?.querySelectorAll("li")).toHaveLength(4);
    expect(steps).toHaveTextContent("Inputs:");
    expect(steps).toHaveTextContent("Results:");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll(".dflow-line")).toHaveLength(7);
  });

  it("draws a straight input wire for the one-input content flow", () => {
    const { container } = render(<FlowDiagram flow={contentFlow} />);

    expect(screen.getByText("One brief")).toBeInTheDocument();
    expect(screen.getByText("BrandSparkX Content Engine")).toBeInTheDocument();
    expect(screen.getByText("Videos & avatars")).toBeInTheDocument();
    expect(screen.getByText("Social posts")).toBeInTheDocument();
    expect(screen.getByText("Ad copy")).toBeInTheDocument();
    expect(container.querySelector(".dflow-sr")?.querySelectorAll("li")).toHaveLength(4);
    expect(container.querySelector(".dflow-line")).toHaveAttribute("d", "M 180,108 V 204");
    expect(container.querySelectorAll(".dflow-line")).toHaveLength(5);
  });

  it("renders five linear steps from the process copy", () => {
    render(<LinearFlow />);

    for (const title of ["Understand", "Strategize", "Build", "Automate", "Scale"]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(
      screen.getByText("We understand your business, goals, processes and challenges."),
    ).toBeInTheDocument();
  });
});
