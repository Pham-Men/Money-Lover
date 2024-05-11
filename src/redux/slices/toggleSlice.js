import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        isOpenUpdateWallet: false,
        isOpenCreateWallet: false,
        isOpenTransferMoney: false,
        isOpenDetailWallet: false,
        isOpenSpending: false,
        isOpenRevenue: false,
        isOpenShareWallet: false,
        isOpenSharedWallet: false,
    },
    reducers: {
        toggleUpdateWallet: (state) => {
            state.isOpenUpdateWallet = !state.isOpenUpdateWallet
        },
        toggleCreateWallet: (state) => {
            state.isOpenCreateWallet = !state.isOpenCreateWallet
        },
        toggleTransferMoney: (state) => {
            state.isOpenTransferMoney = !state.isOpenTransferMoney
        },
        toggleDetailWallet: (state) => {
            state.isOpenDetailWallet = !state.isOpenDetailWallet
        },
        toggleSpending: (state) => {
            state.isOpenSpending = !state.isOpenSpending
        },
        toggleRevenue: (state) => {
            state.isOpenRevenue = !state.isOpenRevenue
        },
        toggleShareWallet: (state) => {
            state.isOpenShareWallet = !state.isOpenShareWallet
        },
        toggleSharedWallet: (state) => {
            state.isOpenSharedWallet = !state.isOpenSharedWallet
        },
    }
});

export const {
    toggleUpdateWallet, 
    toggleCreateWallet, 
    toggleTransferMoney, 
    toggleDetailWallet,
    toggleSpending,
    toggleRevenue,
    toggleLoading,
    toggleSharedWallet,
    toggleShareWallet,
} = toggleSlice.actions;
export default toggleSlice.reducer;