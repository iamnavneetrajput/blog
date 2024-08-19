// PageHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, paragraph, buttonText, buttonLink, className }) => {
    return (
        <>
        <div className={`home ${className}`}>
            <h1>{title}</h1>
            <p className="">{paragraph}</p>
            {buttonText && buttonLink && (
                <Link to={buttonLink}>
                    <button className='Explore'>{buttonText}</button>
                </Link>
            )}
        </div>
        </>
    );
};

export default PageHeader;
