import React from 'react';
import PageHeader from '../partials/PageHeader';
import CategoriesComponent from '../partials/CategoriesComponent';

const AboutCategories = [
    // Your About page specific categories data
    {
        id: 1,
        name: 'About Category 1',
        description: 'Description for About category 1.',
        path: '/About-category-1',
        image: 'https://via.placeholder.com/150'
    },

    {
        id: 2,
        name: 'About Category 1',
        description: 'Description for About category 1.',
        path: '/About-category-1',
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 3,
        name: 'About Category 1',
        description: 'Description for About category 1.',
        path: '/About-category-1',
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 4,
        name: 'About Category 1',
        description: 'Description for About category 1.',
        path: '/About-category-1',
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 5,
        image: 'https://via.placeholder.com/150',
        name: 'About Category 1',
        description: 'Description for About category 1.',
        path: '/About-category-1',
    },
    // Add more categories specific to About
];

function About() {
    return (
        <div className='main'>
            <PageHeader
                title="Welcome to About"
                paragraph="This is a paragraph of text specific to the About Page."
                buttonText="Explore Courses"
                buttonLink="/course"
                className="About-image"
            />
            <CategoriesComponent categories={AboutCategories} buttonText="Read Full Article"  />
        </div>
    );
}

export default About;
