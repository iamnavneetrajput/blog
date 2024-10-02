import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice'; // Import your user slice

const store = configureStore({
  reducer: {
    user: userReducer,  // Add your user reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), // Add thunk automatically
});

export default store;
