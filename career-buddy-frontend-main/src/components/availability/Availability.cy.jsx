import React from "react";
import Availability from "./Availability";
import "./../../scss/global.scss";

describe("<Availability />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Availability />);
  });
});
