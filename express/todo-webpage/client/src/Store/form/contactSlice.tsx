import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    username: "",
    email: "",
    number: null,
    message: "",
}

export const sendMessage = createAsyncThunk('user/messgae', async () => {
    try {
        const res = await fetch(`/allnotes`, {
            method : 'GET',
                headers: new Headers({
                    "Content-Type" : "application/json",
                }),
            credentials : "include"
        })
        const data = await res.json();
        if (res.status !== 200) {
            const error = new Error()
            throw error;
        }
        return data
    } catch (err) {
        console.log(err);
    }
})