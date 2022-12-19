import { createSlice } from '@reduxjs/toolkit';

const userState = createSlice({
    name: 'user',
    initialState: {
        setNotes: [],
        setCompNotes: [],
        setUserData: {}
    },
    reducers: {
        getNotes(state: any) {
            async function about() {
                try {
                    const res = await fetch('/about', {
                        method : 'GET',
                        headers: new Headers({
                            "Content-Type" : "application/json",
                            "Accept" : "application/json",
                        }),
                        credentials : "include"
                    })
                    const data = await res.json();
                    state.setUserData(data);
                    if (res.status !== 200) {
                        const error = new Error()
                        throw error;
                    }
                    return state.setUserData
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
})

export const stateActions = userState.actions;

export default userState;