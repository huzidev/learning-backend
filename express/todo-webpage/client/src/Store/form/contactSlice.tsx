import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    loading: false,
    username: "",
    email: "",
    number: null,
    message: "",
    error: "",
    res: null
}

export const sendMessage = createAsyncThunk('user/messgae', async (username: string, email: string, number?: number, message: string) => {
    const res = await fetch("/contact", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username: username,
            email: email,
            number: number,
            message: message
        })
      });
      const data = await res.json();
      return data;
})

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendMessage.pending, (state) => {
            state.loading = true
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong!"
        })
    },
})

export default contactSlice.reducer

export const contactAction = contactSlice.actions;