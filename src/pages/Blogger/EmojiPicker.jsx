// EmojiModal.js
import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '../../assets/icons/Icon';

// List of emojis to display in the modal
const emojis = ['😀', '😂', '😍', '😎', '🤔', '😭', '😡', '👍', '👎', '👏', '🖕'];

const EmojiPicker = ({ onSelectEmoji, onClose }) => {
  return ReactDOM.createPortal(
    <div className="unified-modal-overlay">
      <div className="unified-modal">
        <div className="unified-content emoji-picker">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              className="unified-button emoji-button"
              onClick={() => onSelectEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}
          <button onClick={onClose} className="close-modal">
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EmojiPicker;
