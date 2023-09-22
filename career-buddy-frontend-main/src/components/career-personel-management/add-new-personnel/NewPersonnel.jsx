import "./NewPersonnel.scss"
import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Loader from "../../../components/loader/Loader";

const NewPersonnel = ({add, loader, setShowAdd, addPersonnelNow}) => {
    const [details, setDetails] = useState({
        userID: "",
        fName: "",
        lName: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: ""
    })

    const handleFieldChange = (event) => {
        setDetails({...details, [event.target.id]: event.target.value})
    }
    
    return (
        <div className="new-personnel" >
            <Modal
                open={add}
                onClose={setShowAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <div className="adding-new">
                <span className="close-button1" onClick={setShowAdd}>
                    x
                </span>
                <center className="modal-title1">Add New Career Personnel </center> <br /><br />
                <input
                    type="text"
                    id="userID"
                    placeholder="user ID"
                    value={details.id}
                    onChange={handleFieldChange}
                />
                <div style={{display: "flex", gap: "0.5rem"}}>
                <input
                    type="text"
                    id="fName"
                    placeholder="firstname"
                    value={details.fn}
                    onChange={handleFieldChange}
                />
                <input
                    type="text"
                    id="lName"
                    placeholder="lastname"
                    value={details.ln}
                    onChange={handleFieldChange}
                />
                </div>
                <input
                    type="email"
                    id="email"
                    placeholder="email"
                    value={details.eml}
                    onChange={handleFieldChange}
                />
                <br />
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    value={details.pass}
                    onChange={handleFieldChange}
                />

                <br />
                <input
                    type="password"
                    id="password_confirmation"
                    placeholder="confirm password"
                    value={details.c_pass}
                    onChange={handleFieldChange}
                />
                <div className='the-choice-new'>
                    <div className='choice-child-new'>
                        <input id = "role" type="radio" name="choice" value="admin" onChange={handleFieldChange}/> Admin
                    </div>
                    <div className='choice-child-new'>
                        <input id = "role" type="radio" name="choice" value="cpa" onChange={handleFieldChange}/> CPA
                    </div>
                </div>
                <button 
                    onClick={() => addPersonnelNow(details)}
                    >Add Career Personnel</button>
                {loader && (
                    <center>
                        <Loader />
                    </center>
                )} 
            </div>
        </Modal>
    </div>
    );
};

export default NewPersonnel;