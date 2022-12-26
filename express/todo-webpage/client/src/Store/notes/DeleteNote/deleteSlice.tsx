import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    status: null
}

export const deleteNote = createAsyncThunk('user/noteDelete', async (id: number) => {
    try {
        const res = await fetch(`/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type" : "application/json",
            }
        })
        const data = res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
})

const deleteSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteNote.fulfilled, (state, action) => {
            state.noteData = action.payload
        })
    },
})

export default deleteSlice.reducer

// export const noteAction = deleteSlice.actions;