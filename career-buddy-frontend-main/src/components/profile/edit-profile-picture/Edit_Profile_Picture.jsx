import "./Profile_Picture.scss";
import React, { useState } from 'react';
import Loader from "../../loader/Loader";
import Modal from '@mui/material/Modal';

const Edit_Profile_Picture = ({hideModal, showModal, makeUpdate, loading}) => {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // Try to upload the file
  const handleImageChange = (e) => {
    e.preventDefault();
    
    // getting the file path from the file object
    const file = e.target.files[0];
    setImage(file)
    
    // this creates a path to the preview view of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
        <Modal
            open={showModal}
            onClose={hideModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <div className="modal-header-edit">
                <span className="close-button1" onClick={hideModal}>
                    x
                </span>
                <span className="modal-title1">Upload New Picture </span> <br /><br />
                {!imagePreviewUrl && (<div id="meantime"></div>)}
                {imagePreviewUrl && (
                    <div className="image_preview">
                    <img src={imagePreviewUrl} alt="profile"/>
                    </div>
                )}
                <input
                    className="upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                /> <br />
                {imagePreviewUrl && (
                    <button 
                        id="update-pic"
                        onClick = {() => makeUpdate(image)}
                    >Upload Picture</button>   
                )} <br />
                {loading &&<Loader/> }
            </div>
        </Modal>
    </div>
  );
};

export default Edit_Profile_Picture
