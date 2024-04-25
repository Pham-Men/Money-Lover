import { createSlice } from "@reduxjs/toolkit";

const dataUserSlice = createSlice({
    name: 'dataUser',
    initialState: {
        data: []
    },
    reducers: {
        setUserData: (state, action) => {
            console.log(action)
            state.data = action.payload;
        }
    }
})

export const { setUserData } = dataUserSlice.actions;
export default dataUserSlice.reducer