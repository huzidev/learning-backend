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
            state.registerState = !state.registerState;
            state.loginState = false
        },
        loginState(state) {
            state.loginState = !state.loginState; 
            state.registerState = false
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