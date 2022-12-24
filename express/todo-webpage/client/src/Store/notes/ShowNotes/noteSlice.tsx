import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType, Note } from "./Types";

const initialState: InitialType = {
    loading: false,
    noteData: [],
    error: "",
    locationPath: "",
    pathHolder: ""
}

export const fetchNotes = createAsyncThunk('user/notes', async () => {
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

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        getStateTest(state, action) {
            let pathNane = action.payload;
            state.locationPath = pathNane;
            state.pathHolder = state.locationPath;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => { // action is of type payloadAction and further it is Array of Note
            state.loading = false
            state.noteData = action.payload
            state.error = ''
        })
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false
            state.noteData = []
            state.error = action.error.message || "Something went wrong!"
        })
    },
})

export default noteSlice.reducer

export const noteAction = noteSlice.actions;