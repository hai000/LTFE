import React, {createContext, useContext, useState, useEffect, useRef} from 'react';
import useWebSocket from 'react-use-websocket';
import {websocket_url} from "../configAPI";


const WebSocketContext = createContext();
 const LoginStatusContext = createContext();
export const WebSocketProvider = ({ children }) => {

    const didUnmount = useRef(false);
    const [members, setMember] = useState(0)
    // setWebSocket(new WebSocket(websocketUrl))
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        websocket_url, {
            shouldReconnect: (closeEvent) => {
                return didUnmount.current === false;
            },
            reconnectAttempts: 10,
            reconnectInterval: 300,
        }
    );
    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState, members, setMember}}>
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