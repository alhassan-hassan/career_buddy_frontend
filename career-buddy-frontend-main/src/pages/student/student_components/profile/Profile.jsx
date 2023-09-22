import React, { useEffect } from 'react'
import Profile_ from '../../../../components/profile/full-profile/Profile'
import useAuth from '../../../../hooks/useAuth'

const Profile = () => {
  return (
    <div>
      <Profile_ role={"Student"} />
    </div>
  );
};

export default Profile;
