// FontSelector.js
import React from 'react';

const FontSelector = ({ fontType, fontSize, fontTypes, fontSizes, handleFontTypeChange, handleFontSizeChange }) => {
  return (
    <>

      <div className="post-category">
        {/* Font Type */}
        <select value={fontType} onChange={(e) => handleFontTypeChange(e.target.value)} title="Font Type" className='post-category-select'>
          {fontTypes.map((font, index) => (
            <option key={index} value={font}>{font}</option>
          ))}
        </select>

        {/* Font Size */}
        <select value={fontSize} onChange={(e) => handleFontSizeChange(e.target.value)} title="Font Size" className='post-category-select'>
          {fontSizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
        </div>
    </>
  );
};

export default FontSelector;
