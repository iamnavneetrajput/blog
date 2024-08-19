import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful');

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
  };

  return (
    <>
      <div className="main">
        <div className="login">
          <div className="login-tem">
            <h1>Login</h1>
            <p>Welcome back! Enter your details to login to your account.</p>
            <form onSubmit={onSubmit}>
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
              {message && <div className="message">{message}</div>}
              <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Login'}
              </button>

              <p>Or Login with</p>
              <button type="button"><FontAwesomeIcon icon={faGoogle} /> Google</button>
              <button type="button"><FontAwesomeIcon icon={faFacebook} /> Facebook</button>

              <p>Don't have an account? <span className='account'><Link className='account' to='/register'>Register.</Link></span></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
