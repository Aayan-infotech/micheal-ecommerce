// src/components/redux/loginSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create an async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://44.196.192.232:3129/api/auth/login', formData);
      if (response.data.success) {
        // Store token and userId in sessionStorage
        const { token, data: { id } } = response.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', id);
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  }
);

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // logout: (state) => {
    //   sessionStorage.removeItem('token');
    //   sessionStorage.removeItem('userId');
    //   state.user = null;
    //   state.token = null;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.data;
        toast.success("Login Successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Login failed');
      });
  }
});

// export const { logout } = loginSlice.actions;

export default loginSlice.reducer;