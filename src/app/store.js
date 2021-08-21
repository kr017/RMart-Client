import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import signupReducer from '../features/signup/signupSlice';
import userReducer from '../features/login/userSlice';
import productReducer from '../features/product/productSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import cartReducer from '../features/cart/cartSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signup : signupReducer,
    user : userReducer,
    product: productReducer,
    wishlist : wishlistReducer,
    cart : cartReducer
  },
});
