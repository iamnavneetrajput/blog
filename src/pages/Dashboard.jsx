import React from 'react'
import UserProfile from './UserProfile'
import SavedArticles from './SavedArticles'
import Comments from './Comments'
import LikedPost from './LikedPost'
import UnfinishedReading from './UnfinishedReading'
import Updates from './Updates'

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  return (
    <div className='main'> 
<div className="parent-wrap">
    <div className="parent">
      <UserProfile user={user}/>
      <SavedArticles/>
      <Comments/>
      <LikedPost/>
      <UnfinishedReading/>
      <Updates/>
    </div>
    </div>
    </div>
  )
}

export default Dashboard;
