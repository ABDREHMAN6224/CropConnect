"use client";
import { useEffect} from "react";
const { createContext, useContext } = require("react");
import {io} from "socket.io-client";
import {useAppSelector} from "../store/hooks"
import { BACKEND_URL } from "../utils/constants";
import { useNotification } from "./notificationContext";


const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const socket = io(BACKEND_URL,[]);
    const user = useAppSelector(state => state.user);
    const {createNotification,showNotification} = useNotification();
    
    useEffect(()=>{
        if(user._id){
            socket.emit("setup", user);
        }
    },[user,socket])
    useEffect(()=>{
        const handleNewNotification = (data) => {
            const content = data.content;
            const category = data.category;
            const link = data.link;
            createNotification(content,link,category,data?.scope);
            showNotification({
                message:content,
                type:"success"
            })
            
        }
        const handleNewMessage =(data) => {
                const chat = data.chat._id;
                const isGrp = data.chat.isGroup;
                const content = !isGrp?`${data.sender.name} sent a message`:`New message in ${data.chat.name}`
                const category = "chat";
                const link = `/community/chats/${(isGrp?"?g_chatId=":"?chatId=")+chat}`;
                const scope = chat;
                createNotification(content,link,category,scope);
                showNotification({
                    message:content,
                    type:"success"
                })

        }
        socket.on("notification:chat", handleNewMessage);
        socket.on("notification:general", handleNewNotification);
        
        return () => {
            socket.off("notification:chat", handleNewMessage);
            socket.off("notification:general", handleNewNotification);
        }
    },[socket])
    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


export const useSocket = () => useContext(SocketContext)
