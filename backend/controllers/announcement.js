import Announcement from "../model/announcement.js";
import catchAsync from "../utils/catchAsync.js";

export const makeAnnouncement = catchAsync(async (req, res, next) => {
    const { title, description } = req.body;
    const announcement = await Announcement.create({ title, description });
    res.status(201).json({ status: "success", data: { announcement } });
});

export const getAnnouncements = catchAsync(async (req, res, next) => {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: { announcements } });
});