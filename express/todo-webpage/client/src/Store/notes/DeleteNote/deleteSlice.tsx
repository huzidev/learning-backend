import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteThisNote = createAsyncThunk('user/noteDelete', async (id: number) => {
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