import ExpressAsyncHandler from "express-async-handler";
import UserGroup from "../model/userGroups.js";
import Message from "../model/messages.js";



export const accessUserGroup = ExpressAsyncHandler(async (req, res) => {
  var isChat = await UserGroup.find({
      $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } }
      ]
  })
      .populate("users", "-password")
      .populate({
          path: 'recentMessage',
          populate: {
              path: 'sender',
              select: '-password'
          }
      })
  if (isChat.length) {
    const chatMessages = await Message.find({ group: isChat[0]._id })
      res.send({ chat: isChat[0], messages: chatMessages })
  } else {
      var chatData = {
          name: "sender",
          users: [req.user._id, userId]
      }
      try {
          const createdChat = await UserGroup.create(chatData)
          const fullChat = await UserGroup.findOne({ _id: createdChat._id })
              .populate("users", "-password")
              .populate({
                  path: 'recentMessage',
                  populate: {
                      path: 'author',
                      select: 'name picturePath email'
                  }
              })
          res.status(200).send({ chat: fullChat, messages: [] })
          
      } catch (error) {
          res.status(400)
          throw new Error("error")
      }
  }
})



export const updateUserGroup = ExpressAsyncHandler(async (req, res) => {
  const userGroup = await UserGroup.findById(req.params.id);
  if (req.user._id.toString() !== userGroup.admin.toString()) {
    res.status(401);
    throw new Error("You are not authorized to update this user group");
  }
  if (userGroup) {
    userGroup.name = req.body.name || userGroup.name;
    userGroup.description = req.body.description || userGroup.description;
    userGroup.users = req.body.users || userGroup.users;
    const updatedUserGroup = await userGroup.save();
    res.json(updatedUserGroup);
  } else {
    res.status(404);
    throw new Error("User Group not found");
  }
});

export const deleteUserGroup = ExpressAsyncHandler(async (req, res) => {
  const userGroup = await UserGroup.findById(req.params.id);
  if (userGroup) {
    if (req.user._id.toString() !== userGroup.admin.toString()) {
      res.status(401);
      throw new Error("You are not authorized to delete this user group");
    }
    await userGroup.remove();
    res.json({ message: "User Group removed" });
  } else {
    res.status(404);
    throw new Error("User Group not found");
  }
});

export const leaveChat = ExpressAsyncHandler(async (req, res) => {
  const userGroup = await UserGroup.findById(req.params.id);
  if (userGroup) {
    userGroup.users = userGroup.users.filter(user => user.toString() !== req.user._id.toString());
    const updatedUserGroup = await userGroup.save();
    res.json(updatedUserGroup);
  } else {
    res.status(404);
    throw new Error("User Group not found");
  }
});

export const getuserChats = ExpressAsyncHandler(async (req, res) => {
  const userGroups = await UserGroup.find({
    users:{
      $in:[req.user._id]
    }
  })
    .populate("users")
    .populate("admin");

  res.json(userGroups);
});


export const getChatData =async (chatId) => {
  const chat = await Message.find({ group
    : chatId })
    .populate("sender", "-password")
    .populate("group")
    .populate("group.users", "-password")
    .populate("group.admin", "-password")
  return chat
}
