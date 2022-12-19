import { configureStore  } from "@reduxjs/toolkit";
import userState from "./UserState";
import testState from "./testState";

const store = configureStore ({

    reducer : {
        user : userState.reducer,
        test: testState.reducer
    }

});

export default store;