import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { EventsPage } from "../pages/EventsPage";

describe("EventsPage Component", () => {
  it("renders the Events header", () => {
    render(
      <MemoryRouter>
        <EventsPage />
      </MemoryRouter>
    );

    const header = screen.getByText("Events");
    expect(header).toBeDefined();
  });
});
