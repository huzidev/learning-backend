import { createSlice } from '@reduxjs/toolkit';

const registerStore = createSlice({
    name : 'register',
    initialState : {
        loginState : false,
        registerState : false,
        registerBuyer : false,
        registerSeller : false
    },
    reducers : {
        regBuyer(state) {
            state.registerBuyer = !state.registerBuyer;
        },
        regSeller(state) {
            state.registerSeller = !state.registerSeller;
        },
        registerState(state) {
            state.registerState = true
            if (state.loginState === true) {
                state.loginState = !state.loginState
            }
        },
        loginState(state) {
            state.loginState = true
            if (state.registerState === true) {
                state.registerState = !state.registerState
            }
        },
        // overAllState(state) {
        //     if (state.loginState === true || state.registerState === true) {
        //         state.loginState = false
        //         state.registerState = false
        //     }
        // }
        
    }
})

export const registerActions = registerStore.actions;

export default registerStore;