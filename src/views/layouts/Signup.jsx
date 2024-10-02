import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import OAuth from '../partials/OAuth';
import { registerUser, verifyOtp } from '../../redux/actions/userActions'; // Adjust paths accordingly
import { resetMessages } from '../../redux/reducers/userSlice'; // Adjust paths accordingly

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  const [step, setStep] = useState(1); // Step 1: Register, Step 2: Verify OTP
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [buttonMessage, setButtonMessage] = useState('Register'); // State for button text

  const { name, email, password, otp } = formData;

  // Access the Redux state for registration
  const { loading, message, error, token } = useSelector((state) => state.user);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      dispatch(registerUser({ name, email, password }));
    } else {
      dispatch(verifyOtp({ email, otp }));
    }
  };

  // Handle the successful registration and OTP verification
  useEffect(() => {
    if (message === 'OTP sent to your email') {
      setStep(2); // Move to OTP verification step
      setButtonMessage(message); // Show success message on button
    } else if (message === 'Registration successful') {
      Cookies.set('token', token, { expires: 30 });
      setButtonMessage(message); // Show registration success on button

      const from = location.state?.from?.pathname || '/'; // Redirect to the previous page or home
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } else if (error) {
      setButtonMessage(error); // Show error message on button
    }

    // Reset the button message after 3 seconds
    if (message || error) {
      const timer = setTimeout(() => {
        setButtonMessage(step === 1 ? 'Register' : 'Verify OTP');
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [message, error, token, navigate, location.state, step]);

  return (
    <div className="main">
      <div className="login">
        <div className="login-tem">
          <h1>Register</h1>
          <p>Hey there! Enter your details to create your account.</p>
          <form onSubmit={onSubmit}>
            {step === 1 ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
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
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                  <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  value={otp}
                  onChange={onChange}
                  required
                />
              </>
            )}
            <button type="submit" disabled={loading}>
              {loading ? <div className="spinner"></div> : buttonMessage}
            </button>

            {step === 1 && (
              <>
                <p>Or Register with</p>
                <OAuth />
                {/* <button type="button">
                  <FontAwesomeIcon icon={faFacebook} /> Facebook
                </button> */}
              </>
            )}
            <p>
              Already have an account? <span className="account"><Link className="account" to="/login">Login.</Link></span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
