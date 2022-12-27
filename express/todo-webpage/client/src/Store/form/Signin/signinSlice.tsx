import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    res: null
    data: ""
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
    return data;
})

const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        receiveTEst(state, action) {
            state.res = action.payload
        }
    },
})

export default signinSlice.reducer

export const signinAction = signinSlice.actions;