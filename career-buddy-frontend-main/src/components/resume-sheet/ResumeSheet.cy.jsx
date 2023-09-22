import React from "react";
import ResumeSheet from "./ResumeSheet";
import "./../../scss/global.scss";

describe("<ResumeSheet />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ResumeSheet />);
  });
});
