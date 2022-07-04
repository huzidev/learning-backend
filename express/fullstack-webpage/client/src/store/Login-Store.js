import { createSlice  } from '@reduxjs/toolkit';

const logInStore = createSlice({
    name : 'login',
    initialState : {
        isLoggedIn : false,
        showPassword: false
    },
    reducers : {
        logIn(state) {
            state.isLoggedIn = true;
        },
        Logout(state) {
            state.isLoggedIn = false;
        },
        showPass(state) {
            state.showPassword = true;
        },
        hidePass(state) {
            state.showPassword = false;
        }
    }
})

export const logInActions = logInStore.actions;

export default logInStore;