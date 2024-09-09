import React, { useState } from 'react';
import { CiTextAlignCenter, CiTextAlignLeft, CiTextAlignRight, CiImageOn, CiVideoOn } from 'react-icons/ci';
import FontSelector from './components/FontSelector';
import TextFormattingButtons from './components/TextFormattingButtons';
import MediaUploader from './components/MediaUploader';
import LinkAdder from './components/LinkAdder';
import EmojiPicker from './EmojiPicker'; // Import the EmojiPicker component
import { CloseIcon, SmileIcon, CodeIcon } from '../../assets/icons/Icon';
import CodeBlockAdder from './components/CodeBlockAdder';

const Toolbar = ({ editorRef }) => {
  const [fontType, setFontType] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');
  const [urlInput, setUrlInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [linkName, setLinkName] = useState('');
  const [isAlignMenuOpen, setIsAlignMenuOpen] = useState(false);
  const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isCodeMenuOpen, setIsCodeMenuOpen] = useState(false);
  const [categories] = useState(['Technology', 'Lifestyle', 'Education', 'Entertainment']); // Example categories
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color is black

  const handleTextFormatting = (command, value) => {
    document.execCommand(command, false, value);
  };

  const handleAddCodeBlock = (code) => {
    const codeHTML = `<pre><code>${code}</code></pre>`;
    const currentContent = editorRef.current.innerHTML;
    editorRef.current.innerHTML = currentContent + codeHTML;
  };

  const handleAlignment = (alignment) => {
    handleTextFormatting('justify' + alignment);
    setIsAlignMenuOpen(false);
  };

  const handleSelectEmoji = (emoji) => {
    const emojiHTML = emoji;
    const currentContent = editorRef.current.innerHTML;
    editorRef.current.innerHTML = currentContent + emojiHTML;
    setIsEmojiMenuOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryMenuOpen(false);
  };

  return (
    <div className="toolbar">
      <FontSelector
        fontType={fontType}
        fontSize={fontSize}
        fontTypes={['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana']}
        fontSizes={['2px', '4px', '6px', '8px', '10px', '12px']}
        handleFontTypeChange={(font) => {
          setFontType(font);
          handleTextFormatting('fontName', font);
        }}
        handleFontSizeChange={(size) => {
          setFontSize(size);
          handleTextFormatting('fontSize', size.replace('px', ''));
        }}
      />

      <TextFormattingButtons
        handleTextFormatting={handleTextFormatting}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <div className="toolbar-item">
        <button onClick={() => setIsEmojiMenuOpen(!isEmojiMenuOpen)}>
          <SmileIcon title="Emoji" />
        </button>
        {isEmojiMenuOpen && (
          <EmojiPicker
            onSelectEmoji={handleSelectEmoji}
            onClose={() => setIsEmojiMenuOpen(false)}
          />
        )}
      </div>

      {/* Category Dropdown */}
      <div className="category-menu">
        <button onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}>
          {selectedCategory}
        </button>
        {isCategoryMenuOpen && (
          <div className="category-options">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Alignment Dropdown */}
      <div className="alignment-menu">
        <button onClick={() => setIsAlignMenuOpen(!isAlignMenuOpen)}><CiTextAlignCenter /></button>
        {isAlignMenuOpen && (
          <div className="alignment-options">
            <button onClick={() => handleAlignment('Left')}><CiTextAlignLeft /></button>
            <button onClick={() => handleAlignment('Center')}><CiTextAlignCenter /></button>
            <button onClick={() => handleAlignment('Right')}><CiTextAlignRight /></button>
          </div>
        )}
      </div>

      <LinkAdder
        handleAddLink={() => {
          const linkHTML = `<a href="${urlInput}">${linkName}</a>`;
          const currentContent = editorRef.current.innerHTML;
          editorRef.current.innerHTML = currentContent + linkHTML;
          setUrlInput('');
          setLinkName('');
        }}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        linkName={linkName}
        setLinkName={setLinkName}
      />

      <MediaUploader
        handleMediaUpload={(event, type) => {
          const file = event.target.files[0];
          if (file) {
            const fileURL = URL.createObjectURL(file);
            const mediaHTML = `<${type} src="${fileURL}" />`;
            const currentContent = editorRef.current.innerHTML;
            editorRef.current.innerHTML = currentContent + mediaHTML;
          }
        }}
        handleAddMedia={(type) => {
          const mediaHTML = `<${type} src="${urlInput}" />`;
          const currentContent = editorRef.current.innerHTML;
          editorRef.current.innerHTML = currentContent + mediaHTML;
          setUrlInput('');
        }}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
      />

      {/* Code Block Dropdown */}
      <CodeBlockAdder handleAddCodeBlock={handleAddCodeBlock} />
    </div>
  );
};

export default Toolbar;
