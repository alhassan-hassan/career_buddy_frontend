import { useState } from 'react';
import "./An_Availability.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import {faTrash } from '@fortawesome/free-solid-svg-icons'
function An_vailability({day, time, handleDelete}) {

    return (
        <div className='an-avail'>
            <FontAwesomeIcon 
                icon={faCalendarDay} 
                className = "calendar"
                size="2x"
            />
            <div className='details_'>
                <span id='details_1'>{day || "Day"}</span><br />
                <span id='details_2'>{time || "Time"}</span>
            </div>

        <FontAwesomeIcon 
            icon={faTrash} 
            onClick = {handleDelete}
            className = "trash_avail"
            />
        </div>
    );
}

export default An_vailability;