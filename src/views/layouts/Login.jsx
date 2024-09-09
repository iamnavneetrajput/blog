import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import OAuth from '../partials/OAuth'; // Ensure the path is correct

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [state, setState] = useState({
    email: '',
    password: '',
    message: '',
    loading: false,
    showPassword: false
  });

  const { email, password, message, loading, showPassword } = state;

  const onChange = e => setState(prevState => ({
    ...prevState,
    [e.target.name]: e.target.value
  }));

  const onSubmit = async e => {
    e.preventDefault();
    setState(prevState => ({ ...prevState, loading: true, message: '' }));

    try {
      const response = await fetch('http://192.168.193.146:5000/api/auth/login', { // Adjust the endpoint as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setState(prevState => ({
          ...prevState,
          message: 'Login successful'
        }));

        Cookies.set('token', data.token, { expires: 30, secure: true, sameSite: 'Strict' });

        const from = location.state?.from?.pathname || '/';
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setState(prevState => ({ ...prevState, message: data.msg }));
      }
    } catch (error) {
      console.error(error);
      setState(prevState => ({ ...prevState, message: 'Server error' }));
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
      setTimeout(() => setState(prevState => ({ ...prevState, message: '' })), 3000);
    }
  };

  return (
    <div className="main">
      <div className="login">
        <div className="login-tem">
          <h1>Login</h1>
          <p>Welcome back! Enter your details to login to your account.</p>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                required
              />
              <span className='show-password' onClick={() => setState(prevState => ({ ...prevState, showPassword: !showPassword }))}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? (
                <div className="spinner"></div>
              ) : message ? (
                message
              ) : (
                'Login'
              )}
            </button>

            <p>Or Login with</p>
            <OAuth />
            <p>Don't have an account? <span className='account'><Link className='account' to='/register'>Register.</Link></span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
