import React, { useState } from "react";

const SavePostButton = () => {
  const [saved, setSaved] = useState(false);

  const toggleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="save-wrapper">
      <input
        className="check"
        type="checkbox"
        id="save-toggle"
        checked={saved}
        onChange={toggleSave}
      />
      <label className="container" htmlFor="save-toggle">
        <svg
          viewBox="0 0 384 512"
          xmlns="http://www.w3.org/2000/svg"
          className={`icon ${saved ? "active" : "inactive"}`}
        >
          <path
            d={
              saved
                ? "M0 512V48C0 21.49 21.49 0 48 0H336C362.5 0 384 21.49 384 48V512L192 400L0 512z"
                : "M336 0H48C21.49 0 0 21.49 0 48V512L192 400L384 512V48C384 21.49 362.5 0 336 0zM336 464L192 368L48 464V48H336V464z"
            }
          ></path>
        </svg>
        <div className="checkmark"></div>
        <span className="save-text">{saved ? "Saved" : "Save Post"}</span>
      </label>
    </div>
  );
};

export default SavePostButton;
