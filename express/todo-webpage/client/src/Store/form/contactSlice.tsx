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

export const sendMessage = createAsyncThunk('user/messgae', async () => {
    const res = await fetch("/contact", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username: initialState.username,
            email: initialState.email,
            number: parseInt(initialState.number),
            message: initialState.message
        })
      });
      const data = await res.json();
      initialState.res = res.status;
      return data;
})

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        getStateTest(state, action) {
            const allData = action.payload
            state.username = allData.username;
            state.email = allData.email;
            state.number = allData.number;
            state.message = allData.message;
        }
    },
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