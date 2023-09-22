import React from "react";
import ResumeForm from "./ResumeForm";
import "./../../scss/global.scss";

describe("<ResumeForm />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ResumeForm styles={{ width: "35vw", height: "100vh" }} />);
  });
});
