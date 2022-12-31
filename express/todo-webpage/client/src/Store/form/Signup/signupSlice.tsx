import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    res: null,
    resServer: null
}

export let testRes: any;

const host = "http://localhost:8000";
export const signUpUser = createAsyncThunk('user/signup', async (user: any) => {
    const { username, email, number, password, cpassword, isTheme } = user;
    const res = await fetch(`${host}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            number: parseInt(number),
            password,
            cpassword,
            isTheme
        })
    });
    testRes = res.status
    const data = await res.json();
    return data;
})

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        receiveTEst(state, action) {
            state.res = action.payload
        }
    },
})

export default signupSlice.reducer

export const signupAction = signupSlice.actions;