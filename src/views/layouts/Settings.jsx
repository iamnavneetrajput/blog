import React, { useState } from 'react';
import Notification from '../../blogger/components/Notification'; // Adjust the path if necessary

const Settings = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [ispushNotification, setIspushNotification] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [language, setLanguage] = useState('en');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState(''); // State for notification message
    const [messageType, setMessageType] = useState('success'); // State for message type

    const handleNewsletterToggle = () => setIsSubscribed(!isSubscribed);
    const handlepushNotificationToggle = () => setIspushNotification(!ispushNotification);
    const handleEmailToggle = () => setEmailNotifications(!emailNotifications);
    const handleChangePassword = () => alert('Change Password feature coming soon!');
    const handleLanguageChange = (e) => setLanguage(e.target.value);

    const handleDeleteAccount = () => {
        setShowOtpInput(true);
    };

    const handleOtpSubmit = () => {
        if (otp === "123456") { // Dummy OTP check
            console.log("Account Deleted");
            showMessage("Your account has been deleted.", 'success'); // Success message
            setShowOtpInput(false); // Hide OTP input after successful deletion
        } else {
            showMessage("Invalid OTP. Please try again.", 'error'); // Error message
            // Do not hide OTP input, allowing user to retry
        }
        setOtp(''); // Clear OTP input regardless of the result
    };

    // Show a message and auto-hide after 3 seconds
    const showMessage = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000); // Auto-hide after 3 seconds
    };

    return (
        <div className="settings-page">
            <h2>Account Settings</h2>

            <div className="setting-item">
                <label>Receive Newsletter</label>
                <div className="toggle-switch">
                    <input
                        className="toggle-input"
                        id="newsletter-toggle"
                        type="checkbox"
                        checked={isSubscribed}
                        onChange={handleNewsletterToggle}
                    />
                    <label className="toggle-label" htmlFor="newsletter-toggle"></label>
                </div>
            </div>

            <div className="setting-item">
                <label>Push Notification</label>
                <div className="toggle-switch">
                    <input
                        className="toggle-input"
                        id="pushNotification-toggle"
                        type="checkbox"
                        checked={ispushNotification}
                        onChange={handlepushNotificationToggle}
                    />
                    <label className="toggle-label" htmlFor="pushNotification-toggle"></label>
                </div>
            </div>

            <div className="setting-item">
                <label>Receive Email Notifications</label>
                <div className="toggle-switch">
                    <input
                        className="toggle-input"
                        id="email-toggle"
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={handleEmailToggle}
                    />
                    <label className="toggle-label" htmlFor="email-toggle"></label>
                </div>
            </div>

            <div className="setting-item">
                <button className="btn-primary" onClick={handleChangePassword}>
                    Change Password
                </button>
            </div>

            <div className="setting-item">
                <button 
                    className='delete-account' 
                    onClick={handleDeleteAccount} 
                    style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer', padding: '10px 20px' }}
                >
                    Delete Account
                </button>
            </div>

            {showOtpInput && (
                <div className="otp-input-container">
                    <h3>Enter OTP to Delete Account</h3>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                    />
                    <button className='otp-delete-btn' onClick={handleOtpSubmit}>Verify</button>
                    <button className='otp-delete-btn' onClick={() => setShowOtpInput(false)}>Cancel</button>
                </div>
            )}

            <div className="setting-item">
                <label>Language</label>
                <select value={language} onChange={handleLanguageChange} className="language-select">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
            </div>

            <Notification message={message} type={messageType} clearMessage={() => setMessage('')} />
        </div>
    );
};

export default Settings;
