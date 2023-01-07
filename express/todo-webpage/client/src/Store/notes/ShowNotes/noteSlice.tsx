import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType, Note } from "./Types";

const initialState: InitialType = {
    noteData: [],
    res: null,
    totalNotes: null
}

export const fetchNotes = createAsyncThunk('user/notes', async (location: string) => {
    try {
        const res = await fetch(location, {
            method : 'GET',
                headers: new Headers({
                    "Content-Type" : "application/json",
                }),
            credentials : "include"
        })
        console.log("res status", res.status);
        if (res.status === 200) {
            
        }
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err);
    }
})

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        testState(state, action) {
            state.res = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => { // action is of type payloadAction and further it is Array of Note
            state.noteData = action.payload
        })
    },
})

export default noteSlice.reducer

export const noteAction = noteSlice.actions;