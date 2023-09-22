import React from 'react'

const Reset = () => {
  return (
    <div>
        <Modal
        open={showModal.modalEdit}
        onClose={hideModalProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-header">
          <span className="close-button" onClick={hideModalProfile}>
            x
          </span>
          <div className="modal-title">Update Profile</div>
          <div>
          </div >
          <form className="modal-content" onSubmit={handleSubmit}>
              <input
                placeholder= "new first name"
                type="text"
                id="fName"
                value={newDetails.fName}
                onChange={handleInputChange}
              /> <br />
              <input
              placeholder="new last name"
              type="text"
              id="lName"
              value={newDetails.lName}
              onChange={handleInputChange}
            /> 
            <button type="submit" onClick={handleSubmit}>Save</button>
          </form>

          {loading &&<Loader margin={"125px"}/> }
        </div>
      </Modal>
    </div>
  )
}

export default Reset