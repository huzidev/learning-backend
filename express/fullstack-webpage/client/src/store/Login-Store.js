import { createSlice } from '@reduxjs/toolkit';

const logInStore = createSlice({
    name : 'login',
    initialState : {
        loginState : false,
        isLoggedIn : false,
        showPasswordReg: false,
        showCPasswordReg: false,
        showPasswordLog: false
    },
    reducers : {
        logIn(state) {
            state.isLoggedIn = true;
        },
        Logout(state) {
            state.isLoggedIn = false;
        },

        // for register page
        typePasswordReg(state) {
            state.showPasswordReg = !state.showPasswordReg;
        },
        typeCPasswordReg(state) {
            state.showCPasswordReg = !state.showCPasswordReg;
        },
        passwordConditionReg(state) {
            if (state.showPasswordReg === true) {
                state.showPasswordReg = false;
            }
            if (state.showCPasswordReg === true) {
                state.showCPasswordReg = false
            }
        },

        loginState(state) {
            state.loginState = !state.loginState; 
        },

        // for login page
        typePasswordLog(state) {
            state.showPasswordLog = !state.showPasswordLog;
        },
        passwordConditionLog(state) {
            if (state.showPasswordLog === true) {
                state.showPasswordLog = false;
            }
        },
    }
})

export const logInActions = logInStore.actions;

export default logInStore;