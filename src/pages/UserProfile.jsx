import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

const UserProfile = ({ user }) => (
  <div className="div1">
    <img
      src={user.photoURL || 'icon.png'}
      alt={user.displayName ? `${user.displayName}'s profile picture` : 'Default profile picture'}
      className="user-profile-image"
    />
    <h3>{user.displayName || 'Default Name'}</h3>
    <p>{user.email || 'Default Email'}</p>
    <button className="edit-user"><AiOutlineEdit /> Edit Profile</button>
  </div>
);

export default UserProfile;
