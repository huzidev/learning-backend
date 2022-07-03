import { createSlice  } from '@reduxjs/toolkit';

const logInStore = createSlice({
    name : 'login',
    initialState : {
        isLoggedIn : false,
    },
    reducers : {
        logIn(state) {
            state.isLoggedIn = true;
        },
        Logout(state) {
            state.isLoggedIn = false;
        }
    }
})

export const logInActions = logInStore.actions;

export default logInStore;