import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    type: "",
    error: "",
    res: null,
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
            number,
            password,
            cpassword,
            isTheme
        })
    });
    // testRes = res.status;
    // console.log("RES REDUX", testRes);
    const data = await res.json();
    if (res.status === 421) {
        dispatch({
            type: 'SIGNUP_ERROR',
            error: data.error
        });
    } else if (res.status === 422) {
        dispatch({
            type: 'SIGNUP_USERNAME_ERROR',
            error: data.error
        });
    } else if (res.status === 423) {
        dispatch({
            type: 'SIGNUP_EMAIL_ERROR',
            error: data.error
        });
    } else if (res.status === 424) {
        dispatch({
            type: 'SIGNUP_NUMBER_ERROR',
            error: data.error
        });
    } 
    // else {
    //     dispatch({
    //         type: 'SIGNUP_SUCCESS',
    //         data
    //     });
    // }
    // return data;
})

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        testState(state) {
            state.res = testRes;
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(signUpUser.fulfilled, (state) => { // action is of type payloadAction and further it is Array of User
            state.res = testRes
        })
    }
})

export default signupSlice.reducer

export const signupAction = signupSlice.actions;

function dispatch(arg0: { type: string; error: any; }) {
    throw new Error("Function not implemented.");
}
