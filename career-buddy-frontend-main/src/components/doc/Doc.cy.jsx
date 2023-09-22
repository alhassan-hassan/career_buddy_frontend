import React from "react";
import Doc from "./Doc";

describe("<Doc />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Doc />);
  });
});
