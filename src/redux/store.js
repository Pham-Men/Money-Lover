import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sidebarReducer from './slices/sidebarSlice';
import walletsReducer from './slices/walletsSlice';
import toggleReducer from './slices/toggleSlice';
import transactionsReducer from './slices/transactionsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        toggle: toggleReducer,
        wallets: walletsReducer,
        transactions: transactionsReducer,
    },
})

export default store;