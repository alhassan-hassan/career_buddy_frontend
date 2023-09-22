import React from 'react';
import "./Loader.scss";

const User_Profile = ({margin}) => {
  return (
    <div className="lds-ellipsis" style={{marginLeft: margin}}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  );
};

export default User_Profile;