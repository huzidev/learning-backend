import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    res: null,
    data: null
}

console.log("what is Data Token from initial State", initialState.data);
let dataToken: string | null;

export const signInUser = createAsyncThunk('user/singin', async (user: any) => {
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

const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        receiveTEst(state, action) {
            state.res = action.payload
            state.data = dataToken
        }
    },
})

export default signinSlice.reducer

export const signinAction = signinSlice.actions;