import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import "./AllBookings.scss"
import Axios from "axios";
import { BASE_URL } from '../../../network/api-endpoints';
import useAuth from "../../../hooks/useAuth";

const AllBookings = ({bookings, bookShow, handleBookShow}) => {
    // GETTING THE GLOBAL STATE
    const { auth } = useAuth();

    // GET CURRENT USER ID
    const userID = auth.data[0].userID;

    const[allBookings, setAllBookings] = useState([1,2,3,4,5,6])

    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const appoints = await Axios.get(`${BASE_URL}bookings/${userID}`);
            setAllBookings(appoints.data);
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

    return (
        <div>
            <Modal
                open={bookings}
                onClose={handleBookShow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                
                <div className='main-books'>
                    <span className='close-books' onClick={handleBookShow}>x</span> <br />
                    <center className='books-header'>All Upcoming Books</center>
                    <div className='just-table'>
                        {}
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Agenda</th>
                                    <th><center> Start Session</center></th>
                                </tr>
                            </thead>
                            <tbody style = {{height: "200px"}}>
                                {allBookings.map(book => (
                                    <tr>
                                        <td>{`${book.sfName} ${book.slName}`}</td>
                                        <td>{`${book.day_}`}</td>
                                        <td>{`${book.time_}`}</td>
                                        <td>{`${book.subject_}`}</td>
                                        <td><center><a href={`${book.link}`} target = "_blank">Start Session</a></center></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AllBookings