import { createSlice } from '@reduxjs/toolkit';

const registerStore = createSlice({
    name : 'register',
    initialState : {
        registerBuyer : false,
        registerSeller : false
    },
    reducers : {
        regBuyer(state) {
            state.registerBuyer = !state.registerBuyer;
        },
        regSeller(state) {
            state.registerSeller = !state.registerSeller;
        }
    }
})

export const registerActions = registerStore.actions;

export default registerStore;