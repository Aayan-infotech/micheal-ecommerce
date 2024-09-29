import { configureStore } from '@reduxjs/toolkit';
import addToCartReducer from '../redux/addToCart';

export const store = configureStore({
  reducer: {
    addtocart: addToCartReducer,
  },
});
