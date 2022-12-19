import { createSlice } from '@reduxjs/toolkit';

const testState = createSlice({
    name: 'test',
    initialState: {
        totalQuantity : 0
    },
    reducers: {
        increment(state: any) {
            state.totalQuantity ++;
        }
    }
})

export const testActions = testState.actions;

export default testState;