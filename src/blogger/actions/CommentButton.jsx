import React, { useState } from "react";
// import './action.css'

const CommentButton = () => {
  const [commented, setCommented] = useState(false);

  const toggleComment = () => {
    setCommented(!commented);
  };

  return (
    <div className="comment-wrapper">
      <input
        className="check"
        type="checkbox"
        id="comment-toggle"
        checked={commented}
        onChange={toggleComment}
      />
      <label className="container" htmlFor="comment-toggle">
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className={`icon ${commented ? "active" : "inactive"}`}
        >
          <path
            d={
              commented
                ? "M256 32C114.6 32 0 125.1 0 240c0 49.1 22.1 94.6 59.2 130.3-12.3 42.6-54.6 85.4-54.8 85.7-3 3-3.8 7.6-2 11.5 1.8 3.9 5.7 6.5 10 6.5 66.2 0 116.5-31.2 140.7-49.1 33.2 12.5 69.9 18.1 103 18.1 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                : "M256 32C114.6 32 0 125.1 0 240c0 49.1 22.1 94.6 59.2 130.3-12.3 42.6-54.6 85.4-54.8 85.7-3 3-3.8 7.6-2 11.5 1.8 3.9 5.7 6.5 10 6.5 66.2 0 116.5-31.2 140.7-49.1 33.2 12.5 69.9 18.1 103 18.1 141.4 0 256-93.1 256-208S397.4 32 256 32zm120 208h-48v48c0 13.3-10.7 24-24 24s-24-10.7-24-24v-48h-48c-13.3 0-24-10.7-24-24s10.7-24 24-24h48v-48c0-13.3 10.7-24 24-24s24 10.7 24 24v48h48c13.3 0 24 10.7 24 24s-10.7 24-24 24z"
            }
          ></path>
        </svg>
        <div className="checkmark"></div>
        <span className="comment-text">{commented ? "Commented" : "Comment"}</span>
      </label>
    </div>
  );
};

export default CommentButton;
