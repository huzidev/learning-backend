import { createContext } from "react";

type AuthContext = {
    userData?: any
    notes?: any
    setNotes?: any
    setUserData?: any
    compNotes?: any
    setCompNotes?: any
}

const DataContext = createContext<AuthContext>({});

export default DataContext;

// Context hooks is used so we can use any function in multiple components
// here we've fetched user's data form mongoDB then use the data in multiple components