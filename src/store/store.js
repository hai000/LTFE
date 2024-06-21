import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import persistReducer from "redux-persist/es/persistReducer";
import {persistStore} from "redux-persist";
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({reducer: persistedReducer});





export const persistor = persistStore(store);
export default store;