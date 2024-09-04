import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Filter = ({ onFilterChange }) => {
    const [filterCategory, setFilterCategory] = useState('');
    const [filterInput, setFilterInput] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setFilterCategory(selectedCategory);
        onFilterChange(selectedCategory, filterInput);

        if (selectedCategory) {
            setFilterInput(''); // Clear input when changing category
        }
    };

    const handleInputChange = (event) => {
        const query = event.target.value;
        setFilterInput(query);
        onFilterChange(filterCategory, query);
    };

    const toggleSearch = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="filter-container">
            <button className="search-button" onClick={toggleSearch}>
                <FontAwesomeIcon icon={isActive ? faTimes : faSearch} />
            </button>
            <div className={`filter-bar ${isActive ? 'active' : ''}`}>
                <div className="filter-component">
                    <select
                        id="filter-category"
                        value={filterCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">-- Select --</option>
                        <option value="saved-articles">Saved Articles</option>
                        <option value="comments-replies">Comments & Replies</option>
                        <option value="liked-posts">Liked Posts</option>
                        <option value="unfinished-reading">Unfinished Reading</option>
                        <option value="notifications-updates">Notifications/Updates</option>
                    </select>
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        id="filter-input"
                        placeholder="Type to search..."
                        value={filterInput}
                        onChange={handleInputChange}
                        disabled={!filterCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;
