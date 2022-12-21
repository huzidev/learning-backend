import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Types, User } from "./Types";

const initialState: Types = {
    loading: false,
    users: [],
    error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    // return axios
    //     .get("https://jsonplaceholder.typicode.com/users")
    //     .then(res => res.data)
    try {
        const res = await fetch("/about", {
            method : 'GET',
                headers: new Headers({
                    "Content-Type" : "application/json",
                    "Accept" : "application/json",
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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state: any, action: PayloadAction<User[]>) => { // action is of type payloadAction and further it is Array of User
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state: any, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || "Something went wrong!"
        })
    },
})

export default userSlice.reducer