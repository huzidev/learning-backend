import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';

const store = configureStore({
    reducer : {
        user : userReducer
    }
})

export default store;

// will use these two types for useSelector(for State) and for useDispatch(to run/send) function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch