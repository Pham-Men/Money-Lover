import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import googleAuthReducer from './slices/googleAuthSlice';
import sidebarReducer from './slices/sidebarSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        gooleAuth: googleAuthReducer,
        sidebar: sidebarReducer,
    },
})

export default store;