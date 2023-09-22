import React, { useState } from "react";
import { Calendar, Alert, Spin, Button } from "antd";
import Logo from "../../../../../src/logo_career.svg";


const BookPage = ({handleBook, fName, lName, availableDates, timeGetter}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [subject, setSubject] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [timeBooked, setTimeBooked] = useState({
    day: "time", 
    time: ""
  })

  const handleDateSelect = (date) => {
    setSelectedDate(date.format("Do MMMM YYYY"));
    const selectedDay = availableDates.find(
      (availableDate) => availableDate.day === date.format("Do MMMM YYYY")
    );

    if (selectedDay) {
      const times = timeGetter
        .filter((time) => time.date === selectedDay.day)
        .map((time) => time.times)
        .flat();
      
      // dates that will be displayed
      const datesOnly = selectedDay.time.filter(date => !times.includes(date));
      setAvailableTimes(datesOnly);
      setTimeBooked({...timeBooked, day: date.format("Do MMMM YYYY")})
    } else {
      setAvailableTimes([]);
  

    } 
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimeBooked({...timeBooked, time: time})
    console.log(time)
  };

  const subjectChange = (e) => {
    setSubject(e.target.value);
    console.log(subject)
  }

  const dateFullCellRender = (date) => {
    const dateStr = date.format("Do MMMM YYYY");
    const isAvailable = availableDates.some(
      (availableDate) => availableDate.day === dateStr
    );
    const isSelected = selectedDate === dateStr;
  
    let cellClass = "ant-fullcalendar-date";
    if (!isAvailable) {
      cellClass += " ant-fullcalendar-disabled";
    }
    if (isSelected) {
      cellClass += " ant-fullcalendar-selected-date";
    }
  
    return (
      <div className={cellClass}>
        {date.date()}
        <div className="ant-fullcalendar-content"></div>
      </div>
    );
  };

  const monthFullCellRender = (date) => {
    const monthStr = date.format("MMMM");
    const isAvailable = availableDates.some(
      (availableDate) => availableDate.day.includes(monthStr)
    );
  
    const cellClass = isAvailable
      ? "ant-fullcalendar-month"
      : "ant-fullcalendar-month ant-fullcalendar-month-disabled";
  
    const monthContent = isAvailable ? (
      <div>
        <div className="ant-fullcalendar-month-value">{date.format("MMMM")}</div>
        <div className="ant-fullcalendar-month-panel">
          {availableDates
            .filter((availableDate) => availableDate.day.includes(monthStr))
            .map((availableDate) => (
              <div key={availableDate.day}>
                {availableDate.day}
                {availableDate.time.map((time) => (
                <Button
                    key={`${time} ${availableDate.day}`}
                    style={{ margin: '5px' }}
                    onClick={() => handleTimeSelect(time)}
                    className={selectedTime === time ? 'time-button_active' : 'time-button'}
                >
                    {time}
                </Button>
                ))}
              </div>
            ))}
        </div>
      </div>
    ) : (
      <div className="ant-fullcalendar-month-value">{date.format("MMMM")}</div>
    );
  
    return <div className={cellClass}>{monthContent}</div>;
  };
  return (
    <div className="book-main">
        <center className="intro-book">
            <div>Book Career Session with {`${fName} ${lName}`}</div>
        </center>
        <div className="book-mentor">
            <div className="booking-part">
                <div id="book-message">Select Date to Book Career Personnel</div>
                <Calendar
                    fullscreen={false}
                    onSelect={handleDateSelect}
                    dateFullCellRender={dateFullCellRender}
                    monthFullCellRender={monthFullCellRender}
                    // style={{ width: 600, borderRadius: 5, backgroundColor: "#f5f5f5", padding: 20 }}
                    className = "calendar-ui"
                    />
                <br />
                {selectedDate ? (
                    <>
                    <Alert message={`Selected Date: ${selectedDate}`} type="info" />
                    <br />
                    {availableTimes.length ? (
                        availableTimes.map((time) => (
                        <Button key={time} style={{ margin: "5px" }} onClick = {() => handleTimeSelect(time)} className={selectedTime === time ? 'time-button_active' : 'time-button'}>
                            {time}
                        </Button>
                        ))
                    ) : (
                        <div className="nothing-left">
                          <Spin size="small" />
                          <span id= "nothing-left">Either this day is fully booked or no availability set. Try other days!</span>
                        </div>
                    )}

                    </>
                ) : (
                    <Alert message="Please select a date" type="warning" />
                )}
            </div>
            <center className="display-date">
                {timeBooked.day && timeBooked.time && (
                    <div className="give-gap">
                        <span id = "okay-book">{`Selected Date`}</span> <br />
                        <div>{`Day:  ${timeBooked.day}`}</div>
                        <div>{`Time: ${timeBooked.time}`}</div>
                        <div className="subject">
                        <label for="subject">Subject of Session (Recommended)</label> <br />
                          <input 
                            onChange={subjectChange}
                            value = {subject}
                            type="text" id="subject" 
                            placeholder="Enter the subject for the session." />
                        </div>
                        <button onClick={()=>handleBook (timeBooked.day, timeBooked.time, subject)}>Book Session</button>
                    </div>
                )}
            </center>
        </div>
    </div>
  );
};

export default BookPage;  