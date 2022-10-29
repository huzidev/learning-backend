import { createSlice } from '@reduxjs/toolkit';

const userState = createSlice({
    name: 'user',
})

export const stateActions = userState.actions;

export default userState;