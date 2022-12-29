// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchNotes = createAsyncThunk('user/addNote', async (path: string) => {
//     const res = await fetch(`${path}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//     const data = await res.json()
//     return data;
// })

// const addNoteSlice = createSlice({
//     name: 'addnote',
//     initialState,
//     reducers: {
//         receiveTEst(state, action) {
//             state.res = action.payload
//         }
//     },
// })

// export default addNoteSlice.reducer

// export const addNoteAction = addNoteSlice.actions;