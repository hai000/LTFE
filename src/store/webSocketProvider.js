import React, { createContext, useContext, useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import {websocket_url} from "../configAPI";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const { sendMessage, lastMessage, readyState } = useWebSocket(websocket_url);

    return (
        <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => useContext(WebSocketContext);