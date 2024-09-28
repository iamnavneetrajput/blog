import React, { useState } from 'react';
import '../../blogger/actions/action.css'


const MenuButtons = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);

  const handleSave = () => setIsSaved((prev) => !prev);
  const handleComment = () => setIsCommented((prev) => !prev);
  const handleLike = () => setIsLiked((prev) => !prev);
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  const toggleShareMenu = () => {
    setIsShareVisible((prev) => !prev);
  };

  return (
    <div className="menu-container main">
      <div className="button-wrapper">
        {/* Save Button */}
        <button className="button save-wrapper" onClick={handleSave}>
          <span className={`icon ${isSaved ? 'active' : ''}`}>
            {/* Replace with your actual save SVG */}
            {isSaved ? '✅' : '💾'}
          </span>
          Save
        </button>

        {/* Comment Button */}
        <button className="button comment-wrapper" onClick={handleComment}>
          <span className={`icon ${isCommented ? 'active' : ''}`}>
            {/* Replace with your actual comment SVG */}
            {isCommented ? '💬' : '🗨️'}
          </span>
          Comment
        </button>

        {/* Like Button */}
        <button className="button like-wrapper" onClick={handleLike}>
          <span className={`icon ${isLiked ? 'active' : ''}`}>
            {/* Replace with your actual like SVG */}
            {isLiked ? '❤️' : '👍'}
          </span>
          Like
        </button>

        {/* Copy Button */}
        <button className="button copy-wrapper" onClick={handleCopy}>
          <span className={`icon ${isCopied ? 'active' : ''}`}>
            {/* Replace with your actual copy SVG */}
            {isCopied ? '📋' : '📄'}
          </span>
          Copy
        </button>

        {/* Share Button */}
        <div className="share-wrapper">
          <button className="button share-button" onClick={toggleShareMenu}>
            Share
          </button>
          {isShareVisible && (
            <div className="share-icons">
              <div className="icon" onClick={() => console.log('Shared on Facebook')}>
                <span>Facebook</span>
              </div>
              <div className="icon" onClick={() => console.log('Shared on Twitter')}>
                <span>Twitter</span>
              </div>
              <div className="icon" onClick={() => console.log('Shared on WhatsApp')}>
                <span>WhatsApp</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuButtons;
