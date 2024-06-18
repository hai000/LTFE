import React, {useEffect} from 'react';

import './App.css';
import  {LoginPage,ZaloHomePage} from "./home";
import {Provider, useDispatch} from "react-redux";
import {createStore} from "@reduxjs/toolkit";
import {rootReducer} from "./store/rootReducer";
import {BrowserRouter, Routes, Route, useRoutes, Router} from "react-router-dom";


function App() {
    const store = createStore(rootReducer);
    // let routes = useRoutes([
    //     { path: "/", element: <LoginPage /> },
    //     { path: "component2", element: <ZaloHomePage/> },
    // ]);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<LoginPage/>}/>
                    <Route path={"chat"} element={<ZaloHomePage/>}/>
                </Routes>
            </BrowserRouter>
         </Provider>
    );
}


export default App;
