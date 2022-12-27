import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    res: null
}

export const addThisNote = createAsyncThunk('user/addNote', async (user: any) => {
    const { username, email, number, message } = user;
    console.log("user info", user);
    const res = await fetch("/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            number: parseInt(number),
            message
        })
    });
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
})

export default contactSlice.reducer

export const contactAction = contactSlice.actions;