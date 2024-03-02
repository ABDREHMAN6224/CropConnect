import express from "express";
import jwt from "jsonwebtoken";
import ExpressAsyncHandler from "express-async-handler";
import User from "../model/user.js";

export const protect = ExpressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const role = req.headers.authorization.split(" ")[2];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                res.status(404);
                throw new Error("User not found");
            }
            if (req.user.status !== "active") {
                res.status(401);
                throw new Error("User is inactive");
            }
            if (req.user.role !== role && role !== "admin") {
                res.status(401);
                throw new Error("User role is not authorized");
            }
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})