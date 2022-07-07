import { createSlice } from '@reduxjs/toolkit';

const registerStore = createSlice({
    name : 'register',
    initialState : {
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
        }
    }
})

export const registerActions = registerStore.actions;

export default registerStore;