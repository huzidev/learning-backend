import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    username: "",
    email: "",
    number: null,
    message: "",
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
      return data;
})

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        getStateTest(state, action) {
            state.location = action.payload ;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => { // action is of type payloadAction and further it is Array of User
            state.loading = false
            state.noteData = action.payload
            state.error = ''
        })
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false
            state.noteData = []
            state.error = action.error.message || "Something went wrong!"
        })
    },
})

export default contactSlice.reducer

export const contactAction = contactSlice.actions;