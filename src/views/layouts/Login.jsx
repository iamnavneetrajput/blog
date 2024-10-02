import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import OAuth from '../partials/OAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('Login'); // State for button text

  // Access the Redux state for login
  const { loading, message, error } = useSelector((state) => state.user);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })); // Dispatch the Redux login action
  };

  // Handle the successful login redirect and manage button message
  useEffect(() => {
    if (message === 'Login successful') {
      setButtonMessage(message); // Show success message on button
      const from = location.state?.from?.pathname || '/';
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } else if (error) {
      setButtonMessage(error); // Show error message on button
    }

    if (message || error) {
      // Reset the button message back to "Login" after 3 seconds
      const timer = setTimeout(() => {
        setButtonMessage('Login');
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [message, error, navigate, location.state]);

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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className='show-password' onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            {/* Button that shows message and resets after 3 seconds */}
            <button type="submit" disabled={loading}>
              {loading ? <div className="spinner"></div> : buttonMessage}
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
