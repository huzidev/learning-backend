import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    loading: false,
    error: "",
    res: null
}

console.log("WHAT IS RES FROM REDUX", initialState.res);
// let testType: any = null;
let testType: any = initialState.res;

export const sendThisMessage = createAsyncThunk('user/messgae', async (user: any) => {
    const { username, email, number, message } = user;
    console.log("user info", user);
    
    const res = await fetch("/contact", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username,
            email,
            number: parseInt(number),
            message
        })
    });
    // if (username === "") {
    //     testType = 422
    // } else if (email === "") {
    //     testType = 423
    // } else if (message === "") {
    //     testType = 424
    // } else if (username && email && message !== "") {
    //     testType = 200
    // }
    // console.log("Before Status is", testType);
    // testType = res.status
    // console.log("After Status is", testType);
    const data = await res.json();
    return data
})

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        receiveTEst(state, action) {
            state.res = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendThisMessage.pending, (state) => {
            state.loading = true
        })
        builder.addCase(sendThisMessage.fulfilled, (state, action) => {
            state.loading = false
            state.res = testType
            state.error = ''
        })
        builder.addCase(sendThisMessage.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong!"
        })
    },
})

export default contactSlice.reducer

export const contactAction = contactSlice.actions;