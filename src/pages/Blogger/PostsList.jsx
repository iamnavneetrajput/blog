import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://192.168.193.146:5000/api/posts');
        // No need to format text here if content is already HTML formatted
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="posts-list main">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="post-item">
            <h2>{post.title}</h2>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default PostsList;
