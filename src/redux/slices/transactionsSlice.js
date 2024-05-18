import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice ({
    name: 'transacstions',
    initialState: {
        listSpending: [],
        listRevenue: []
    },
    reducers: {
        setSpendings: (state, action) => {
            state.listSpending = action.payload
        },
        setRevenues: (state, action) => {
            state.listRevenue = action.payload
        }
    }
})

export const { setSpendings, setRevenues } = transactionsSlice.actions;
export default transactionsSlice.reducer;