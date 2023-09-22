import React from "react";
import Personnel from "./Personnel";
import "./../../../scss/global.scss";

describe("<Personnel />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Personnel />);
  });
});
