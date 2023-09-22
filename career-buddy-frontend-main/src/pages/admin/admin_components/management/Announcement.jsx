
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { flexbox } from '@mui/system';

const Announcement = ({statement}) => {
  return (
    <div style={{display:flexbox, margin:"5px 0 1rem", color: "#000"}} className = "announcer">
        <FontAwesomeIcon 
            icon={faCheck} 
            className = "trash_avail"
            />
        <span 
            style={{fontSize : "1vw", color:"rgba(0,0,0, 0.6)"}}>
            {statement}
        </span>
    </div>
  );
};

export default Announcement;