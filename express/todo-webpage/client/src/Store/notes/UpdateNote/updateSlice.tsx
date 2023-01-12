import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateThisNote = createAsyncThunk('user/updateNote', async (note: any) => {
    try {
        const { id, title, description, category, isChecked, date } = note
        console.log("Note for update", note);
        const res = await fetch(`/updatenote/${id}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                title,
                description,
                category,
                date,
                isCompleted: isChecked
            })
        });
        const data = await res.json()
        console.log("data", data);
        return data;
    } catch (err) {
        console.log(err);
    }
})
