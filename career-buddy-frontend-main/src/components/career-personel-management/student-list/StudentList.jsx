import React, {useState} from 'react';
import "./StudentList.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Modal from '@mui/material/Modal';
import { Spin } from "antd";

const CareerPersonel = ({fname, lname, role, userID, addNewPersonnel, spin, profilePicture}) => {
    const [choice, setChoice] = useState (false)
    const [selection, setSelection] = useState ("")

    const hideModalUser = () => {
        setChoice(false)
    }
    
    const addToPersonnel = () => {
        setChoice(true)
    }

    const handleChange = (event) => {
        setSelection(event.target.value);
    };
    return (
        <div className="career-personel" id={userID}>
            <div className='personel-prof_'>
                {profilePicture ? (
                    <img src={profilePicture} alt="file" />
                ) : (
                <FontAwesomeIcon 
                    icon={faUser} 
                    className = "trash_avail_"
                />
                )}
                <span>{`${fname} ${lname}`}</span>
            </div>
            <div className='role'>{role}</div>
            <button 
                className='add-from-list' 
                onClick={addToPersonnel}
                >
                <FontAwesomeIcon 
                    icon={faPlus} 
                    className = "trash_avail"
                    style={{color: "#fff"}}
                    />
                    Add
            </button>

            <Modal
                open={choice}
                onClose={hideModalUser}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <div className="modal-choice">
                <span className="close-button-choice" onClick={hideModalUser}>
                    x
                </span> 
                <div className='header-choice'>Add career personal as</div>
                <div className='the-choice'>
                    <div className='choice-child'>
                        <input type="radio" name="choice" value="admin" onChange={handleChange}/> Admin
                    </div>
                    <div className='choice-child'>
                        <input type="radio" name="choice" value="cpa" onChange={handleChange}/> CPA
                    </div>
                </div>

                {selection && (
                    <button 
                    id='add-pers'
                    onClick={() => addNewPersonnel(selection, userID, setChoice)}
                    >Add Personnel</button>
                )}

                <br /> <br />
                {spin && <Spin spinClassName='custom-spin' />}
            </div>
        </Modal>

        </div>
    );
};

export default CareerPersonel;