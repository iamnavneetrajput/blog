import React, { useState, useEffect } from 'react';
import { FiBold, FiItalic, FiUnderline } from 'react-icons/fi';
import { ImTextColor } from 'react-icons/im';
import { CloseIcon } from '../../assets/icons/Icon'; // Ensure you have this icon

const TextFormattingButtons = ({ handleTextFormatting, selectedColor, setSelectedColor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    // To update the active formats based on the current selection in the editor
    const checkActiveFormats = () => {
      const formatState = {
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
      };
      setActiveFormats(formatState);
    };

    checkActiveFormats();
  }, []);

  const handleButtonClick = (command, value) => {
    handleTextFormatting(command, value);
    if (command === 'foreColor') {
      setSelectedColor(value);
    } else {
      setActiveFormats((prev) => ({
        ...prev,
        [command]: !prev[command],
      }));
    }
  };

  return (
    <div>
      <button
        className={`format-button ${activeFormats.bold ? 'active' : ''}`}
        onClick={() => handleButtonClick('bold')}
      >
        <FiBold title="Bold" />
      </button>
      <button
        className={`format-button ${activeFormats.italic ? 'active' : ''}`}
        onClick={() => handleButtonClick('italic')}
      >
        <FiItalic title="Italic" />
      </button>
      <button
        className={`format-button ${activeFormats.underline ? 'active' : ''}`}
        onClick={() => handleButtonClick('underline')}
      >
        <FiUnderline title="Underline" />
      </button>

      {/* Color Picker Modal */}
      <button
        className={`color-button ${showColorPicker ? 'active' : ''}`}
        onClick={() => setShowColorPicker(!showColorPicker)}
      >
        <ImTextColor title="Text Color" />
      </button>
      {showColorPicker && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-modal" onClick={() => setShowColorPicker(false)}>
              <CloseIcon />
            </button>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleButtonClick('foreColor', e.target.value)}
              style={{
                marginTop: '20px',
                padding: '0',
                width: '100%',
                height: '100px',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '5px',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextFormattingButtons;
