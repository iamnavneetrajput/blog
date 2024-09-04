import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { ResizableBox } from 'react-resizable';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AiOutlineSave } from "react-icons/ai";

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [labels, setLabels] = useState('');
  const [publishedOn, setPublishedOn] = useState(new Date());
  const [permalink, setPermalink] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [drafts, setDrafts] = useState([]);

  // React Dropzone for image and video uploads from device
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith('image')) {
        setContent(prev => [...prev, { type: 'image', file }]);
      } else if (file.type.startsWith('video')) {
        setContent(prev => [...prev, { type: 'video', file }]);
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

    // Live date and time
    useEffect(() => {
      const timer = setInterval(() => {
        setPublishedOn(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);

  // Handle adding image/video from URL
  const handleAddImageFromURL = () => {
    if (imageURL) {
      setContent(prev => [...prev, { type: 'image', url: imageURL }]);
      setImageURL('');
    }
  };

  const handleAddVideoFromURL = () => {
    if (videoURL) {
      setContent(prev => [...prev, { type: 'video', url: videoURL }]);
      setVideoURL('');
    }
  };

  // Handle adding code block manually
  const handleAddCodeBlock = (code) => {
    setContent(prev => [...prev, { type: 'code', code }]);
  };

  // React-Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'video'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['code-block'], // Code block support
      ['clean'], // Clear formatting
    ],
  };

  // Handle publishing the post
  const handlePublish = () => {
    const blogPost = {
      title,
      content,
      labels: labels.split(',').map(label => label.trim()),
      publishedOn,
      permalink,
    };

    console.log('Blog post:', blogPost);
    // Send the blogPost to backend or database
  };

  // Handle saving post to draft
  const handleSaveDraft = () => {
    const draftPost = {
      title,
      content,
      labels: labels.split(',').map(label => label.trim()),
      publishedOn,
      permalink,
    };
    setDrafts(prev => [...prev, draftPost]);
    resetEditor();
  };

  // Reset editor to blank for new post
  const resetEditor = () => {
    setTitle('');
    setContent([]);
    setLabels('');
    setPermalink('');
    setVideoURL('');
    setImageURL('');
  };

  // Generate permalink based on title
  useEffect(() => {
    const link = title.toLowerCase().replace(/\s+/g, '-');
    setPermalink(`https://yourblog.com/${link}`);
  }, [title]);

  // Autosave to localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem('blogContent');
    if (savedContent) {
      const { title, content, labels } = JSON.parse(savedContent);
      setTitle(title);
      setContent(content);
      setLabels(labels);
    }
  }, []);

  useEffect(() => {
    const blogContent = { title, content, labels };
    localStorage.setItem('blogContent', JSON.stringify(blogContent));
  }, [title, content, labels]);

  // Handle delete content
  const handleDeleteContent = (index) => {
    setContent(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="blog-editor-container">
      <div className="editor-main">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="editor-title-input"
        />
        <ReactQuill
          value={content.filter(item => item.type === 'text').map(item => item.text || '').join('')}
          onChange={(text) => {
            setContent(prev => {
              const updatedContent = prev.filter(item => item.type !== 'text');
              return [...updatedContent, { type: 'text', text }];
            });
          }}
          className="editor-content"
          modules={modules}
        />

        {/* Image and Video Upload Section */}
        <div className="media-upload">
          <div {...getRootProps()} className="upload-area">
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to select</p>
          </div>
          <div className="url-upload">
            <input
              type="text"
              placeholder="Enter image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <button onClick={handleAddImageFromURL}>Add Image</button>
            <input
              type="text"
              placeholder="Enter video URL"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <button onClick={handleAddVideoFromURL}>Add Video</button>
          </div>
        </div>

        {/* Code Block Section */}
        <div className="code-block-section">
          <textarea
            placeholder="Insert your code here"
            className="code-block-textarea"
            onBlur={(e) => handleAddCodeBlock(e.target.value)}
          />
        </div>

        {/* Preview Section with Resizing and Deletion */}
        <div className="preview-section">
          <h3>Post Preview</h3>
          <div className="preview-content">
            <h2>{title}</h2>

            {content.map((item, index) => (
              <div key={index} className="content-item">
                {item.type === 'text' && <p>{item.text}</p>}
                {item.type === 'image' && (
                  <ResizableBox width={200} height={200} resizeHandles={['se']}>
                    <img src={item.url || URL.createObjectURL(item.file)} alt={`Uploaded ${index}`} />
                  </ResizableBox>
                )}
                {item.type === 'video' && (
                  <div className="video-wrapper">
                    {item.url ? (
                      <iframe
                        src={item.url}
                        title={`video-${index}`}
                        frameBorder="0"
                        allowFullScreen
                        width="100%"
                        height="200px"
                      ></iframe>
                    ) : (
                      <video controls width="100%">
                        <source src={URL.createObjectURL(item.file)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                )}
                {item.type === 'code' && (
                  <SyntaxHighlighter language="javascript" style={docco}>
                    {item.code}
                  </SyntaxHighlighter>
                )}
                <button className="delete-content-btn" onClick={() => handleDeleteContent(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="editor-sidebar">
        <h4>Post Settings</h4>
        <div className="labels-section">
          <input
            type="text"
            placeholder="Separate labels by commas"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
          />
        </div>
        <div className="publish-section">
          <p>Published on: {publishedOn.toLocaleString()}</p>
        </div>
        <div className="draft-section">
          <button onClick={handleSaveDraft}><AiOutlineSave/></button>
        </div>
        <div className="publish-section">
          <button onClick={handlePublish}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
