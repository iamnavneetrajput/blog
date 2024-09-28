// redux/actions/userActions.js

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (token, user) => ({
  type: LOGIN_SUCCESS,
  payload: { token, user }
});

export const loginFail = (message) => ({
  type: LOGIN_FAIL,
  payload: message
});

export const logout = () => ({
  type: LOGOUT
});
