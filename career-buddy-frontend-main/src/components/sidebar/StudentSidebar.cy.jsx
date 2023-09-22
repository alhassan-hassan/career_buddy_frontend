import React from "react";
import Sidebar from "./Sidebar";
import "./../../scss/global.scss";

describe("<Sidebar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Sidebar
        // className={SidebarStyles["student"]}
        // className={SidebarStyles["student"]}
        styles={{
          width: "10vw",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          height: "100vh",
          display: "grid",
          gridTemplateRows: "20% 10% 10% 10% 10% 20% 10% 10%",
        }}
        currentRole="student"
      />
    );
  });
});
