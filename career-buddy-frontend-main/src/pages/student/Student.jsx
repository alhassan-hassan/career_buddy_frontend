//libraries
import { Component } from "react";

// components
import Sidebar from "@components/sidebar/Sidebar";

// styles
import StudentStyles from "./student.module.scss";

// extras
import studentPages from "./student-pages";

import useAuth from "@hooks/useAuth";

class Student extends Component {
  static CURRENT_PAGE = "create document";
  static LOGOUT = "logout";
  // navigate = useNavigate();

  constructor(props) {
    
    super(props);
    this.state = {
      currentPage: Student.CURRENT_PAGE,
    };
  }

  setCurrentPage = (pageName) => {
    if (pageName === Student.LOGOUT) {
      sessionStorage.removeItem("career-buddy-auth");
      window.location.reload();
    }
    this.setState({ currentPage: pageName });
  };

  render() {
    return (
      <div className={StudentStyles.wrapper}>
        <Sidebar
          setCurrentPage={this.setCurrentPage}
          currentPage={this.state.currentPage}
        />
        <div className={StudentStyles.studentPages}>
          {studentPages[this.state.currentPage]}
        </div>
      </div>
    );
  }
}

export default Student;
