import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import * as Sentry from '@sentry/react';
import Loader from '../views/partials/Loader';
import { BiCategory } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
// import Postmenu from '../views/partials/Postmenu';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Fallback URL for development

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Unknown Date'
      : date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err.response ? 'Failed to fetch post. Please try again later.' : 'Network error');
        console.error('Error fetching post:', err);
        Sentry.captureException(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, API_URL]);

  useEffect(() => {
    if (post) {
      Prism.highlightAll();
    }
  }, [post]);

  if (loading) {
    return <Loader message="Loading post..." />; // Optionally pass a message prop to Loader
  }

  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>No post found</p>;

  const categoryName = post.category ? post.category.name : 'Unknown Category';

  return (
    <div className="main">
      <div className="post-detail">
        <h2>{post.title}</h2>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
        <div className="post-info">
          <p className="post-info-item"><BiCategory />: {categoryName}</p>
          <p className="post-info-item"><FiUser />: Navneet</p>
          <p className="post-info-item"><FiCalendar />: {formatDate(post.publishDate)}</p>
        </div>

      </div>
      {/* <Postmenu /> */}
    </div>
  );
};

export default PostDetail;
