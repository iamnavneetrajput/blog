import React from 'react';
import { RiCloseFill } from "react-icons/ri";
import DOMPurify from 'dompurify';

const PreviewModal = ({ content, onClose }) => {
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

  // Dummy data for preview (You can replace this with your actual data)
  const dummyPost = {
    title: 'Preview Title',
    content: content, // Use the content from the editor
    category: { name: 'Demo Category' },
    publishDate: new Date().toISOString(), // Current date as published date
  };

  const categoryName = dummyPost.category ? dummyPost.category.name : 'Unknown Category';

  return (
    <div className="preview-modal-overlay main">
      <div className="preview-modal">
        <button className="close-modal" onClick={onClose}><RiCloseFill /></button>
        <div className="post-detail">
          <h2>{dummyPost.title}</h2>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dummyPost.content) }}
          />
          <div className="post-info">
            <p>Category: {categoryName}</p>
            <p>Published by: Navneet</p>
            <p>Published on: {formatDate(dummyPost.publishDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
