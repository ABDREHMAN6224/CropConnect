import express from "express"
import ExpressAsyncHandler from "express-async-handler"
import User from "../model/user.js"


export const register = ExpressAsyncHandler(async (req, res) => {
    const { name, email, password, avatar, role, status } = req.body;
    const user = new User({ name, email, password, avatar, role, status });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
})

export const login = ExpressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = await user.generateToken();
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            status: user.status,
            token,
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

export const getUsers = ExpressAsyncHandler(async (req, res) => {
    const users = await User.find({status:"active"}).select("-password");
    res.json(users);
})

export const getUser = ExpressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export const updateUser = ExpressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.avatar = req.body.avatar || user.avatar;
        user.role = req.body.role || user.role;
        user.status = req.body.status || user.status;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export const deleteUser = ExpressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.status = "inactive";
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export const uploadAvatar = ExpressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.avatar = req.file.path;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})
