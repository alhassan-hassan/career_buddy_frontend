import React from 'react';
import "./Header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faE } from '@fortawesome/free-solid-svg-icons'
import { faEye} from '@fortawesome/free-solid-svg-icons'


const Header = ({appointments, removeBooking, viewMore, searchPersonnel}) => {
    return (
        <div className='header-book'>
            <div className='group-book'>
                <div className='declare-book'>Book Session With Career Personnel</div>
                <input type="search" placeholder='Search personnel...' onChange={searchPersonnel}/>
            </div>

            <div className="per-summary-book">
                <div className="notes-book">
                    <FontAwesomeIcon 
                    id="take-it"
                    icon={faCalendarAlt} 
                    className = "trash_avail"
                    />
                    <span>All Your Upcoming Appointments!</span>
                </div>
                <div className='tablar'>
                {appointments.length > 0 ? (<table>
                    <thead>
                        <tr>
                            <th>Personnel</th>
                            <th>Day</th>
                            <th>time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((session) => (
                        <tr key={session.bookingID} className = "categorize">
                            <td>{`${session.adfName} ${session.adlName}`}</td>
                            <td>{session.day_}</td>
                            <td>{session.time_}</td>
                            <td id='controller'>
                                <button 
                                    title='deleted appointment'
                                    className='cancel-book'
                                    onClick={() => removeBooking(session)}
                                    >    
                                    Cancel
                                </button>

                                <FontAwesomeIcon 
                                    title='view details'
                                    id="view-more"
                                    icon={faEye} 
                                    className = "trash_avail"
                                    onClick={() => viewMore (session)}
                                />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>) : (
                    <center id='nothing'> No appointments now!</center>
                )}
                </div>
            </div>

        </div>
    )
}

export default Header;