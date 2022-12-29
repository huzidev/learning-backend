import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    res: null
}

export const addThisNote = createAsyncThunk('user/addNote', async (note: any) => {
    const { title, description, category, isCompleted } = note;
    console.log("user info", note);
    const res = await fetch(`/addnote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
            isCompleted
        })
    });
    const data = await res.json()
    return data;
})

const addNoteSlice = createSlice({
    name: 'addnote',
    initialState,
    reducers: {
        receiveTEst(state, action) {
            state.res = action.payload
        }
    },
})

export default addNoteSlice.reducer

export const addNoteAction = addNoteSlice.actions;