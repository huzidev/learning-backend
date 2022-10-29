import { createSlice } from '@reduxjs/toolkit';

let bearer: any = localStorage.getItem('jwtoken');

const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        async getNotes() {
            const res = await fetch('/allnotes', {
                method : 'GET',
                headers: new Headers({
                    "Content-Type" : "application/json",
                    "auth-token": bearer
                })
            })
            const data = await res.json();
        }
    }
})

export const stateActions = userState.actions;

export default userState;