import React from 'react'
import "./Personnel.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Prof from "../../../../src/profile.jpeg";

const Personnel = ({profile, book, fName, lName}) => {
  const class_ = profile? "profile" : "profile-active";
  return (
    <div className='book-person'>
        <center className={class_}>
            {!profile ? (
                <FontAwesomeIcon icon={faUser} id = "per-avat" size='6x'/>
            ) : (
                <img src={profile} alt="" id='per-pic'/>
            )}
        </center>
            
        <center className='details-book'>
            <span id='name-book'>{`${fName} ${lName}`}</span> <br />
            <span id='car-name'>{"Career Personnel"}</span> <br />

            <button onClick={book}>Book Career Personnel</button>
        </center>

    </div>
  )
}

export default Personnel;