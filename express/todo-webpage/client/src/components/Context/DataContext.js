import { createContext } from "react";

const DataContext = createContext();

export default DataContext;

// Context hooks is used so we can use any function in multiple components
// here we've fetched user's data form mongoDB then use the data in multiple components