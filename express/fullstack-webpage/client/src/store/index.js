import { configureStore } from "@reduxjs/toolkit";
import stateStore from "./State-Store";

const store = configureStore({
    reducer : {
        login : stateStore.reducer
    }
});

export default store;