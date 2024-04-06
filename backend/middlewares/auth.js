import jwt from "jsonwebtoken";
import User from "../model/user.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";


export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }
    else if (!token) {
        res.status(401);
        next(new AppError("Not authorized, no token", 401));
    }
})


export const isAdmin = catchAsync(async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        next(new AppError("Not authorized as an admin", 401));
    }
}
)