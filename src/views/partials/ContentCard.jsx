import React from 'react';

const ContentCard = ({ name, description, buttonText, link, image }) => {
    return (
        <div className="card">
            <h4>{name}</h4>
            {image && <img src={image} alt={name} className="card-image" />}
            <p>{description}</p>
            <a href={link} className="button">{buttonText}</a>
        </div>
    );
};

export default ContentCard;
