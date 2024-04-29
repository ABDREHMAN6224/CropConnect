"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {BACKEND_URL} from "../utils/constants"
import { useAppSelector } from "../store/hooks";
const NotificationContext = createContext();
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const {token} = useAppSelector(state => state.auth);
    const user = useAppSelector(state => state.user);
    const [audio, setAudio] = useState(new Audio("/notification.wav"));
    
    const showNotification = (message, type = "success") => {
        setNotification({ message, type });

        if (audio) {
        audio.play();
        }
        setTimeout(() => {
        setNotification(null);
        }, 3000);
    };
    const createNotification = async (content,link,category,scope) => {
        if(notifications.length > 0){
            if(notifications.find((notification) => notification.scope === scope)){
                return;
            }
        }
        const res = await fetch(`${BACKEND_URL}/notification`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({content,category,link,scope})
        });
        const data_ = await res.json();
        if(res.ok){
            setNotifications((prev) => [data_.notification, ...prev]);
            showNotification({
                message:content,
                type:"success"
            })
        }
    }

    const deleteNotification = async (id) => {
        const res = await fetch(`${BACKEND_URL}/notification/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json",
            }
        });
        if(res.ok){
            setNotifications((prev) => prev.filter((notification) => notification._id !== id));
        }
    }

    useEffect(() => {
        if(!user._id){
            return;
        }
        const getNotifications = async () => {
            const res = await fetch(`${BACKEND_URL}/notification`,{
                headers:{
                    "Authorization":`Bearer ${token}`,
                }
            });
            const data = await res.json();
            if(res.ok){
                setNotifications(data.notifications);
            }
        }
        getNotifications();
    }, [user]);
    
    return (
        <NotificationContext.Provider value={{ 
            notification,
            notifications,
            showNotification,
            createNotification,
            deleteNotification,
        }}>
        {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);