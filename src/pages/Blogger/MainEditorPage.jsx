import React, { useRef, useState, useEffect } from 'react';
import Toolbar from './Toolbar';  // Import the Toolbar component
import PreviewModal from './PreviewPage';  // Import the PreviewModal component
import Notification from './components/Notification';
import { FiSend, FiSave, FiEye, FiDelete } from 'react-icons/fi';
import axios from 'axios';

const MainEditorPage = () => {
  const [title, setTitle] = useState(''); // State for the post title
  const contentRef = useRef(null);  // Reference to the contenteditable div for content
  const titleRef = useRef(null);  // Reference to the contenteditable div for title
  const [previewMode, setPreviewMode] = useState(false); // Preview mode state
  const [message, setMessage] = useState(''); // State for showing messages
  const [messageType, setMessageType] = useState('success'); // Message type: success or error

  // Function to handle publishing the content
  const handlePublish = async () => {
    const content = contentRef.current.innerHTML; // Get HTML content from editor
    const titleText = titleRef.current.innerText; // Get title from title editor

    try {
      await axios.post('http://192.168.193.146:5000/api/post', { title: titleText, content });
      showMessage('Post saved successfully!', 'success'); // Display success message
    } catch (error) {
      console.error('Error saving post:', error);
      showMessage('Failed to save post.', 'error'); // Display error message
    }
  };

  // Save content to localStorage
  const handleSave = () => {
    const content = contentRef.current.innerHTML;
    localStorage.setItem('editorContent', content);
    showMessage('Content saved!', 'success'); // Display save message
  };

  // Clear the editor content
  const handleClear = () => {
    contentRef.current.innerHTML = '';
    showMessage('Content cleared!', 'success'); // Display clear message
  };

  // Handle title input changes
  const handleTitleInput = () => {
    if (titleRef.current) {
      setTitle(titleRef.current.innerText); // Update the title state
    }
  };

  // Show a message and auto-hide after 3 seconds
  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
  };

  const clearMessage = () => {
    setMessage(''); // Clear the message after 3 seconds
  };

  useEffect(() => {
    // Set default text when component mounts
    if (titleRef.current) {
      titleRef.current.innerText = 'Enter Your Title'; // Default title text
    }
    if (contentRef.current) {
      contentRef.current.innerHTML = 'Start writing your content here...'; // Default content text
    }
  }, []);

  const handleInput = () => {
    // Ensure the default text is only present when the div is empty
    if (titleRef.current && titleRef.current.innerText.trim() === 'Enter Your Title') {
      titleRef.current.innerText = ''; // Clear the default text when editing starts
    }
    if (contentRef.current && contentRef.current.innerHTML.trim() === 'Start writing your content here...') {
      contentRef.current.innerHTML = ''; // Clear the default content when editing starts
    }
  };

  return (
    <div className="main-editor-page main">
      {/* Toolbar for formatting and adding content */}
      <Toolbar editorRef={contentRef} />

      {/* Title area with default text */}
      <div
        ref={titleRef}
        className="editor-title"
        contentEditable="true"
        style={{
          border: '1px solid #ccc',
          padding: '4px',
          marginTop: '20px',
          backgroundColor: 'var(--background)',
          borderRadius: '5px',
          textAlign: 'left',
          minHeight: '40px', // Ensures the area is visible
        }}
        onInput={handleTitleInput} // Update title state when editing
        onBlur={handleTitleInput} // Update title state when editing ends
      />

      {/* Main editor area where content is displayed */}
      <div
        ref={contentRef}
        className="editor-content"
        contentEditable="true"
        style={{
          border: '1px solid #ccc',
          minHeight: '300px',
          padding: '10px',
          marginTop: '20px',
          backgroundColor: 'var(--background)',
          borderRadius: '5px',
          textAlign: 'left',
        }}
        onInput={handleInput} // Handle input changes
      />

      {/* Notification display */}
      <Notification message={message} type={messageType} clearMessage={clearMessage} />

      <div className="editor-actions">
        {/* Publish */}
        <button className='publish-btn' onClick={handlePublish}><FiSend title="Publish" /> Publish</button>

        {/* Preview */}
        <button onClick={() => setPreviewMode(!previewMode)} className='publish-btn'>
          {previewMode ? <FiEye title="Edit" /> : <FiEye title="Preview" />} Preview
        </button>
        {previewMode && (
          <PreviewModal content={contentRef.current.innerHTML} onClose={() => setPreviewMode(false)} />
        )}

        {/* Save */}
        <button onClick={handleSave} className='publish-btn'><FiSave title="Save" /> Save</button>
        <button onClick={handleClear} className='publish-btn'><FiDelete title="Clear" /> Clear</button>
      </div>
    </div>
  );
};

export default MainEditorPage;
