import React from 'react';
import PageHeader from '../partials/PageHeader';
import CategoriesComponent from '../partials/CategoriesComponent';
import RecentArticles from '../partials/Articles';
import HomeCategories from './Data'


function Home() {
    return (
        <div className='main'>
            <PageHeader
                title="Welcome to Home"
                paragraph="This is a paragraph of text specific to the Home Page."
                buttonText="Explore Courses"
                buttonLink="/course"
                className="home-image"
            />
            <CategoriesComponent categories={HomeCategories} buttonText="Learn More"  />
            <RecentArticles/>
        </div>
    );
}

export default Home;
