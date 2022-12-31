import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    res: 421,
}

let testRes: any;

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
    console.log("RES REDUX", res.status);
    testRes = res.status
    const data = await res.json();
    return data;
})

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        testState(state) {
            state.res = testRes;
        }
    }
})

export default signupSlice.reducer

export const signupAction = signupSlice.actions;