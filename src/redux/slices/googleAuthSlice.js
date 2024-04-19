import { createSlice } from "@reduxjs/toolkit";

const googleAuthSlice = createSlice({
    name: 'gooleAuth',
    initialState: [],
    reducers: {
        setUserLoginByGoogle: (state, action) => {
            state.push({'email':  action.payload.email, 'uid': action.payload.uid})
        }
    }
})

export const { setUserLoginByGoogle } = googleAuthSlice.actions;
export default googleAuthSlice.reducer