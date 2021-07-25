import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import signupReducer from '../features/signup/signupSlice';
import userReducer from '../features/login/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signup : signupReducer,
    user : userReducer
  },
});
