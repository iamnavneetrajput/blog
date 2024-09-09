// FontSelector.js
import React from 'react';

const FontSelector = ({ fontType, fontSize, fontTypes, fontSizes, handleFontTypeChange, handleFontSizeChange }) => {
  return (
    <>
      {/* Font Type */}
      <select value={fontType} onChange={(e) => handleFontTypeChange(e.target.value)} title="Font Type">
        {fontTypes.map((font, index) => (
          <option key={index} value={font}>{font}</option>
        ))}
      </select>

      {/* Font Size */}
      <select value={fontSize} onChange={(e) => handleFontSizeChange(e.target.value)} title="Font Size">
        {fontSizes.map((size, index) => (
          <option key={index} value={size}>{size}</option>
        ))}
      </select>
    </>
  );
};

export default FontSelector;
