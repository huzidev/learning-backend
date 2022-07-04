import { createSlice  } from '@reduxjs/toolkit';

const logInStore = createSlice({
    name : 'login',
    initialState : {
        isLoggedIn : false,
        showPassword: false,
        showCPassword: false
    },
    reducers : {
        logIn(state) {
            state.isLoggedIn = true;
        },
        Logout(state) {
            state.isLoggedIn = false;
        },
        typePassword(state) {
            state.showPassword = !state.showPassword;
        },
        typeCPassword(state) {
            state.showCPassword = !state.showCPassword;
        },
        // hidePass(state) {
        //     state.showPassword = false;
        // }
    }
})

export const logInActions = logInStore.actions;

export default logInStore;