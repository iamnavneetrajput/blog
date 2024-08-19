import React from "react";

const Toggle = ({ isNightMode, onToggle }) => {
  return (
    <label htmlFor="check" className="switch">
      <input type="checkbox" id="check" checked={isNightMode} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default Toggle;
