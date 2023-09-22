//libraries
import { Component } from "react";

// components
import Sidebar from "@components/sidebar/Sidebar";

// styles
import AdminStyles from "./admin.module.scss";

// extras
import adminPages from "./admin-pages";

class Admin extends Component {
  static CURRENT_PAGE = "review";
  static LOGOUT = "logout";

  constructor(props) {
    super(props);
    this.state = {
      currentPage: Admin.CURRENT_PAGE,
    };
  }

  setCurrentPage = (pageName) => {
    if (pageName === Admin.LOGOUT) {
      sessionStorage.removeItem("career-buddy-auth");
      window.location.reload();
    }
    this.setState({ currentPage: pageName });
  };

  render() {
    return (
      <div className={AdminStyles.wrapper}>
        <Sidebar
          setCurrentPage={this.setCurrentPage}
          currentPage={this.state.currentPage}
        />
        <div className={AdminStyles.adminPages}>
          {adminPages[this.state.currentPage]}
        </div>
      </div>
    );
  }
}

export default Admin;
