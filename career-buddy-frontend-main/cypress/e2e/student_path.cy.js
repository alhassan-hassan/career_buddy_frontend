describe("Student Path", () => {
  it("simulates a student accessing the portal", () => {
    cy.visit("http://127.0.0.1:5173/login");
    cy.get("[type=email]").type("faddal.ibrahim@ashesi.edu.gh");
    cy.get("[type=email]").should("have.value", "faddal.ibrahim@ashesi.edu.gh");

    cy.get("[type=password]").type("fakepassword123");
    cy.get("[type=password]").should("have.value", "fakepassword123");

    cy.get("[for=student]").click();
    // cy.contains("student").click();
  });
});

// describe("Role Selection", () => {
//   it('selects student as a role"', () => {
//     cy.contains("Student").click();
//   });
// });
