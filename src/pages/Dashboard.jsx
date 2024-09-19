import React, { Suspense, lazy } from 'react'
import Loader from '../views/partials/Loader'

const UserProfile = lazy(() => import('./UserProfile'));
const SavedArticles = lazy(() => import('./SavedArticles'));
const Comments = lazy(() => import('./Comments'))
const LikedPost = lazy(() => import('./LikedPost'))
const UnfinishedReading = lazy(() => import('./UnfinishedReading'))
const Updates = lazy(() => import('./Updates'))


function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  return (
    <div className='main'>
      <div className="parent-wrap">
        <div className="parent">

          <Suspense fallback={<Loader />}>
            <UserProfile user={user} />
            <SavedArticles />
            <Comments />
            <LikedPost />
            <UnfinishedReading />
            <Updates />
          </Suspense>

        </div>
      </div>
    </div>
  )
}

export default Dashboard;
