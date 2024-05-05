import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sidebarReducer from './slices/sidebarSlice';
import toggleReducer from './slices/toggleSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        toggle: toggleReducer,
    },
})

export default store;