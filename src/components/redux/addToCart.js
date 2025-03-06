import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to handle async add to cart API call
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://ecom.atulrajput.tech/api/cart/add', {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to add to cart');
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
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); 
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
