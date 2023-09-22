import User_Profile from "../User_Profile";
import Profile_ from '../../../../src/profile.jpeg';
import { useState} from "react";
import "./Profile.scss";
import Modal from '@mui/material/Modal';
import Loader from "../../loader/Loader";
import Edit_Profile_Picture from "../edit-profile-picture/Edit_Profile_Picture";
import useAuth from '../../../hooks/useAuth'
import Axios from "axios";
import { BASE_URL } from "../../../network/api-endpoints";

const Profile = ({role}) => {
  // GETTING THE GLOBAL STATE
  const {auth, setAuth} = useAuth();
  
  // store details of user
  const [details, setDetails] = useState({
    fName: auth.data[0].fName,
    lName: auth.data[0].lName
  })

  //store details of updated information of user
  const [newDetails, setNewDetails] = useState({
    fName: details.fName,
    lName: details.lName
  });

  // reset password details
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    password: "",
    password_confirmation: ""
  });

  //Loader
  const [loading, setLoading] = useState(false);

  // Determines whether the modal page closes or not
  const [showModal, setShowModal] = useState({
    modalEdit: false,
    modalPic: false,
    modalReset: false,
  });

  // get new profile details
  const onEditProfile = () => {
    setShowModal({...showModal, modalEdit: true});
  }

  //get new profile picture
  const onEditProfilePicture = () => {
    setShowModal({...showModal, modalPic: true});
  }
  
  // toggle edit profile modal
  const hideModalProfile = () => {
    setShowModal({...showModal, modalEdit: false});
  }
  
  // toggle edit profile picture modal
  const hideModalProfilePicture = () => {
    setShowModal({...showModal, modalPic: false});
  }

  // handle the new uer information
  const handleInputChange = (e) => {
    setNewDetails({...newDetails, [e.target.id]: e.target.value});
  }

  // handle the new password details
  const handlePasswordReset = (e) => {
    setPasswords({...passwords, [e.target.id]: e.target.value});
  }

  // Update information of the user
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (const property in newDetails) {
      formData.append(property, newDetails[property]);
    }
    formData.append("_method", "PUT");

    Axios.post(`${BASE_URL}update/${auth.data[0].userID}`, formData)
    .then(response => {
        if (response.data.ok) {
          setAuth({...auth, data: [response.data.updated]})
          // Retrieve the data from local storage
          const storedData = sessionStorage.getItem('career-buddy-auth');
          
          // Parse the retrieved data into an object
          const authObject = JSON.parse(storedData);
          console.log(authObject)
          
          // Update the data portion of the object
          authObject.data = [response.data.updated];

          // Convert the updated object back into a JSON string
          const updatedJsonString = JSON.stringify(authObject);

          // Store the updated JSON string in local storage
          sessionStorage.setItem('career-buddy-auth', updatedJsonString);
        }
      }).catch(error => {
        console.error(error);
      });

    // set the timer rolling
    setLoading(true);

    setTimeout(() => {
        // Close both the loader and the modal page
        setLoading(false);
        setShowModal({...showModal, modalEdit:false});
    },3000); 

    setTimeout(() => {
      alert("Profile Update was Successful!");
    },4500); 
  };


  // CHANGING THE PROFILE PICTURE
  const finalizeUpdate = (image) => { // set the timer rolling
    setLoading(true);

    // setting the file up for pushing into the database
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("profilePicture", image);
    

    Axios.post(`${BASE_URL}update/${auth.data[0].userID}`, formData)
    .then(response => {
        if (response.data.ok) {
          setAuth({...auth, data: [response.data.updated]})
          // Retrieve the data from local storage
          const storedData = sessionStorage.getItem('career-buddy-auth');
          
          // Parse the retrieved data into an object
          const authObject = JSON.parse(storedData);
          console.log(authObject)
          
          // Update the data portion of the object
          authObject.data = [response.data.updated];

          // Convert the updated object back into a JSON string
          const updatedJsonString = JSON.stringify(authObject);

          // Store the updated JSON string in local storage
          sessionStorage.setItem('career-buddy-auth', updatedJsonString);
          setTimeout(() => {
          
            // Close both the loader and the modal page
            setLoading(false);
            setShowModal({...showModal, modalPic:false});
    
          },1500); 
    
          setTimeout(() => {
            alert("Profile Picture Update was Successful!");
          },2000);
        } else {
          setTimeout(() => {
            // Close both the loader and the modal page
            setLoading(false);
            setShowModal({...showModal, modalPic:false});
          },2000); 

          setTimeout(() => {
            alert(`Unsuccessful! ${response.data.message.profilePicture[0]}`)
          },2500);
        }
      }).catch(error => {
        console.error(error);
      });
  }

    // opens modal page of reset password page. 
  const onResetPassword = () => {
    setShowModal({...showModal, modalReset: true})
  }

  // this closes the modal page
  const hideResetPasswordModal = () => {
    setShowModal({...showModal, modalReset: false})
  }

  const handleSubmitNewPassword = (e) => {
    e.preventDefault()

    setLoading(true);

    // get password information in form data object
    const formData = new FormData();
    for (const property in passwords) {
        formData.append(property, passwords[property]);
    }
    formData.append("_method", "PUT")
    
    Axios.post(`${BASE_URL}reset-password/${auth.data[0].userID}`, formData)
    .then(response => {
      if (response.data.ok) {
        setTimeout(() => {
          alert(response.data.message);
        },2000);
      } else {
        setTimeout(() => {
          if (typeof response.data.message === "object") {
            alert(response.data.message.password[0]);
          } else {alert(response.data.message);}
        },2000);
      }
    }).catch(error => {
      console.log(error)
      setTimeout(() => {
        alert("Something went wrong!");
      },2000);
    });

    setTimeout(() => {
      // Close both the loader and the modal page
      setLoading(false);
      setShowModal({...showModal, modalReset:false});
    },1500);  
  }


  return (
    <div>
      <User_Profile 
        fname={auth.data[0].fName}
        lname = {auth.data[0].lName}
        email = {auth.data[0].email}
        profilePicture = {auth.data[0].profilePicture}
        ID={auth.data[0].userID}
        role = {role}
        onEditProfile = {onEditProfile}
        onEditProfilePicture = {onEditProfilePicture}
        onResetPassword = {onResetPassword}
      />
      {/* edit profile */}
      <Modal
        open={showModal.modalEdit}
        onClose={hideModalProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-header1">
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

      {/* reset password */}
      <Modal
        open={showModal.modalReset}
        onClose={hideResetPasswordModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-header2">
          <span className="close-button" onClick={hideResetPasswordModal}>
            x
          </span>
          <div className="modal-title">Reset Password? </div>
          <div>
          </div >
          <form className="modal-content" onSubmit={handleSubmit}>
              <input
                placeholder= "old password*"
                type="password"
                id="oldPassword"
                onChange={handlePasswordReset}
              /> <br />
              <input
                placeholder="new password*"
                type="password"
                id="password"
                onChange={handlePasswordReset}
              /> 
              <input
                placeholder= "repeat new passowrd*"
                type="password"
                id="password_confirmation"
                onChange={handlePasswordReset}
              /> <br />
            <button type="submit" onClick={handleSubmitNewPassword}>Reset</button>
          </form>

          {loading &&<Loader margin={"125px"}/> }
        </div>
      </Modal>

      <Edit_Profile_Picture 
        hideModal = {hideModalProfilePicture}
        showModal = {showModal.modalPic}
        loading = {loading}
        makeUpdate = {finalizeUpdate}
        />
    </div>
  )
};

export default Profile;
