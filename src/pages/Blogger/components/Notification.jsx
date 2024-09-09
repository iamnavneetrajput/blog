import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'; // Import the icons for success and error

const Notification = ({ message, type, clearMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage(); // Clear the message after 3 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [message, clearMessage]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <div className="notification-icon">
        {type === 'success' ? <FiCheckCircle /> : <FiXCircle />}
      </div>
      <div className="notification-message">{message}</div>
    </div>
  );
};

export default Notification;
