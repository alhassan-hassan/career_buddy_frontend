import React from "react";
import Input from "./Input";
import "./../../scss/global.scss";

describe("<Input />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Input label="name" />);
  });
});
