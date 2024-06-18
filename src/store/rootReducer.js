
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


const initState = {
    user: {},
}


export const rootReducer = createReducer(initState, (builder) => {
        builder.addCase('user.login', (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        });
});



