import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const deleteNote = createAsyncThunk('user/noteDelete', async () => {
    try {
        const res = await fetch(`/deletenote/${note._id}`, {
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
        builder.addCase(deleteNote.fulfilled, (state) => {
            state.noteData = action.payload
        })
    },
})

export default deleteSlice.reducer

export const noteAction = deleteSlice.actions;