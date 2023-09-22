import React from "react";
import CoverLetterTextArea from "./CoverLetterTextArea";
import "./../../scss/global.scss";

describe("<CoverLetterTextArea />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CoverLetterTextArea />);
  });
});
