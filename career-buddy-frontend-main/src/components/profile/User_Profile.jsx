import React from 'react';
import "./User_Profile.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'
import Axios from "axios";

const User_Profile = ({ fname, lname, email, ID, role, onEditProfile, onEditProfilePicture, onResetPassword }) => {
    // GETTING THE GLOBAL STATE,
    const {auth} = useAuth();
    return (
        <div className="user-profile">
            <div className='announce'>
                <span className='pro-details'>User Profile</span> <br /> 
                <span className='pro-details' id = "view">View Profile</span>
            </div>

            <div className='prof-container'>
                <div className='details-havard'>
                    <div className='details'>
                        {auth.data[0].profilePicture ? (
                            <img src={auth.data[0].profilePicture } alt="profile" />
                        ) : (
                            <FontAwesomeIcon icon={faUser} className = "no-profile"/>
                        )}
                        <div className='parti'>
                            <div className='details-parted'>
                                <span className='other-details'><strong>First Name:</strong> {fname}</span> <br /> <br />
                                <span className='other-details'><strong>Email:</strong> {email}</span> <br /> <br />
                                <span className='other-details'><strong>Role:</strong> {role}</span> <br />
                            </div>
                            <div className='details-parted'>
                                <span className='other-details'><strong>Last Name:</strong> {lname}</span> <br /> <br />
                                <span className='other-details'><strong>User ID:</strong> {ID}</span> <br /> 
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn-edit-profile" onClick={onEditProfile}>
                    Edit Profile
                </button>

                <button className='btn-edit-profile' onClick={onEditProfilePicture}>
                    Change Profile Picture
                </button>

                <button className='btn-edit-profile' onClick={onResetPassword}>
                    Reset Password
                </button>
            </div>
        </div>
    );    
};

export default User_Profile;