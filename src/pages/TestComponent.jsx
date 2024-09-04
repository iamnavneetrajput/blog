import React from 'react';
import UserProfile from './UserProfile'; // Adjust the import path as needed
import SavedArticles from './SavedArticles'
// import Comments from './Comments'
// import LikedPost from './LikedPost'
// import UnfinishedReading from './UnfinishedReading'
// import Updates from './Updates'

const Dashboard = () => {
  // Retrieve user info from local storage
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      <UserProfile user={user} />
      {/* Other dashboard content */}
      <SavedArticles/>
    </div>
  );
}

export default Dashboard;
