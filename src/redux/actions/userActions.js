//actions/userActions.js
export const SET_USER = 'SET_USER';
export const SET_MESSAGE = 'SET_MESSAGE';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message
});
