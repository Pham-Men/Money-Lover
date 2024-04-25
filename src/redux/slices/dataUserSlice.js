import { createSlice } from "@reduxjs/toolkit";

const dataUserSlice = createSlice({
    name: 'dataUser',
    initialState: [{
        name: '',
        totalMoney: '',
        currency: ''
    }],
    reducers: {
        setUserData: (state, action) => {
            state.name = action.payload.name;
            state.totalMoney = action.payload.totalMoney;
            state.currency = action.payload.currency;
        }
    }
})

export const { setUserData } = dataUserSlice.actions;
export default dataUserSlice.reducer