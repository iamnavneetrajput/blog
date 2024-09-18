// src/redux/actions/authActions.js
import { SET_USER, SET_MESSAGE } from './userActions';
import Cookies from 'js-cookie';

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: SET_MESSAGE, payload: 'Logging in...' });

  try {
    const response = await fetch('http://192.168.193.146:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      Cookies.set('token', data.token, { expires: 30, secure: true, sameSite: 'Strict' });
      dispatch({ type: SET_USER, payload: data.user });
      dispatch({ type: SET_MESSAGE, payload: 'Login successful' });
    } else {
      dispatch({ type: SET_MESSAGE, payload: data.msg || 'Login failed' });
    }
  } catch (error) {
    dispatch({ type: SET_MESSAGE, payload: 'Server error' });
  }
};
