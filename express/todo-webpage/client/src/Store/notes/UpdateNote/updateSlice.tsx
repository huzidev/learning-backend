import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const updateThisNote = createAsyncThunk('user/notes', async (note: any) => {
    try {
        const { id, etitle, edescription, ecategory } = note
        const res = await fetch(`/updatenote/${id}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                title: etitle,
                description: edescription,
                category: ecategory,
                isCompleted: isChecked
            })
        });
    } catch (err) {
        console.log(err);
    }
})

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
})

export default noteSlice.reducer

export const noteAction = noteSlice.actions;