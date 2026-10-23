import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CareerBoard } from "@/components/careers/CareerBoard";
import { CareersForm } from "@/components/careers/CareersForm";
import { careerCategories, careerPage } from "@/content/careers";

describe("CareerBoard", () => {
  const count = (label: string) =>
    screen.getByText((_, node) => {
      if (!node?.classList.contains("job-board-count")) return false;
      return (node.textContent ?? "").replace(/\s+/g, " ").trim() === label;
    });

  it("lists every team and filters by the search", async () => {
    const user = userEvent.setup();
    render(
      <CareerBoard
        title={careerPage.opportunities.title}
        note={careerPage.opportunities.note}
        categories={careerCategories}
      />,
    );

    expect(screen.getByRole("heading", { name: "AI & Automation" })).toBeInTheDocument();
    expect(count("Active 4 teams")).toBeInTheDocument();

    await user.type(screen.getByRole("searchbox", { name: "Search by role" }), "seo");

    expect(screen.getByRole("heading", { name: "Creative & Digital Marketing" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "AI & Automation" })).not.toBeInTheDocument();
    expect(count("Active 1 team")).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(
      <CareerBoard
        title={careerPage.opportunities.title}
        note={careerPage.opportunities.note}
        categories={careerCategories}
      />,
    );

    await user.type(screen.getByRole("searchbox", { name: "Search by role" }), "zzzz");

    expect(screen.getByText("No teams match that search.")).toBeInTheDocument();
    expect(count("Active 0 teams")).toBeInTheDocument();
  });

  it("fills the application position from the team the user applies for", async () => {
    const user = userEvent.setup();
    render(
      <>
        <CareerBoard
          title={careerPage.opportunities.title}
          note={careerPage.opportunities.note}
          categories={careerCategories}
        />
        <CareersForm />
      </>,
    );

    await user.click(screen.getByRole("link", { name: "Apply for AI & Automation" }));

    expect(screen.getByLabelText(/^Position/i)).toHaveValue("AI & Automation");
  });
});
