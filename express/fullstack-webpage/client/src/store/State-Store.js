import { createSlice } from '@reduxjs/toolkit';

const stateStore = createSlice({
    name : 'login',
    initialState : {
        isLoggedIn : false,
        showPasswordReg: false,
        showCPasswordReg: false,
        showPasswordLog: false,
        loginState : false,
        registerState : false,
        registerBuyer : false,
        registerSeller : false
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
            state.loginState = true
            if (state.registerState === true) {
                state.registerState = false
            }
        },
        // for login page
        typePasswordLog(state) {
            state.showPasswordLog = !state.showPasswordLog;
        },
        passwordConditionLog(state) {
            if (state.showPasswordLog === true) {
                state.showPasswordLog = false;
            }
            state.registerState = true
            if (state.loginState === true) {
                state.loginState = false
            }
        },
        registerState(state) {
            state.registerState = true
            if (state.loginState === true) {
                state.loginState = false
            }
        },
        loginState(state) {
            state.loginState = true
            if (state.registerState === true) {
                state.registerState = false
            }
        },
    }
})

export const stateActions = stateStore.actions;

export default stateStore;