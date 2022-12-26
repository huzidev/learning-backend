import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialType } from "./Types";

const initialState: InitialType = {
    setIsModalOpen: false
}

export const deleteThisNote = createAsyncThunk('user/noteDelete', async (id: number) => {
    try {
        console.log("id idd", id);
        
        const res = await fetch(`/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type" : "application/json",
            }
        })
        const data = res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
})

const deleteSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {},
})

export default deleteSlice.reducer

// export const noteAction = deleteSlice.actions;