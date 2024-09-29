import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to handle async API call for fetching added carts
export const getAddedCarts = createAsyncThunk(
  'cart/getAddedCarts',
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem('token'); 
    try {
      const response = await axios.get('http://44.196.192.232:3129/api/cart/get', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.data.products; 
    } catch (err) {
      return rejectWithValue('Failed to fetch cart data');
    }
  }
);

// Create a slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddedCarts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAddedCarts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      .addCase(getAddedCarts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export default cartSlice.reducer;
