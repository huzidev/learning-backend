import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const signoutUser = createAsyncThunk('user/signout', async (user: any) => {
    const { email, password } = user;
    const res = await fetch(`/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    return data;
})

const signoutSlice = createSlice({
    name: 'signout',
    initialState,
    reducers: {
        receiveTEst(state, action) {
            state.res = action.payload
            state.data = dataToken
        }
    },
})

export default signoutSlice.reducer

export const signoutAction = signoutSlice.actions;