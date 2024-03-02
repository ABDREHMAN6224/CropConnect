import ExpressAsyncHandler from "express-async-handler"
import User from "../model/user.js"
import Email from "../utils/email.js";
import ApiFeatures from "../utils/ApiFeature.js";

export const register = ExpressAsyncHandler(async (req, res) => {
    const { name, email, password, avatar, role} = req.body;
    const user = new User({ name, email, password, avatar, role});
    const createdUser = await user.save();
    const sendEmail = new Email(createdUser);
    await sendEmail.sendWelcome();
    console.log("Email sent");
    res.status(201).json(createdUser);
})

export const login = ExpressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const query = User.findOne({ email });
    const feature = new ApiFeatures(query, req.query).filter().sort().paginate();
    const user = await feature.query;
    if (user && (await user.matchPassword(password))) {
        const token = await user.generateToken();
        res.json({
            user: user,
            token,
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

export const getUsers = ExpressAsyncHandler(async (req, res) => {
    const feature = new ApiFeatures(User.find({
        status: "active"
    }), req.query).filter().sort().paginate();
    const users = await feature.query;
    res.json(users);
})

export const getUser = ExpressAsyncHandler(async (req, res) => {
    const feature = new ApiFeatures(User.findById(req.params.id), req.query);
    const user = await feature.query.select("-password");
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


export const resetPassword = ExpressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.generateResetPasswordToken();
        // send email with resetPasswordToken
        const sendEmail = new Email(user);
        await sendEmail.sendPasswordReset();
        res.json("Email sent with reset password token");

    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export const updatePassword = ExpressAsyncHandler(async (req, res) => {
    const resetToken = req.params.resetPasswordToken;
    const user = await User.findById(req.params.id);
    if (user) {
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        if (user.resetPasswordToken === resetPasswordToken && user.resetPasswordExpire > Date.now()) {
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(400);
            throw new Error("Invalid reset password token");
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})
