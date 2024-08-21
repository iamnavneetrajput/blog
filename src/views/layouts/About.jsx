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

                <div className="aboutcontent">
                    <h4>What We Offer</h4>
                    <p>Programming Updates: Stay current with the latest tools, languages, and trends shaping the tech world.</p>
                    <p>Insightful Blogs: Explore tutorials, tips, and deep dives designed to boost your skills and knowledge.</p>
                    <p>At Intelli, we’re passionate about technology and committed to providing content that helps you grow, whether you're a seasoned pro or just starting out. Join us on this journey and let's explore the future of programming together.</p>
                    <h4>Thank you for being here, and happy coding!</h4>
                </div>

            </div>
        </>
    );
}

export default About;
