import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        signinStart: (state) => {
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const { signinStart, signinSuccess, signinFailure, signout, updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;

export default userSlice.reducer;