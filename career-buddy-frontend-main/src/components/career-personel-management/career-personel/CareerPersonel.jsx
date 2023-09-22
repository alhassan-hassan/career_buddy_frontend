
import React from 'react';
import "./CareerPersonel.scss";
import Profile_Pic from "../../../../src/profile.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const CareerPersonel = ({fname, lname, role, userID, profilePicture, handleDelete}) => {
  return (
    <div className="career-personel" id={userID}>
        <div className='personel-prof_'>
          <div className='icon-group'>
            {profilePicture ? (
              <img src={Profile_Pic} alt="file" />
            ) : (
              <FontAwesomeIcon 
              icon={faUser} 
              onClick = {handleDelete}
              className = "trash_avail_"
            />
            )}
          </div>
          <div id='namer_'>{`${fname} ${lname}`}</div>

          </div>
        <div className='role'>{role}</div>
        <FontAwesomeIcon 
            icon={faTrash} 
            onClick = {handleDelete}
            className = "trash_avail"
            />
    </div>
  );
};

export default CareerPersonel;