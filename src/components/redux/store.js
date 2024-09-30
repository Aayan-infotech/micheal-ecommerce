import { configureStore } from '@reduxjs/toolkit';
import addToCartReducer from '../redux/addToCart';
import cartReducer from '../redux/allAddedCartsSlice';
import loginSlice from '../redux/liginSlice';

export const store = configureStore({
  reducer: {
    addtocart: addToCartReducer,
    cart: cartReducer,
    login: loginSlice
  },
});
