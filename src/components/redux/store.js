import { configureStore } from '@reduxjs/toolkit';
import addToCartReducer from '../redux/addToCart';
import cartReducer from '../redux/allAddedCartsSlice';

export const store = configureStore({
  reducer: {
    addtocart: addToCartReducer,
    cart: cartReducer
  },
});
