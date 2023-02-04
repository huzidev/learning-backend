import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialType, Note } from "./Types";

const initialState: InitialType = {
    noteData: [],
    res: null,
    totalNotes: null
}

let totalNotesTest: any;
let fetchNots: any;

export const fetchNotes = createAsyncThunk('user/notes', async (location: string) => {
    try {
        console.log('fetchNotes = createAsyncThunk');
        
        const res = await fetch(location, {
            method : 'GET',
                headers: new Headers({
                    "Content-Type" : "application/json",
                }),
            credentials : "include"
        })
        console.log("res status", res.status);
        const data = await res.json();
        if (res.status === 200) {
            totalNotesTest = data.length;
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
        testState(state) {
            state.totalNotes = totalNotesTest;
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