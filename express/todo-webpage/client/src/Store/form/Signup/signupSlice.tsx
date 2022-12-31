import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let dataToken: string | null;

export const signUpUser = createAsyncThunk('user/signup', async (user: any) => {
    const { email, password } = user;
    const res = await fetch(`${host}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            number: parseInt(number),
            password,
            cpassword,
            isTheme
        })
    });
})