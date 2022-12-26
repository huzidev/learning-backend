import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    loading: false,
    error: "",
    res: null
}

// username: string, email: string, number ?: number, message: string
export const sendThisMessage = createAsyncThunk('user/messgae', async (user: any) => {
    const { username, email, number, message } = user;
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
      const data = await res.json();
      return data
      initialState.res = res.status
      return initialState.res
})

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendThisMessage.pending, (state) => {
            state.loading = true
        })
        builder.addCase(sendThisMessage.fulfilled, (state, action) => {
            state.loading = false
            state.res = action.payload
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