import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    res: null
}

export const signInUser = createAsyncThunk('user/singin', async (user: any) => {
    const { email, password } = user;
    const res = await fetch(`/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
})

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        receiveTEst(state, action) {
            state.res = action.payload
        }
    },
})

export default contactSlice.reducer

export const contactAction = contactSlice.actions;