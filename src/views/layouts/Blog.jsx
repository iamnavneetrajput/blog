import React from 'react';
import CategoriesComponent from '../partials/CategoriesComponent';
import HomeCategories from './Data'
import Slidercomponent from '../partials/Slidercomponent'


function Home() {
    return (
        <div className='main'>

            <Slidercomponent />

            {/* <CategoriesComponent categories={HomeCategories} buttonText="Learn More" /> */}
        </div>
    );
}

export default Home;
