import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase'; // Ensure the path is correct
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const OAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      console.log('User Info:', user);

      // Save user token to cookies
      Cookies.set('token', user.accessToken, { expires: 30 });

      // Redirect to the original page or home
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.error('Error during sign-in:', error.message);
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
    }
  }, [error]);

  return (
    <div>
      <button 
        type="button" 
        onClick={handleSignIn} 
        disabled={loading}
        className="oauth-button"
      >
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <FontAwesomeIcon icon={faGoogle} /> Google
            {error && <span className="error-message">{error}</span>}
          </>
        )}
      </button>
    </div>
  );
}

export default OAuth;
