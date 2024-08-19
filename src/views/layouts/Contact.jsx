import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Select Reason',
    other: '',
    message: '',
  });

  // Event handler for reason selection
  const handleReasonChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      reason: value,
    }));

    // Show/hide "other" reason input based on the selected reason
    if (value === 'other') {
      document.getElementById('otherReason').style.display = 'block';
    } else {
      document.getElementById('otherReason').style.display = 'none';
    }
  };

  // Event handler for input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='main'>
      <form className="my-form" />
      <div className="form-container">
        <h3>Contact Us</h3>
        <p>Hi! there enter your details to contact us </p>
        <input type="text" name='name' placeholder='Enter Your Name' />
        <input type="email" name="email" placeholder='Enter Your Email' />
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleReasonChange}
          required
        >
          <option value="reason">Select Reason</option>
          <option value="course">Course Problem</option>
          <option value="website">Website Problem</option>
          <option value="account">Account Problem</option>
          <option value="other">Other</option>
        </select>

        <div id="otherReason" style={{ display: formData.reason === 'other' ? 'block' : 'none' }}>
          <input
            type="text"
            id="other"
            name="other"
            placeholder='Specifi Reason'
            value={formData.other}
            onChange={handleInputChange}
          />
        </div>

        <textarea
          id="message"
          name="message"
          rows="4"
          placeholder='Enter Your Message'
          value={formData.message}
          onChange={handleInputChange}
          required
        ></textarea>

        <button id='contact-btn' type='contact' name='contact'>Contact Us</button>
      </div>
    </div>
  );
};

export default MyForm;
