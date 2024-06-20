import React, {useEffect} from 'react';

import './App.css';
import {LoginPage, ZaloHomePage} from "./home";
import {Provider, useDispatch} from "react-redux";
import {createStore} from "@reduxjs/toolkit";
import {rootReducer} from "./store/rootReducer";
import {BrowserRouter, Routes, Route, useRoutes, Router} from "react-router-dom";
import {WebSocketProvider} from "./store/webSocketProvider";


function App() {
    const store = createStore(rootReducer);
    return (
        <Provider store={store}>
            <WebSocketProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<LoginPage/>}/>
                        <Route path={"chat"} element={<ZaloHomePage/>}/>
                    </Routes>
                </BrowserRouter>
            </WebSocketProvider>
        </Provider>
    );
}


export default App;
