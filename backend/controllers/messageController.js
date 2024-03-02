import asyncHandler from "express-async-handler"
import Message from "../model/messages.js";
import UserGroup from "../model/userGroups.js";


export const sendMessage = (data) =>{
    const msg = {
        sender: data.sender,
        content: data.message,
        group:data.chat._id ,
        type: data?.type || "text"
    }
    
    Message.create(msg)
    .then(created => {
        UserGroup.findByIdAndUpdate(chatId, { recentMessage: created }, { new: true })
        .then(updated => {
            Message.findOne({ _id: created._id })
            .populate("sender", "name avatar email")
            .populate({
                path: "group",
                populate: {
                    path: "users",
                    select: "name avatar email"
                }
            }).sort({ createdAt: -1 })
            .then(created => {
                return created
            })
        })
    })
    .catch(error => {
        return error
    })
}

export const deleteMessage = async(id) => {
    const deleted = await Message.findByIdAndDelete(id)
    .then(deleted => {
        return deleted
    })
}


