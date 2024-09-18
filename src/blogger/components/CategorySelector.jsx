import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySelector = ({ setCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.193.146:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false whether there's an error or not
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="post-category">
      <select onChange={handleChange} defaultValue="" disabled={loading || error} className='post-category-select'>
        {loading ? (
          <option value="" disabled>Loading categories...</option>
        ) : error ? (
          <option value="" disabled>Could not load categories</option>
        ) : (
          <>
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default CategorySelector;
