import React from "react";
import Sidebar from "./Sidebar";
import "./../../scss/global.scss";
import SidebarStyles from "./sidebar.module.scss";

describe("<Sidebar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Sidebar
        className={SidebarStyles["cpa"]}
        currentRole="cpa"
        styles={{
          width: "10vw",
          width: "10vw",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      />
    );
  });
});
