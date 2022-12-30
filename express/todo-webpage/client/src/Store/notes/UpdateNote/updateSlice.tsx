import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const updateThisNote = createAsyncThunk('user/updateNote', async (note: any) => {
    try {
        const { hid, htitle, hdescription, hcategory, hIsCompleted } = note
        const res = await fetch(`/updatenote/${hid}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                title: htitle,
                description: hdescription,
                category: hcategory,
                isCompleted: hIsCompleted
            })
        });
    } catch (err) {
        console.log(err);
    }
})
