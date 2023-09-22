import CareerPersonel from "../../../../components/career-personel-management/career-personel/CareerPersonel";
import "./Management.scss";
import Header from "../../../../components/career-personel-management/car-personel-header/Header";
import StudentList from "../../../../components/career-personel-management/student-list/StudentList";
import Announcement from "./Announcement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NewPersonnel from "../../../../components/career-personel-management/add-new-personnel/NewPersonnel";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../../../../network/api-endpoints";
import useAuth from "../../../../hooks/useAuth";

const Management = () => {
  //GET USER INFORMATION
  const { auth } = useAuth();
  const adminID = auth.data[0].userID;

  // Storing all Admin data
  const [cpa, setCpa] = useState([]);
  const [filteredCpa, setFilteredCpa] = useState([]);

  const [student, setStudent] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState([]);

  const [admin, setAdmin] = useState([]);
  const [filteredAdmin, setFilteredAdmin] = useState([]);

  const [spin, setSpin] = useState(false);

  // search personnel
  const [search, setSearch] = useState("");

  // GET USERS DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cpa_data = await Axios.get(`${BASE_URL}users/cpa/${adminID}`);
        const admin_data = await Axios.get(`${BASE_URL}users/admin/${adminID}`);
        const student_data = await Axios.get(
          `${BASE_URL}users/student/${adminID}`
        );
        setCpa(cpa_data.data);
        setFilteredCpa(cpa_data.data);

        setStudent(student_data.data);
        setFilteredStudent(student_data.data);

        setAdmin(admin_data.data);
        setFilteredAdmin(admin_data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // this hides the modal
  const hideModal = () => {
    setShowModal(false);
  };
  // this state stores the information of new users
  const [newUser, setNewUser] = useState({
    id: "",
    fName: "",
    lName: "",
    email: "",
    admin_type: "",
    password: "",
  });

  // header Title changer
  const [header, setHeader] = useState(false);

  // state to control adding a new career personnel
  const [add, setShowAdd] = useState(false);

  // state to control adding a new career personnel
  const [loading, setLoading] = useState(false);

  // This helps to render them dynamically
  const [role, setRole] = useState({
    admin: true,
    cpa: false,
  });

  // Adding little touches of styling
  let adminback = role.admin ? "rgb(167, 106, 153)" : "none";
  let admincolor = role.admin ? "#fff" : "rgba(0, 0, 0, 0.5)";

  let cpaback = role.cpa ? "rgb(167, 106, 153)" : "none";
  let cpacolor = role.cpa ? "#fff" : "rgba(0, 0, 0, 0.5)";

  // This function helpl display the active data
  const handleAdminClick = () => {
    setRole({ ...role, admin: true, cpa: false });
  };

  // This function helpl display the active data
  const handleCpaClick = () => {
    setRole({ ...role, admin: false, cpa: true });
  };

  // Here, a career personnel can be deleted from the database
  const handleDeletePersonnel = (role, id) => {
    const career_personnel = role === "admin" ? admin : cpa;

    const result = window.confirm(
      `Are you sure you want to delete this ${role}`
    );

    if (result) {
      Axios.post(`${BASE_URL}remove/${role}/${id}`)
        .then((response) => {
          if (response.data.ok) {
            const filteredItems = career_personnel.filter(
              (car_user) => car_user.userID !== id
            );
            if (role === "admin") {
              setAdmin(filteredItems);
              setFilteredAdmin(filteredItems);
            } else {
              setCpa(filteredItems);
              setFilteredCpa(filteredItems);
            }
            setTimeout(() => alert(`${role} deleted successfully!`), 1000);
          } else {
            alert(`${role} could not be deleted!`);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // sets the pace and page for adding a new user
  const addPersonnel = () => {
    setHeader(true);
    setRole({ role, admin: false, cpa: false });
  };

  // This completes adding from an existing list
  const addPersonnelFinale = (role, userID, setChoice) => {
    setSpin(true);
    const data = { userID, role };
    const fetchData = async () => {
      try {
        await Axios.post(`${BASE_URL}store_existing_user`, data).then(
          (response) => {
            if (response.data.ok) {
              Axios.get(`${BASE_URL}users/${role}/${adminID}`)
                .then((response) => {
                  if (role === "admin") {
                    setAdmin(response.data);
                    setFilteredAdmin(response.data);
                  } else {
                    setCpa(response.data);
                    setFilteredCpa(response.data);
                  }
                  setTimeout(() => {
                    setSpin(false);
                    setChoice(false);
                    setRole({ ...role, [role]: true });
                    setHeader(false);
                  }, 1500);

                  setTimeout(() => {
                    alert(`${role} added!`);
                  }, 2000);
                })
                .catch((err) => console.log(err))
                .catch((err) => console.log(err));
            } else {
              setTimeout(() => {
                setSpin(false);
                setChoice(false);
              }, 1500);

              setTimeout(() => {
                alert(`Student exits as ${role} already`);
              }, 1600);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    // return () => clearTimeout(timer);
  };

  const handleModalClose = () => {
    setShowAdd(false);
  };

  const addNewPersonnelFromScratch = () => {
    setShowAdd(true);
  };

  const addPersonnelNow = (details) => {
    // set the pace for adding the new user by a loader
    setLoading(true);
    console.log(details.role);
    const fetchData = async () => {
      try {
        await Axios.post(`${BASE_URL}create_admin`, details).then(
          (response) => {
            if (response.data.ok) {
              // const role = details.role == "admin" ? "Administrator" : "Career Peer Advisor"
              setTimeout(() => {
                if (details.role === "admin") {
                  setAdmin([details, ...admin]);
                  setFilteredAdmin([details, ...filteredAdmin]);
                  setRole({ ...role, admin: true, cpa: false });
                } else {
                  setCpa([details, ...cpa]);
                  setFilteredCpa([details, ...filteredCpa]);
                  setRole({ ...role, admin: false, cpa: true });
                }
                // Close both the loader and the modal pagef
                setHeader(false);
                setLoading(false);
                setShowAdd(false);
              }, 3000);
              setTimeout(() => {
                alert(`New ${details.role} added successfully!`);
              }, 4500);
            } else {
              setTimeout(() => {
                setLoading(false);
              }, 1500);
              setTimeout(() => {
                alert("Something went wrong. Try again!!");
              }, 1600);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);
  };

  // Search for Personnel
  const getPersonnelSearch = (event) => {
    setSearch(event.target.value)
    let term = event.target.value;
    let stack = "";
    let users = null;

    if (role.admin) {
      stack = "admin"
      users = admin
    } else if (role.cpa) {
      stack = "cpa"
      users = cpa
    } else {
      stack = "student"
      users = student
    }

    if (term == "") {
      if (stack == "admin") {
        setFilteredAdmin(admin)
      } else if (stack == "cpa") {
        setFilteredCpa(cpa)
      } else {
        setFilteredStudent(student)
      }
    } else {
      const filtered = users.filter((user) => {
        // Filter by title
        if (user.fName.toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
        // Filter by location
        if (user.lName.toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
        // Filter by organization
        if (user.userID.toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
        return false;
      });

      if (stack == "admin") {
        setFilteredAdmin(filtered)
      } else if (stack == "cpa") {
        setFilteredCpa(filtered)
      } else {
        setFilteredStudent(filtered)
      }
    }
  }

  const backToManagment = () => {
    setHeader(false)
    setRole({...role, admin: true})
  }

  return (
    <div className="cpa-management">
      <Header
        adminClick={handleAdminClick}
        cpaClick={handleCpaClick}
        adminback={adminback}
        admincolor={admincolor}
        cpaback={cpaback}
        cpacolor={cpacolor}
        handleAddPersonnel={addPersonnel}
        showButtons={header}
        getPersonnelSearch={getPersonnelSearch}
        search={search}
      />
      <div className="per-management">
        <div className="cpa-manag">
          <>
            {header && 
              filteredStudent.map((person) => (
                <StudentList
                  key={person.userID}
                  value={person.userID}
                  fname={person.fName}
                  lname={person.lName}
                  role={"Student"}
                  addNewPersonnel={addPersonnelFinale}
                  userID={person.userID}
                  spin={spin}
                  profilePicture={person.profilePicture}
                />
              ))}
            {filteredStudent.length == 0 && (
              <center className="m-record">No matching record...</center>
            )}
          </>
          <NewPersonnel
            add={add}
            setShowAdd={handleModalClose}
            loader={loading}
            addPersonnelNow={addPersonnelNow}
          />
          <>
            {!header &&
              role.admin &&
              filteredAdmin.map((person) => (
                <CareerPersonel
                  key={person.userID}
                  value="admin"
                  fname={person.fName}
                  lname={person.lName}
                  role={"Administrator"}
                  userID={person.userID}
                  handleDelete={() =>
                    handleDeletePersonnel("admin", person.userID)
                  }
                />
              ))}
            {filteredAdmin.length == 0 && (
              <center className="m-record">No matching record...</center>
            )}
          </>
          <>
            {!header &&
              role.cpa &&
              filteredCpa.map((person) => (
                <CareerPersonel
                  key={person.userID}
                  value="cpa"
                  fname={person.fName}
                  lname={person.lName}
                  role={"Career Peer Advisor"}
                  userID={person.userID}
                  handleDelete={() =>
                    handleDeletePersonnel("cpa", person.userID)
                  }
                />
              ))}
            {filteredCpa.length == 0 && (
              <center className="m-record">No matching record...</center>
            )}
          </>
        </div>
        <div className="per-summary">
          <div className="notes">
            <FontAwesomeIcon
              id="take-it"
              icon={faPencilAlt}
              className="trash_avail"
            />
            <span>Take notes of the following!</span>
          </div>
          <div>
            <Announcement statement={"You can add personnel from students list."} />
            <Announcement
              statement={"You can remove privileges of personnel."}
            />
            </div>
        </div>
      </div>

      {header && (
        <div className="add-fresh">
          <div className="backer">
            <FontAwesomeIcon 
              icon={faArrowLeft} size = "2x" 
              id="backer"
              onClick={backToManagment}/>
          </div>
          <button onClick={addNewPersonnelFromScratch}>
            Add New Career Personnel
          </button>
        </div>
      )}
    </div>
  );
};

export default Management;
