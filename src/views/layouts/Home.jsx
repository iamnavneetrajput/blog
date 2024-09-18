import React, { useEffect, useState } from 'react';
import PageHeader from '../partials/PageHeader';
import CategoriesComponent from '../partials/CategoriesComponent';
import RecentArticles from '../partials/Articles';

function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://192.168.193.146:5000/api/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='main'>
            <PageHeader
                title="Welcome to Home"
                paragraph="This is a paragraph of text specific to the Home Page."
                buttonText="Explore Courses"
                buttonLink="/course"
                className="home-image"
            />
            <CategoriesComponent categories={categories} buttonText="Learn More" />
            <RecentArticles />
        </div>
    );
}

export default Home;
