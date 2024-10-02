import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, verifyOtp, logoutUser } from '../actions/userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    resetMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.message = 'Login successful';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === 'Invalid credentials') {
          state.error = 'Invalid email or password';
        } else {
          state.error = 'Server error, please try again later';
        }
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'OTP sent to your email';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === 'EMAIL_ALREADY_IN_USE') {
          state.error = 'Email is already in use.';
        } else {
          state.error = 'Failed to send OTP. Please try again.';
        }
      });

    // OTP Verification
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.message = 'Registration successful';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === 'INVALID_OTP') {
          state.error = 'Invalid or expired OTP. Please try again.';
        } else {
          state.error = 'Failed to verify OTP. Please try again.';
        }
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.message = 'Logout successful';
      });
  },
});

export const { resetMessages } = userSlice.actions;
export default userSlice.reducer;
