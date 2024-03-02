import express from "express";
import jwt from "jsonwebtoken";
import ExpressAsyncHandler from "express-async-handler";
import User from "../model/user.js";

export const protect = ExpressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            if (!req.user) {
                res.status(404);
                throw new Error("Unauthorized, user not found");
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


export const isAdmin = ExpressAsyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
}
)