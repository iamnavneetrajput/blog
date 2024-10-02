import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.msg);
      }
      // Set token in cookies
      Cookies.set('token', data.token, { expires: 30, secure: true, sameSite: 'Strict' });
      return data;
    } catch (error) {
      return rejectWithValue('Server error');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        // Handle specific error messages
        if (data.msg === 'User already exists') {
          return rejectWithValue('EMAIL_ALREADY_IN_USE');
        }
        return rejectWithValue('Failed to send OTP. Please try again.');
      }
      return data; // Proceed to OTP verification
    } catch (error) {
      return rejectWithValue('Server error');
    }
  }
);


export const verifyOtp = createAsyncThunk(
  'user/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) {
        // Handle specific error messages
        if (data.message === 'Invalid OTP') {
          return rejectWithValue('INVALID_OTP');
        }
        return rejectWithValue('Failed to verify OTP. Please try again.');
      }
      // Save token after verification
      Cookies.set('token', data.token, { expires: 30 });
      return data;
    } catch (error) {
      return rejectWithValue('Server error');
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  // Clear cookies and logout
  Cookies.remove('token');
  return null;
});
