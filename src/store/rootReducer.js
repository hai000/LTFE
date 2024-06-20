
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


const initState = {
    user: {},
    conversationPane: [],
    messages: []
}


export const rootReducer = createReducer(initState, (builder) => {
    builder.addCase('user.login', (state, action) => {
        return {
            ...state,
            user: action.payload
        }
    });
    builder.addCase('add.conversationPane', (state, action) => {

    });
    builder.addCase('set.conversationPane', (state, action) => {
        return {
            ...state,
            conversationPane: action.payload
        }
    });
    builder.addCase('set.Messages', (state, action) => {
        state.messages = action.payload
    })

});



