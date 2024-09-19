import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Your root reducer

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools only in development
});

export default store;
