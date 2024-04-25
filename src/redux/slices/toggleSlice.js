import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        isOpenUpdateWallet: false,
        isOpenCreateWallet: false,
    },
    reducers: {
        toggleUpdateWallet: (state) => {
            state.isOpenUpdateWallet = !state.isOpenUpdateWallet
        },
        toggleCreateWallet: (state) => {
            state.isOpenCreateWallet = !state.isOpenCreateWallet
        }
    }
});

export const {toggleUpdateWallet, toggleCreateWallet} = toggleSlice.actions;
export default toggleSlice.reducer;