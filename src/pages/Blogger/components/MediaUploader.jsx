import React, { useState } from 'react';
import { ImageIcon, VideoIcon, ImageOnIcon, VideoOnIcon, CloseIcon } from '../../../assets/icons/Icon';
import Notification from './Notification'; // Import the Notification component

const MediaUploader = ({ handleMediaUpload, handleAddMedia, urlInput, setUrlInput }) => {
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
  const [isVideoMenuOpen, setIsVideoMenuOpen] = useState(false);
  const [message, setMessage] = useState(''); // State for notification message
  const [messageType, setMessageType] = useState(''); // State for notification type

  const closeModals = () => {
    setIsImageMenuOpen(false);
    setIsVideoMenuOpen(false);
  };

  const handleImageSubmit = () => {
    if (urlInput || handleMediaUpload) {
      handleAddMedia('img');
      setMessage('Image added successfully!');
      setMessageType('success');
      closeModals();
    } else {
      setMessage('Please provide a valid image URL or upload a file.');
      setMessageType('error');
    }
  };

  const handleVideoSubmit = () => {
    if (urlInput || handleMediaUpload) {
      handleAddMedia('video');
      setMessage('Video added successfully!');
      setMessageType('success');
      closeModals();
    } else {
      setMessage('Please provide a valid video URL or upload a file.');
      setMessageType('error');
    }
  };

  const clearMessage = () => {
    setMessage('');
  };

  return (
    <div className="toolbar-media">
      {/* Image Upload */}
      <div className="media-upload-section">
        <button 
          className="modal-trigger-button" 
          onClick={() => setIsImageMenuOpen(!isImageMenuOpen)} 
          title="Add Image"
        >
          <ImageIcon />
        </button>
        {isImageMenuOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-modal" onClick={closeModals}><CloseIcon /></button>
              <input
                className="modal-input"
                type="file"
                accept="image/*"
                onChange={(event) => handleMediaUpload(event, 'img')}
              />
              <input
                className="modal-input"
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter image URL"
              />
              <div className="button-group">
                <button className="modal-button submit-button" onClick={handleImageSubmit}>
                  <ImageOnIcon /> Add url
                </button>
                <button className="modal-button cancel-button" onClick={closeModals}>
                  <CloseIcon/> Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Upload */}
      <div className="media-upload-section">
        <button 
          className="modal-trigger-button" 
          onClick={() => setIsVideoMenuOpen(!isVideoMenuOpen)} 
          title="Add Video"
        >
          <VideoIcon />
        </button>
        {isVideoMenuOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-modal" onClick={closeModals}><CloseIcon /></button>
              <input
                className="modal-input"
                type="file"
                accept="video/*"
                onChange={(event) => handleMediaUpload(event, 'video')}
              />
              <input
                className="modal-input"
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter video URL"
              />
              <div className="button-group">
                <button className="modal-button submit-button" onClick={handleVideoSubmit}>
                  <VideoOnIcon />Add url
                </button>
                <button className="modal-button cancel-button" onClick={closeModals}>
                  <CloseIcon/> Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification */}
      <Notification message={message} type={messageType} clearMessage={clearMessage} />
    </div>
  );
};

export default MediaUploader;
