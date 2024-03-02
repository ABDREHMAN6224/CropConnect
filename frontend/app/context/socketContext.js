"use client";
const { createContext, useContext } = require("react");
import {io} from "socket.io-client";

const serverUrl = "http://localhost:5000";

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const socket = io(serverUrl, []);
    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


export const useSocket = () => useContext(SocketContext)
