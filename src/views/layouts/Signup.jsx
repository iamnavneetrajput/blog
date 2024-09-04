import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import OAuth from '../partials/OAuth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  const [step, setStep] = useState(1); // Step 1: Register, Step 2: Verify OTP
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const { name, email, password, otp } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (step === 1) {
      try {
        const response = await fetch('http://192.168.165.146:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        if (response.ok) {
          setStep(2);
          setMessage('OTP sent to your email');
        } else {
          setMessage(data.msg);
        }
      } catch (error) {
        console.error(error);
        setMessage('Server error');
      } finally {
        setLoading(false);
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      }
    } else {
      try {
        const response = await fetch('http://192.168.165.146:5000/api/auth/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, otp })
        });

        const data = await response.json();
        if (response.ok) {
          setMessage('Registration successful');

          // Save token to cookies
          Cookies.set('token', data.token, { expires: 30 });

          // Redirect to home page
          setTimeout(() => {
            navigate('/');
          }, 1000); // Adjust the delay if needed
        } else {
          setMessage(data.msg);
        }
      } catch (error) {
        console.error(error);
        setMessage('Server error');
      } finally {
        setLoading(false);
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      }
    }
  };

  return (
    <>
      <div className="main">
        <div className="login">
          <div className="login-tem">
            <h1>Register</h1>
            <p>Hey there! Enter your details to create your account.</p>
            <form onSubmit={onSubmit}>
              {step === 1 ? (
                <>
                  <input type="text" placeholder="Enter Your Name" name="name" value={name} onChange={onChange} required />
                  <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
                  <div className="password-field">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={onChange} 
                      required 
                    />
                    <span className='show-password' onClick={() => setShowPassword(!showPassword)}>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <input type="text" placeholder="Enter OTP" name="otp" value={otp} onChange={onChange} required />
                </>
              )}
              <button type="submit" disabled={loading}>
                {loading ? (
                  <div className="spinner"></div>
                ) : message ? (
                  message
                ) : step === 1 ? (
                  'Register'
                ) : (
                  'Verify OTP'
                )}
              </button>
              {step === 1 && (
                <>
                  <p>Or Register with</p>
                  <OAuth />
                  <button type="button"><FontAwesomeIcon icon={faFacebook} /> Facebook</button>
                </>
              )}
              <p>Already have an account? <span className='account'><Link className='account' to='/login'>Login.</Link></span></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
