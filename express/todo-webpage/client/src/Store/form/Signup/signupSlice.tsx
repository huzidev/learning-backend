import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let dataToken: string | null;

export const signInUser = createAsyncThunk('user/signup', async (user: any) => {
    const { email, password } = user;
    const res = await fetch(`/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log("what is data", data);
    return data;
})