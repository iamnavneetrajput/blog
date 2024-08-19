import React from 'react';
import PageHeader from '../partials/PageHeader';
import CategoriesComponent from '../partials/CategoriesComponent';
import RecentArticles from '../partials/Articles';

const homeCategories = [
    // Your home page specific categories data
    {
        id: 1,
        name: 'Home Category 1',
        description: 'Description for home category 1.',
        path: '/home-category-1',
       
    },

    {
        id: 2,
        name: 'Home Category 1',
        description: 'Description for home category 1.',
        path: '/home-category-1',
       
    },
    {
        id: 3,
        name: 'Home Category 1',
        description: 'Description for home category 1.',
        path: '/home-category-1',
       
    },
    {
        id: 4,
        name: 'Home Category 1',
        description: 'Description for home category 1.',
        path: '/home-category-1',
       
    },
    {
        id: 5,
        name: 'Home Category 1',
        description: 'Description for home category 1.',
        path: '/home-category-1',
       
    },
    // Add more categories specific to Home
];

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
            <CategoriesComponent categories={homeCategories} buttonText="Learn More"  />
            <RecentArticles/>
        </div>
    );
}

export default Home;
