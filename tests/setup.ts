import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { priority: _priority, ...rest } = props;
    void _priority;
    return React.createElement("img", {
      ...rest,
      alt: typeof rest.alt === "string" ? rest.alt : "",
    });
  },
}));
