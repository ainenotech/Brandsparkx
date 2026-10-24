import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CareerBoard } from "@/components/careers/CareerBoard";
import { CareersForm } from "@/components/careers/CareersForm";
import { careerCategories, careerPage } from "@/content/careers";

const board = (
  <CareerBoard
    title={careerPage.opportunities.title}
    intro={careerPage.opportunities.intro}
    categories={careerCategories}
  />
);

describe("CareerBoard", () => {
  it("lists every team with its tags, location and an Apply link", () => {
    render(board);

    for (const team of careerCategories) {
      expect(screen.getByRole("heading", { name: team.title })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: `Apply for ${team.title}` })).toHaveAttribute(
        "href",
        "#apply",
      );
    }
    expect(screen.getAllByText("Dubai · Bengaluru")).toHaveLength(careerCategories.length);
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("does not show the internal note, the search box or the team count", () => {
    render(board);

    expect(screen.queryByText(/Publish individual openings/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByText(/Active/)).not.toBeInTheDocument();
  });

  it("pre-fills Position from the team the user applies for and focuses Name", async () => {
    const user = userEvent.setup();
    render(
      <>
        {board}
        <CareersForm />
      </>,
    );

    await user.click(screen.getByRole("link", { name: "Apply for Sales & Business Development" }));

    expect(screen.getByLabelText(/^Position/i)).toHaveValue("Sales & Business Development");
    expect(screen.getByLabelText(/^Name/i)).toHaveFocus();
  });
});
