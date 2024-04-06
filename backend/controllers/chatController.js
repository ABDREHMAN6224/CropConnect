import Message from "../model/messages.js";
import Chat from "../model/Chats.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../model/user.js";




export const accessChat = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  let users = req.body.users;
  typeof users === "string" ? users = [users] : users;
  var isChat=false;
  if(req.body.isGroup){
    isChat = await Chat.find({_id:req.body.chatId})
    .populate("members", "-password")
    .populate({
        path: 'recentMessage',
        populate: {
            path: 'sender',
            select: '-password'
        }
    })
  }else{

  
  isChat = await Chat.find({
      members: { $all: [id, ...users] },
      isGroup: req.body.isGroup || false
  },
  )
      .populate("members", "-password")
      .populate({
          path: 'recentMessage',
          populate: {
              path: 'sender',
              select: '-password'
          }
      })
    }
  if (isChat.length) {
    const chatMessages = await Message.find({ chat: isChat[0]._id }).populate("sender", "-password")
      res.status(200).send({ chat: isChat[0], messages: chatMessages })
  } else {
      var chatData = {
          name: "sender",
          members: [id, ...users],
          isGroup: req.body.isGroup || false
      }
      if (req.body.isGroup) {
          chatData.name = req.body?.name
          chatData.description = req.body?.description || ""
          chatData.admin = id
      }
      try {
          const createdChat = await Chat.create(chatData)
          const fullChat = await Chat.findOne({ _id: createdChat._id })
              .populate("members", "-password")
              .populate({
                  path: 'recentMessage',
                  populate: {
                      path: 'author',
                      select: 'name picturePath email'
                  }
              })
          res.status(201).send({ chat: fullChat, messages: [] })
          
      } catch (error) {
        console.log(error);
        return next(new AppError("Error creating chat", 500));
      }
  }
})



export const updateChat = catchAsync(async (req, res, next) => {
  const Chat = await Chat.findById(req.params.id);
  if (req.user._id.toString() !== Chat.admin.toString()) {
    return next(new AppError("You are not authorized to update this Chat", 401));
  }
  if (Chat) {
    Chat.name = req.body.name || Chat.name;
    Chat.description = req.body.description || Chat.description;
    Chat.members = req.body.members || Chat.users;
    const updatedChat = await Chat.save();
    res.status(200).json(updatedChat);
  } else {
    res.status(404);
    throw new Error("Chat not found");
  }
});

export const deleteChat = catchAsync(async (req, res, next) => {
  const Chat = await Chat.findById(req.params.id);
  if (Chat) {
    if (req.user._id.toString() !== Chat.admin.toString()) {
      return next(new AppError("You are not authorized to delete this Chat", 401));
    }
    await Chat.remove();
    res.status(200).json({ message: "Chat removed" });
  } else {
    next(new AppError("Chat not found", 404));
  }
});

export const leaveChat = catchAsync(async (req, res, next) => {
  const Chat = await Chat.findByIdAndUpdate(req.params.id, {
    $pull: { members: req.user._id },
  });
  if (Chat) {
    res.status(200).json({ message: "You have left the group" });
  } else {
    next(new AppError("Chat not found", 404));
  }
});

export const getUserChats = catchAsync(async (req, res, next) => {
  const Chats = await Chat.find({
    members:{
      $elemMatch: {
        $eq: req.user._id,
      },
    },
    // isGroup: false
  })

    .populate("members")
    .populate("admin")
    .populate("recentMessage")
    .sort({ createdAt: -1 });


  res.json(Chats);
});


export const getGroupChats = catchAsync(async (req, res, next) => {
  const Chats = await Chat.find({
    users: {$elemMatch: {$eq: req.user._id,},},
    isGroup: true,
  })
    .populate("members")
    .populate("admin")
    .populate("recentMessage");
});

export const createGroupChat = catchAsync(async (req, res, next) => {
  const {name,description,members} = req.body;
  const admin = req.user._id;
  const isGroup = true;
  const newChat = await Chat.create({name,description,members,admin,isGroup});
  const chat= await Chat.findById(newChat._id).populate("members","-password").populate("admin","-password");
  res.status(201).json(chat);
});

export const addToGroupChat = catchAsync(async (req, res, next) => {
  const {userId} = req.body;
  const user = await User.findById(userId);
  if(!user){
    next(new AppError("User not found", 404));
  }

  const chat = await Chat.findByIdAndUpdate(req.params.id, {
    $push: {members: userId},
  },{new:true}).populate("members","-password").populate("admin","-password").populate({
    path: 'recentMessage',
    populate: {
      path: 'sender',
      select: '-password'
    }
  })
  ;
  if(chat){
    res.status(200).json(chat);
  }
  else{
    next(new AppError("Chat not found", 404));
  }
});

export const removeFromGroupChat = catchAsync(async (req, res, next) => {
  const {userId} = req.body;
  const user = await User.findById(userId);
  if(!user){
    next(new AppError("User not found", 404));
  }
  const chat = await Chat.findByIdAndUpdate(req.params.id, {
    $pull: {members: userId},
  },{new:true}).populate("members","-password").populate("admin","-password").populate({
    path:"recentMessage",
    populate:{
      path:"sender",
      select:"-password"
    }
  });
  if(chat){
    res.status(200).json(chat);
  }
  else{
    next(new AppError("Chat not found", 404));
  }
});
