describe("Events Page E2E Test", () => {
  it("Loads the Events page and displays events", () => {
    cy.intercept("GET", "http://localhost:5000/api/events").as("getEvents");

    cy.visit("http://localhost:5173/events");

    // Wait for API to finish loading
    cy.wait("@getEvents");

    // Now assert header + button
    cy.contains("Events").should("exist");
    cy.contains("Create Event").should("exist");

    // OPTIONAL: Ensure at least 1 event card rendered
    cy.get(".grid > div").should("have.length.at.least", 1);

    // Screenshot after UI is fully loaded
    cy.screenshot();
  });
});
