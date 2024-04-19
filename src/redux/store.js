import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import googleAuthReducer from './slices/googleAuthSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        gooleAuth: googleAuthReducer,
    },
})

export default store;