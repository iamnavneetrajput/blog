import React from 'react';
import { RiCloseFill } from "react-icons/ri";

const PreviewModal = ({ content, onClose }) => {
  return (
    <div className="preview-modal-overlay main">
      <div className="preview-modal">
        <button className="close-modal" onClick={onClose}><RiCloseFill/></button>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default PreviewModal;
