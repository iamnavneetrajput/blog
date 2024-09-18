import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';
import Cookies from 'js-cookie';

// Login action
export const login = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.user, token: data.token }
      });

      // Save user info and token
      Cookies.set('token', data.token, { expires: 30, secure: true, sameSite: 'Strict' });
      localStorage.setItem('user', JSON.stringify(data.user));

    } else {
      dispatch({ type: LOGIN_FAILURE, payload: { message: data.msg } });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: { message: 'Server error' } });
  }
};

// Logout action
export const logout = () => dispatch => {
  Cookies.remove('token');
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
};
