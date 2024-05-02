import User from "../model/user.js";
import Email from "../utils/email.js";
import ApiFeatures from "../utils/ApiFeature.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import Order from "../model/order.js";
import Event from "../model/event.js";
import Story from "../model/stories.js";
import Marketplace from "../model/marketplace.js";

export const register = catchAsync(async (req, res, next) => {
  if(req.file){
    req.body.avatar =process.env.SERVER_URL + "/uploads/" + req.file.filename;
  }
  const {
    name ,
    email,
    password,
    avatar = "",
    role = req.body.role || "user",
  } = req.body;
  const user = new User({ name, email, password, avatar, role });
  const createdUser = await user.save();
  const sendEmail = new Email(createdUser);
  await sendEmail.sendWelcome();
  res.status(201).json(createdUser);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const query = User.findOne({ email });
  const user = await query;
  if (user && (await user.matchPassword(password))) {
    const token = await user.generateToken();
    res.json({
      user: user,
      token,
    });
  } else {
    next(new AppError("Invalid email or password", 401));
  }
});

export const getUsers = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(User.find(), req.query).sort().limitFields();
  const users = await feature.query.select("-password");
  users.filter((user) => user._id !== req.user._id);
  res.status(200).json({
    users:users.filter((user) => user._id !== req.user._id)} );
});

export const getUser = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(User.findById(req.params.id), req.query);
  const user = await feature.query.select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateUser = catchAsync(async (req, res, next) => {
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
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.status = "inactive";
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
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
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const resetToken = req.params.resetPasswordToken;
  const user = await User.findById(req.params.id);
  if (user) {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    if (
      user.resetPasswordToken === resetPasswordToken &&
      user.resetPasswordExpire > Date.now()
    ) {
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
});

export const contactUs = catchAsync(async (req, res, next) => {
  const { name, email, message } = req.body;
  const sendEmail = new Email({ name, email, message });
  await sendEmail.sendContactUs();
  res.status(200).json("Email sent successfully");
});

export const getAnaytics = catchAsync(async (req, res, next) => {
  const obj = {
    totalOrders: 0,
    totalUsers: 0,
    totalEvents: 0,
    totalBlogs: 0,
    totalProducts: 0,
  }
  obj.totalOrders = await Order.countDocuments();
  obj.totalUsers = await User.countDocuments();
  obj.totalEvents = await Event.countDocuments();
  obj.totalBlogs = await Story.countDocuments();
  obj.totalProducts = await Marketplace.countDocuments();
  res.status(200).json(obj);
});