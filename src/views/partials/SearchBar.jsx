import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSearch = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="search-container">
      <button className="search-button" onClick={toggleSearch}>
        <FontAwesomeIcon icon={isActive ? faTimes : faSearch} />
      </button>
      <input
        type="text"
        className={isActive ? "search-input active" : "search-input"}
        id="searchInput"
        placeholder="Search..."
        autoFocus={isActive}
      />
    </div>
  );
};

export default Search;
