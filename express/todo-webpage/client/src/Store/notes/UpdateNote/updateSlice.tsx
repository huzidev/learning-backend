import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk('user/notes', async (location: string) => {
    try {
        const res = await fetch(`/updatenote/${id}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                title: etitle,
                description: edescription,
                category: ecategory,
                isCompleted: isChecked
            })
        });
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