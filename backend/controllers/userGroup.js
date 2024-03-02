import express from "express";
import ExpressAsyncHandler from "express-async-handler";
import UserGroup from "../model/userGroup.js";

export const createUserGroup = ExpressAsyncHandler(async (req, res) => {
  const { name, description, users } = req.body;
  const userGroup = new UserGroup({
    name,
    description,
    users,
    isGroup: true,
    admin: req.user._id,
  });
  const createdUserGroup = await userGroup.save();
  res.status(201).json(createdUserGroup);
});

export const getUserGroups = ExpressAsyncHandler(async (req, res) => {
  const userGroups = await UserGroup.find({})
    .populate("users")
    .populate("admin");

  if(req.user.role === "user") {
    userGroups = userGroups.filter((group) => group.users.includes(req.user._id) || group.admin === req.user._id);
  }
  res.json(userGroups);
});


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