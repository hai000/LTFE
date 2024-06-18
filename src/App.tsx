import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import  {LoginPage,ZaloHomePage} from "./home";
import {Provider, useDispatch} from "react-redux";
import {login} from "./store/action";
import store from "./store/store";
import {createStore} from "@reduxjs/toolkit";
import {rootReducer} from "./store/rootReducer";

function App() {
    const store = createStore(rootReducer);

    return (
        <Provider store={store}>
            <LoginPage/>
        </Provider>
    );
}


export default App;
