import Chat from "../model/Chats.js";
import Message from "../model/messages.js";
import catchAsync from "../utils/catchAsync.js";

export const sendMessage = catchAsync(async (req, res) => {
    let {chat,content,type}=req.body;
    if(req.file){
        content=process.env.SERVER_URL + "/uploads/" + req.file.filename;
        type="file";
    }
    const newMessage = await Message.create({
        chat,
        content,
        type,
        sender: req.user._id,
    });
    const message=await Message.findById(newMessage._id).populate("sender");
    // set recent message in chat
    const chat_ =await Chat.findById(chat);
    chat_.recentMessage=newMessage._id;
    await chat_.save();
    res.status(200).json({
        status: "success",
        data: message,
    });
})

export const getMessages = catchAsync(async (req, res) => {
    const { chatId } = req.params;
    const messages = await Message.find({ chat:chatId }).populate("sender");
    res.status(200).json({
        status: "success",
        data: messages,
    });
})
