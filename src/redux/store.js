// src/store.js
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './userReducer'; // Import the user reducer

const rootReducer = combineReducers({
  user: userReducer
});

const store = createStore(rootReducer);

export default store;
