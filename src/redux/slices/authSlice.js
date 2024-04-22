import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        uid: "",
        email: ""
    },
    reducers: {
        setUserLogin: (state, action) => {
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        }
    }
})

export const { setUserLogin } = authSlice.actions;
export default authSlice.reducer