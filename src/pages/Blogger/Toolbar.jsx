import React, { useState } from 'react';
import FontSelector from './components/FontSelector';
import TextFormattingButtons from './components/TextFormattingButtons';
import { CiTextAlignCenter, CiTextAlignLeft, CiTextAlignRight } from 'react-icons/ci';
import MediaUploader from './components/MediaUploader';
import LinkAdder from './components/LinkAdder';
import EmojiPicker from './EmojiPicker';
import { SmileIcon, Bulletpoint, Numbering } from '../../assets/icons/Icon';
import CodeBlockAdder from './components/CodeBlockAdder';
import CategorySelector from './components/CategorySelector'; // Import the CategorySelector component

const Toolbar = ({ editorRef, setCategory }) => {
  const [fontType, setFontType] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');
  const [urlInput, setUrlInput] = useState('');
  const [linkName, setLinkName] = useState('');
  const [isAlignMenuOpen, setIsAlignMenuOpen] = useState(false);
  const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
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

      {/* Category Selector */}
      <CategorySelector setCategory={setCategory} /> {/* Include the category selector */}

      {/* Alignment Dropdown */}
      <div className="alignment-menu">
        <button onClick={() => setIsAlignMenuOpen(!isAlignMenuOpen)}><CiTextAlignLeft /></button>
        {isAlignMenuOpen && (
          <div className="alignment-options">
            <button onClick={() => handleAlignment('Left')}><CiTextAlignLeft /></button>
            <button onClick={() => handleAlignment('Center')}><CiTextAlignCenter /></button>
            <button onClick={() => handleAlignment('Right')}><CiTextAlignRight /></button>
          </div>
        )}
      </div>

      {/* Bullets and Numbering */}
      <div className="toolbar-item">
        <button onClick={() => handleTextFormatting('insertUnorderedList')}>
          <Bulletpoint/>
        </button>
        <button onClick={() => handleTextFormatting('insertOrderedList')}>
          <Numbering/>
        </button>
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
