import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  email: "",
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        },
        signOutAuth: (state) => {
            state.email = initialState.email;
            state.uid = initialState.uid;
        },
        setUserByLocalStorage: (state, action) => {
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        },
    }
})

export const { setUserLogin, signOutAuth, setUserByLocalStorage } = authSlice.actions;
export default authSlice.reducer;