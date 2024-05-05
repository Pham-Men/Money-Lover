import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        isOpenUpdateWallet: false,
        isOpenCreateWallet: false,
        isOpenTransferMoney: false,
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
        }
    }
});

export const {toggleUpdateWallet, toggleCreateWallet, toggleTransferMoney} = toggleSlice.actions;
export default toggleSlice.reducer;