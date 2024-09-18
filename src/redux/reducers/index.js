import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Adjust path to authReducer

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
