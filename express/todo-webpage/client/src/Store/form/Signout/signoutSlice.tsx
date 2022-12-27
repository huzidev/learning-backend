import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signoutUser = createAsyncThunk('user/signout', async () => {
    try {
        const res = await fetch('/signout', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
})
