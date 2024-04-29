import Notification from "../model/Notifications.js";
import catchAsync from "../utils/catchAsync.js";

export const CreateNotification = catchAsync(async (req, res) => {
    const user = req.user._id;
    const {content,category,link,scope} = req.body;
    const notification = await Notification.create({user,category,content,link,scope});
    res.status(201).json({notification});
});

export const GetNotifications = catchAsync(async (req, res) => {
    const user = req.user._id;
    const notifications = await Notification.find({user}).sort("-createdAt");
    res.status(200).json({notifications});
});

export const MarkAsRead = catchAsync(async (req, res) => {
    const notification = req.params.id;
    await Notification.findByIdAndDelete(notification);
    res.status(204).json({message:"deleted successfully"});
})

