import Personnel from "../../../../components/booking/career-personnel/Personnel";
import Header from "../../../../components/booking/header/Header";
import BookPage from "./BookPage";
import Loader from "../../../../components/loader/Loader";
import "./Booking.scss";
import Modal from "@mui/material/Modal";
import { useRef, useEffect, useState } from "react";
import { BASE_URL } from "../../../../network/api-endpoints";
import Axios from "axios";
import useAuth from "../../../../hooks/useAuth";

const Booking = () => {
  // GETTING THE GLOBAL STATE
  const { auth } = useAuth();

  // GET CURRENT USER ID
  const studentID = auth.data[0].userID;

  // Important states to store information
  const [showModal, setShowmodal] = useState(false);
  const [details, setDetails] = useState(false);
  const [loader, setLoader] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [booked, setBooked] = useState(null);
  const [timesGetter, setTimeGetter] = useState([]);
  const [searchedPersonnel, setSearchedPersonnel] = useState([]);
  const [bookInfor, setBookInfo] = useState({
    fName: "",
    lName: "",
    day: "",
    time: "",
    subject: "",
  });

  // this tracks all appointments of a user
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avails = await Axios.get(`${BASE_URL}all_availabilities`);
        setAvailability(avails.data);
        setSearchedPersonnel(avails.data);

        const appoints = await Axios.get(`${BASE_URL}bookings/${studentID}`);
        setAppointments(appoints.data);
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

  // This aids in canceling a session with a career personnel
  const removeBooking = (session) => {
    console.log(session);
    const updatedAppointments = appointments.filter(
      (ses) => ses.bookingID !== session.bookingID
    );
    if (confirm(`Are you sure you want tp cancel this appointment?`)) {
      Axios.post(`${BASE_URL}delete_booking/${session.bookingID}`)
        .then((res) => {
          setAppointments(updatedAppointments);
          setTimeout(() => {
            alert("Booking Sucessfully deleted!");
          }, 1500);
        })
        .catch((error) => alert("Ooops! Something went wrong. Try again!"));
    }
  };

  // In charge of closing the modal page
  const hideModal = () => {
    setShowmodal(false);
  };

  // here a user is able to book sessions.
  const bookSession = (personnel) => {
    const { userID, fName, lName, time_ } = personnel;
    const avail = time_.map((date) => {
      const [dateStr, times] = Object.entries(date)[0];
      return { userID, fName, lName, day: dateStr, time: times };
    });
    setAvailableDates(avail);

    const fetchData = async () => {
      try {
        const avails = await Axios.get(`${BASE_URL}admin_bookings/${userID}`);
        setTimeGetter(avails.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    setShowmodal(true);
    setBooked({ fName: personnel.fName, lName: personnel.lName, userID });
  };

  const handleBook = (day, time, subject) => {
    // console.log(`${booked.userID} ${day} ${time} ${subject}`)
    const fetchData = async () => {
      try {
        const responseID = await Axios.get(
          `${BASE_URL}availabilityID/${booked.userID}/${day}/${time}`
        );
        const bookedInfor = {
          studentID,
          subject_: subject,
          link: "https://asu.zoom.us/j/84528763080",
          availabilityID: responseID.data.toString(),
        };

        Axios.post(`${BASE_URL}book`, bookedInfor)
          .then((response) => {
            if (response.data.ok == true) {
              Axios.get(`${BASE_URL}bookings/${studentID}`).then((resp) => {
                setTimeout(() => setAppointments(resp.data), 1000);
              });

              setTimeout(() => {
                setLoader(false);
                setShowmodal(false);
              }, 1500);
              setTimeout(() => {
                alert(response.data.message);
              }, 2000);
            } else {
              alert("Oops, sowmthing went wrong. Try booking again");
              setLoader(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // return () => clearTimeout(timer);

    setLoader(true);
  };

  const searchPersonnel = (event) => {
    const term = event.target.value;
    if (term === "") {
      setSearchedPersonnel(availability);
    } else {
      console.log(availability);
      const filtered = availability.filter((personnel) => {
        // Filter by title
        if (personnel.fName.toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
        // Filter by location
        if (personnel.lName.toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
      });
      setSearchedPersonnel(filtered);
    }
  };

  const viewMore = (session) => {
    setDetails(true);
    const info = {
      fName: session.adfName,
      lName: session.adfName,
      day: session.day_,
      time: session.time_,
      subject: session.subject_,
      link: session.link,
    };
    setBookInfo(info);
  };

  const closeBookDetails = () => {
    setDetails(false);
  };

  return (
    <div className="booking_">
      <Modal
        open={showModal}
        onClose={hideModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="keep-booking">
          <div className="close-button1" onClick={hideModal}>
            x
          </div>
          {booked && (
            <BookPage
              handleBook={handleBook}
              fName={booked.fName}
              lName={booked.lName}
              availableDates={availableDates}
              timeGetter={timesGetter}
            />
          )}
          {loader && (
            <center className="loader-book">
              <Loader />
            </center>
          )}
        </div>
      </Modal>
      <Header
        appointments={appointments}
        removeBooking={removeBooking}
        viewMore={viewMore}
        searchPersonnel={searchPersonnel}
      />
      <div className="all-bookings">
        {searchedPersonnel ? (
          searchedPersonnel.map((each) => (
            <Personnel
              key={each.userID}
              book={() => bookSession(each)}
              fName={each.fName}
              lName={each.lName}
              profile = {each.profilePicture}
            />
          ))
        ) : (
          <center id="no-results">No results</center>
        )}
      </div>

      <div>
        <Modal
          open={details}
          onClose={setDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="view-details">
            <div className="close-button1" onClick={closeBookDetails}>
              x
            </div>
            <center id="details-intro">
              <span id="header"> Booking Details</span>
              <div className="booked-details" id="mentor">
                Career Personnel
              </div>
              <span className="booked-span">{`${bookInfor.fName} ${bookInfor.lName}`}</span>

              <div className="booked-details" id="booked-time">
                Time Scheduled
              </div>
              <span className="booked-span">{`${bookInfor.day} at ${bookInfor.time}`}</span>

              {bookInfor.subject && (
                <>
                  <div className="booked-details" id="booked-subject">
                    Subject
                  </div>
                  <span className="booked-span">{`${bookInfor.subject}`}</span>
                </>
              )}

              <div className="booked-details">Link to Session</div>
              <a
                target="_blank"
                href={bookInfor.link}
                className="booked-span"
                id="booked-link"
              >
                Click Here
              </a>
            </center>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Booking;