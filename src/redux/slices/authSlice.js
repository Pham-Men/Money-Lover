import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: [],
    reducers: {
        setUserLogin: (state, action) => {
            state.push({'email':  action.payload.email, 'uid': action.payload.uid})
        }
    }
})

export const { setUserLogin } = authSlice.actions;
export default authSlice.reducer