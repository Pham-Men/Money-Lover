import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sidebarReducer from './slices/sidebarSlice';
import dataUserReducer from './slices/dataUserSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        dataUser: dataUserReducer,
    },
})

export default store;