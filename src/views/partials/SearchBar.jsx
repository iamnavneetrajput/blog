import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [topSearchedPosts, setTopSearchedPosts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // New state to track if a search has been performed
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopSearchedPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/top-searched`);
        if (Array.isArray(response.data)) {
          setTopSearchedPosts(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching top searched posts:", error);
      }
    };

    fetchTopSearchedPosts();
  }, []);

  const handleSearch = async (searchQuery) => {
    setHasSearched(true); // Mark that a search has been performed
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search?query=${searchQuery}`);
      if (Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length > 2) {
      handleSearch(newQuery);
    } else {
      setResults([]);
      setHasSearched(false); // Reset search state if query is too short
    }
  };

  const toggleSearch = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setQuery(""); // Clear query when closing search
      setResults([]);
      setHasSearched(false); // Reset search state
    }
  };

  const handleResultClick = async (post) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/record-search`, {
        title: post.title,
        postId: post._id // Send the actual post ID
      });
      navigate(`/post/${post._id}`); // Navigate to the post detail page
      setIsActive(false); // Close the search bar
      setQuery(""); // Clear the search input
      setResults([]); // Clear search results
      setHasSearched(false); // Reset search state
    } catch (error) {
      console.error("Error recording search term:", error);
    }
  };

  const handleTopSearchedClick = async (term) => {
    try {
      const postId = term.postId; // Ensure this is the correct ID string
      navigate(`/post/${postId}`); // Navigate to the post detail page
      setIsActive(false); // Close the search bar
      setQuery(""); // Clear the search input
      setResults([]); // Clear search results
      setHasSearched(false); // Reset search state
    } catch (error) {
      console.error("Error navigating to post:", error);
    }
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
        value={query}
        onChange={handleChange}
        autoFocus={isActive}
      />
      {isActive && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result._id} className="search-result-item" onClick={() => handleResultClick(result)}>
                <h4>{result.title}</h4>
              </div>
            ))
          ) : hasSearched ? ( // Show "No results found" only if a search was performed
            <p>No results found</p>
          ) : (
            <div className="top-searched-posts">
              <h4>Top Searched Posts</h4>
              {topSearchedPosts.map((term) => (
                <div key={term._id} className="top-searched-post-item" onClick={() => handleTopSearchedClick(term)}>
                  <h5>{term.title}</h5>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
