import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sidebarReducer from './slices/sidebarSlice';
import dataUserReducer from './slices/dataUserSlice';
import toggleReducer from './slices/toggleSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        dataUser: dataUserReducer,
        toggle: toggleReducer,
    },
})

export default store;