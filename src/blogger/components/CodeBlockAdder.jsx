import React, { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript'; // Import the language you need
import { CodeIcon, CloseIcon } from '../../assets/icons/Icon';
import Notification from './Notification'; // Import the Notification component

const CodeBlockAdder = ({ handleAddCodeBlock }) => {
  const [isCodeMenuOpen, setIsCodeMenuOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [message, setMessage] = useState(''); // State for notification message
  const [messageType, setMessageType] = useState(''); // State for notification type

  const clearMessage = () => {
    setMessage('');
  };

  const addCodeBlock = () => {
    if (codeInput.trim()) {
      const highlightedCode = Prism.highlight(codeInput, Prism.languages.javascript, 'javascript');
      handleAddCodeBlock(`<pre><code class="language-javascript">${highlightedCode}</code></pre>`);
      setMessage('Code block added successfully!');
      setMessageType('success');
      setCodeInput('');
      setIsCodeMenuOpen(false);
    } else {
      setMessage('Please enter some code.');
      setMessageType('error');
    }
  };

  return (
    <div className="code-block-adder">
      <button onClick={() => setIsCodeMenuOpen(!isCodeMenuOpen)}>
        <CodeIcon title="Add Code Block" />
      </button>
      {isCodeMenuOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-modal" onClick={() => setIsCodeMenuOpen(false)}>
              <CloseIcon />
            </button>
            <textarea
              className="modal-input"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Enter your code"
              style={{
                minHeight: '300px',
                padding: '10px',
                marginTop: '20px',
                backgroundColor: 'var(--background)',
                borderRadius: '5px',
              }}
            />
            <div className="button-group">
              <button className="modal-button" onClick={addCodeBlock}>
                <CodeIcon /> Add
              </button>
              <button className="modal-button cancel-button" onClick={() => setIsCodeMenuOpen(false)}>
                <CloseIcon /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      <Notification message={message} type={messageType} clearMessage={clearMessage} />
    </div>
  );
};

export default CodeBlockAdder;
