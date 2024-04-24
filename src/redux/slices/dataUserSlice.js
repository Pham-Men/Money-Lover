import { createSlice } from "@reduxjs/toolkit";

const dataUserSlice = createSlice({
    name: 'dataUser',
    initialState: {
        email: '',
        totalMoney: '',
        currency: ''
    },
    reducers: {
        setUserData: (state, action) => {
            state.email = action.payload.email;
            state.totalMoney = action.payload.totalMoney;
            state.currency = action.payload.currency;
        }
    }
})

export const { setUserData } = dataUserSlice.actions;
export default dataUserSlice.reducer