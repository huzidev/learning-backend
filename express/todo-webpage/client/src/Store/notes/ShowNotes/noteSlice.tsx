// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { InitialType, Note } from "./Types";

// const initialState: InitialType = {
//     noteData: [],
//     res: null,
//     totalNotes: null
// }

// let totalNotesTest: any;
// let fetchNotesRes: any;

// export const fetchNotes = createAsyncThunk('user/notes', async (location: string) => {
//     try {
//         const res = await fetch(location, {
//             method : 'GET',
//                 headers: new Headers({
//                     "Content-Type" : "application/json",
//                 }),
//             credentials : "include"
//         })
//         console.log("res status", res.status);
//         fetchNotesRes = res.status;
//         const data = await res.json();
//         totalNotesTest = data.length;
//         console.log("notes Length Redux", data.length);
//         return data
//     } catch (err) {
//         console.log(err);
//     }
// })

// const noteSlice = createSlice({
//     name: 'note',
//     initialState,
//     reducers: {
//         testState(state) {
//             state.res = fetchNotesRes;
//             state.totalNotes = totalNotesTest;
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => { // action is of type payloadAction and further it is Array of Note
//             state.noteData = action.payload
//         })
//     },
// })


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const updateCounter = createAsyncThunk(
    'counter/update',
    async (value, thunkAPI) => {
        // Perform some async action, such as making a network request, to retrieve the new value for the counter
        const newValue = await someAsyncAction(value);

        // Dispatch an action to update the value of the counter slice of state
        return thunkAPI.dispatch(updateCounterSuccess(newValue));
    }
);

function updateCounterSuccess(value) {
    return {
        type: 'counter/updateSuccess',
        payload: value
    };
}

const noteSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        updateCounterSuccess: (state, action) => {
            state.value = action.payload;
        }
    },
    extraReducers: {
        [updateCounter.fulfilled]: (state, action) => {
            // The async action has succeeded, so update the value of the counter slice of state
            state.value = action.payload;
        }
    }
});


export default noteSlice.reducer

export const noteAction = noteSlice.actions;

