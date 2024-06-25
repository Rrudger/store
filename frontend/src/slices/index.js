import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice.js';
import userReducer from './userSlice.js';
import adminReducer from './adminSlice.js';
import cartReducer from './cartSlice.js';

export default configureStore({
  reducer: {
    adminState: adminReducer,
    cartState: cartReducer,
    mainState: mainReducer,
    userState: userReducer,
  },
});
