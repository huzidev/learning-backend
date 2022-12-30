import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const updateThisNote = createAsyncThunk('user/notes', async (data: any) => {
    try {
        const { htitle, hdescription, hcategory, hIsCompleted } = data
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