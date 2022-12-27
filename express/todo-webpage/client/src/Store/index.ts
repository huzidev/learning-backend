import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import noteReducer from "./notes/ShowNotes/noteSlice"
import contactReducer from "./form/Contact/contactSlice"
import signinReducer from "./form/Signin/signinSlice"

const store = configureStore({
    reducer : {
        user : userReducer,
        note : noteReducer,
        contact: contactReducer
        signin: contactReducer
    }
})

export default store;

// will use these two types for useSelector(for State) and for useDispatch(to run/send) function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch