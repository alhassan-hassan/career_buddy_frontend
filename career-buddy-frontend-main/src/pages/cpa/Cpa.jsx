//libraries
import { Component } from "react";

// components
import Sidebar from "@components/sidebar/Sidebar";

// styles
import CpaStyles from "./cpa.module.scss";

// extras
import cpaPages from "./cpa-pages";

//pages
import Availability from "../../components/availability/Availability";

class Cpa extends Component {
  static CURRENT_PAGE = "review";
  static LOGOUT = "logout";

  constructor(props) {
    super(props);
    this.state = {
      currentPage: Cpa.CURRENT_PAGE,
    };
  }

  setCurrentPage = (pageName) => {
    if (pageName === Cpa.LOGOUT) {
      sessionStorage.removeItem("career-buddy-auth");
      window.location.reload();
    }
    this.setState({ currentPage: pageName });
  };

  render() {
    return (
      <div className={CpaStyles.wrapper}>
        <Sidebar
          setCurrentPage={this.setCurrentPage}
          currentPage={this.state.currentPage}
        />
        <div className={CpaStyles.cpaPages}>
          {cpaPages[this.state.currentPage]}
        </div>
      </div>
    );
  }
}

export default Cpa;
