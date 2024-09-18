// src/redux/reducers/userReducer.js
import { SET_USER, SET_MESSAGE } from '../actions/userActions';

const initialState = {
  user: null,
  message: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default userReducer;
