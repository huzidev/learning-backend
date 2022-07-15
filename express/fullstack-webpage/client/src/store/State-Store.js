import { createSlice } from '@reduxjs/toolkit';

const stateStore = createSlice({
    name : 'login',
    initialState : {
        isLoggedInSeller : false,
        isLoggedInBuyer : false,
        showPasswordReg: false,
        showCPasswordReg: false,
        showPasswordLog: false,
        loginState : false,
        registerState : false,
        registerBuyer : false,
        registerSeller : false,
        hamburgerOpen : false,
    },
    reducers : {
        logInSeller(state) {
            state.isLoggedInSeller = true;
        },
        logInBuyer(state) {
            state.isLoggedInBuyer = true;
        },
        Logout(state) {
            if (state.isLoggedInSeller === true) {
                state.isLoggedInSeller = false
            }
            else if (state.isLoggedInBuyer === true) {
                state.isLoggedInBuyer = false
            }
            state.loginState = true
            state.registerState = false
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
        hamburgerState(state) {
            state.hamburgerOpen = !state.hamburgerOpen
        }
    }
})

export const stateActions = stateStore.actions;

export default stateStore;