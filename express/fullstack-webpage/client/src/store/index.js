import { configureStore } from "@reduxjs/toolkit";
import logInStore from "./Login-Store";
import registerStore from "./Register-Store";

const store = configureStore({
    reducer : {
        login : logInStore.reducer,
        register : registerStore.reducer
    }
});

export default store;