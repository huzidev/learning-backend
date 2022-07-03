import { createSlice  } from '@reduxjs/toolkit';

const logInStore = createSlice({
    name : 'login',
    initialState : {
        isLoggedIn : false,
    },
    reducers : {
        
    }
})

export const logInActions = logInStore.actions;

export default logInStore;