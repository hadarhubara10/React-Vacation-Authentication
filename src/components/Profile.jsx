import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userData = useSelector((state) => state.userData);
  return (
    <div>
      Profile
      {JSON.stringify(userData)}
    </div>
  );
};

export default Profile;
