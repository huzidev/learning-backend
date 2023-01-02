import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const updateThisNote = createAsyncThunk('user/updateNote', async (note: any) => {
    try {
        const { id, etitle, edescription, ecategory, eisChecked } = note
        console.log("Note for update", note);
        
        const res = await fetch(`/updatenote/${id}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                title: etitle,
                description: edescription,
                category: ecategory,
                isCompleted: eisChecked
            })
        });
        const data = await res.json()
        return data;
    } catch (err) {
        console.log(err);
    }
})