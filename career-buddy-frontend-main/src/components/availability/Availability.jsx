import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Availability.scss";
import An_Availability from "./An_Availability/An_Availability";
import Axios from "axios";
import { BASE_URL } from "../../network/api-endpoints";
import useAuth from "../../hooks/useAuth";
import AllBookings from "../booking/personnel-all-bookings/AllBookings";

function Availability() {
  //GET USER INFORMATION
  const { auth } = useAuth();

  const userID = auth.data[0].userID;

  // ALL IMPORTANT STATES
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [stringDate, setStringDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [showTime, setShowTime] = useState(false);
  const [availabilities, setAvailabilities] = useState(null);
  const[bookings, setBookings] = useState(false);
  // const [ids, setIds] = useState(0)
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `${BASE_URL}my_availability/${userID}`
        );
        setAvailabilities(response.data.time_);
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

  const handleDateSelection = (date_) => {
    setSelectedDate(date_);
    const date = new Date(date_);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    const ordinalDay = getOrdinalSuffix(date.getDate());
    const finalDate =
      ordinalDay +
      " " +
      formattedDate.split(" ")[1] +
      " " +
      formattedDate.split(" ")[2];

    function getOrdinalSuffix(day) {
      const j = day % 10,
        k = day % 100;
      if (j == 1 && k != 11) {
        return day + "st";
      }
      if (j == 2 && k != 12) {
        return day + "nd";
      }
      if (j == 3 && k != 13) {
        return day + "rd";
      }
      return day + "th";
    }

    setShowTime(true);
    setStringDate(finalDate);
  };

  const handleTimeSelection = (time) => {
    setShowTime(true);
    const timeValue = time.target.value;
    const date = new Date();
    const [hours, minutes] = timeValue.split(":");
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setSelectedTime(formattedTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let avail_post = {
      day_: stringDate,
      time_: selectedTime,
      reviewerID: userID,
    };
    Axios.post(`${BASE_URL}create_availability`, avail_post)
      .then((response) => {
        if (response.data.ok == false) {
          alert(response.data.message);
        } else {
          const fetchData = async () => {
            try {
              await Axios.get(`${BASE_URL}my_availability/${userID}`).then(
                (response) => {
                  setAvailabilities(response.data.time_);
                }
              );
            } catch (error) {
              console.log(error);
            }
          };

          fetchData();
          const timer = setTimeout(() => {
            fetchData();
          }, 1000);
          setTimeout(() => alert("Availability successfully added!"), 1500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAvailability = (availabilityID) => {
    const newAvailabilities = availabilities.filter((date) => {
      const [dateStr, times] = Object.entries(date)[0];
      const filteredTimes = times.filter((time) => {
        return time.availabilityID !== availabilityID;
      });
      return filteredTimes.length > 0 ? [date, filteredTimes] : false;
    });

    const result = window.confirm(
      "Are you sure you want to delete this availability?"
    );
    if (result) {
      setAvailabilities(newAvailabilities);
      if (newAvailabilities.length == 0) {
        setAvailabilities(null);
      }
      Axios.post(`${BASE_URL}delete_availability/${availabilityID}`)
        .then((response) => {
          setTimeout(() => alert("Availability deleted Successfully!"), 1000);
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  const handleBookShow = () => {
    setBookings(false)
  }

  const showBookings = () => {
    setBookings(true)
  }

  return (
    <div className="availability">
      <div className="choose-date">
        <span id="avail">Add Your Availability</span>
        <form onSubmit={handleSubmit} id="avail-form">
          <div className="calendar-container">
            <Calendar
              value={selectedDate}
              onChange={handleDateSelection}
              selectRange={false}
              minDate={new Date()}
            />
          </div>
          <div className="time-stack">
            {showTime && (
              <div className="time-zone">
                <span id="select">
                  Select time for <span id="hint"> {stringDate}</span>
                </span>
                <input
                  type="time"
                  className="avail-time"
                  value={selectedTime || ""}
                  onChange={handleTimeSelection}
                />
                {selectedTime && (
                  <span id="select">
                    Selected time <span id="hint">{selectedTime}</span>
                  </span>
                )}
              </div>
            )}
            {stringDate && selectedTime && (
              <div className="avail-summary">
                <span id="select_">Availability Summary</span> <br />
                <span id="day">Day: {stringDate}</span> <br />
                <span id="time">Time: {selectedTime} </span>
              </div>
            )}
          </div>
          {selectedTime && (
            <button type="submit" id="add-avail" disabled={!showTime}>
              Add Availability
            </button>
          )}
        </form>
      </div>

      <div className="set-availabilities">
        <span id="avail-header">All Your Availabilites</span>
        <div className="avail-pack">
          {availabilities &&
            availabilities.map((date) => {
              const [dateStr, times] = Object.entries(date)[0];
              return times.map((time_) => (
                <An_Availability
                  key={time_.availabilityID}
                  day={dateStr}
                  time={time_.time}
                  handleDelete={() => deleteAvailability(time_.availabilityID)}
                />
              ));
            })}
          {availabilities == null && (
            <div id="no-avail">No availabilities set!</div>
          )}
        </div>

        <button className="upcomings-bookins" onClick={showBookings}>View Upcoming Bookings</button>
      </div>
      {bookings && (
        <AllBookings bookings = {bookings} handleBookShow = {handleBookShow}/>
      )}
    </div>
  );
}

export default Availability;
//() => handleClick(item.id)
