import React, { createContext, useContext, useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import {websocket_url} from "../configAPI";


const WebSocketContext = createContext();
 const LoginStatusContext = createContext();
export const WebSocketProvider = ({ children }) => {
    const { sendMessage, lastMessage, readyState } = useWebSocket(websocket_url);

    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};
export const useWebSocketContext = () => useContext(WebSocketContext);
export const LoginStatusProvider = ({ children }) => {

    const [loginStatus, setLoginStatus] = useState(false);

    return (
        <LoginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
            {children}
        </LoginStatusContext.Provider>
    );
};


export const useLoginStatusContext = () => useContext(LoginStatusContext);