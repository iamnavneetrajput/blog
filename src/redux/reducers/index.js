// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import your other reducers as needed

const rootReducer = combineReducers({
  user: userReducer,
  // other reducers
});

export default rootReducer;
