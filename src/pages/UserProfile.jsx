import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

const UserProfile = ({ user }) => (
  <div className="div1">
    <img src={user.photoURL || 'default-image.jpg'} alt="User Image" />
    <h3>{user.displayName || 'Default Name'}</h3>
    <p>{user.email || 'Default Email'}</p>
    <button className="edit-user"><AiOutlineEdit /> Edit Profile</button>
  </div>
);

export default UserProfile;
