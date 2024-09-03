import React from 'react';
import PageHeader from '../partials/PageHeader';

function About() {
    return (
        <>
            <div className='main'>
                <div className="about">
                <PageHeader
                    title="About Us"
                    paragraph="Welcome to Intelli, your go-to for the latest in programming and tech insights. Stay informed with up-to-date programming updates and practical blog posts."
                    // buttonText="Home"
                    // buttonLink="/"
                    className="home-image"
                />
                </div>
            </div>
        </>
    );
}

export default About;
