import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataWallets: ''
}
const walletsSlice = createSlice({
    name: 'wallets',
    initialState,
    reducers: {
        setWalletsToRedux: (state, action) => {
            state.dataWallets = action.payload
        },
    }
})

export const { setWalletsToRedux } = walletsSlice.actions;
export default walletsSlice.reducer;