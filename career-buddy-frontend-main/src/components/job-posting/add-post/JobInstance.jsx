import React from 'react'
import "./JobInstance.scss"
import Modal from '@mui/material/Modal';
import Loader from "../../loader/Loader";

const JobInstance = ({showModal, hideModal, loading, header, title, organization, location, deadline, description, attachment, getPostInformation, link, finalizePost}) => {
  return (
    <div className='jobInstance'>  
      <Modal
            open={showModal}
            onClose={hideModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <div className="modal-header-job">
                <span className="close-job" onClick={hideModal}>
                    x
                </span> <br />
                <div className='header'>{header ?? "Add Post"}</div>

                <div className='inputs-jobs'>
                  <div className='inputs'>
                    <div>
                      <label htmlFor="title">Title*</label><br />
                      <input type="text" id = "title" placeholder='opportunity title' value={title} onChange={getPostInformation}/>
                    </div>
                    <div>
                      <label htmlFor="organization">organization*</label><br />
                      <input type="text" id = "organization" placeholder='organization' value={organization} onChange={getPostInformation}/>
                    </div>
                  </div>

                  <div className='inputs'>
                    <div>
                      <label htmlFor="location">Location*</label><br />
                      <input type="text" id = "location" placeholder='location' value={location} onChange={getPostInformation}/>
                    </div>
                    <div>
                      <label htmlFor="deadline">Deadline*</label><br />
                      <input type="date" id = "deadline" placeholder='deadline' value={deadline} onChange={getPostInformation}/>
                    </div>
                  </div>

                  <div className='inputs'>
                    <div>
                      <label htmlFor="description">Add the career posting description*</label><br />
                      <textarea type="textarea" id = "description" placeholder='Posting description..' value={description} onChange={getPostInformation}/>
                    </div>
                  </div>

                  <div className='inputs'>
                    <div>
                      <label htmlFor="site">Link to external site*</label><br />
                      <input type="text" id = "site" placeholder='Link to site' value={link} onChange={getPostInformation}/>
                    </div>
                  </div>

                  <div className='inputs'>
                    <div className='attachmemt'>
                      <span id='attach'>Add attachment</span>
                      <input type="file" id = "logo" onChange={getPostInformation}/>
                    </div>
                  </div>

                  <button className='poster' onClick= {finalizePost}>{header ?? "Add Post"}</button>
                </div>
                {loading &&<Loader/> }
            </div>
        </Modal>
    </div>
  )
}

export default JobInstance;