import React, { useState } from 'react';
import { LinkIcon } from '../../assets/icons/Icon';
import Notification from './Notification'; // Import Notification component

const LinkAdder = ({ handleAddLink, urlInput, setUrlInput, linkName, setLinkName }) => {
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [message, setMessage] = useState(''); // State for notification message
  const [messageType, setMessageType] = useState(''); // State for notification type

  const handleLinkSubmit = () => {
    if (urlInput && linkName) {
      handleAddLink();
      setMessage('Link added successfully!');
      setMessageType('success');
      setIsLinkMenuOpen(false);
    } else {
      setMessage('Please provide a valid URL and link name.');
      setMessageType('error');
    }
  };

  const clearMessage = () => {
    setMessage('');
  };

  return (
    <div>
      <button className="modal-trigger-button" onClick={() => setIsLinkMenuOpen(!isLinkMenuOpen)}>
        <LinkIcon />
      </button>
      {isLinkMenuOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-modal" onClick={() => setIsLinkMenuOpen(false)}>X</button>
            <input
              className="modal-input"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL"
            />
            <input
              className="modal-input"
              type="text"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              placeholder="Link name"
            />
            <div className="button-group">
              <button className="modal-button submit-button" onClick={handleLinkSubmit}>
                Add Link
              </button>
              <button className="modal-button cancel-button" onClick={() => setIsLinkMenuOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Notification */}
      <Notification message={message} type={messageType} clearMessage={clearMessage} />
    </div>
  );
};

export default LinkAdder;
