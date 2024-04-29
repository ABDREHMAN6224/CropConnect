import {BACKEND_URL} from "./constants"
export const createNotification = async (content,link,category,token) => {
    const res = await fetch(`${BACKEND_URL}/notification`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({content,category,link})
    });
    const data_ = await res.json();
    if(res.ok){
        console.log("notification sent");
    }
}