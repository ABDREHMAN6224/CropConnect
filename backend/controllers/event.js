import express from "express";
import Event from "../model/event.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const router = express.Router();

export const getEvents = catchAsync(async (req, res, next) => {
    const events = await Event.find({
        date: { $gte: new Date() }
    }).sort({createdAt:-1});
    res.status(200).json(events);
    }
);

export const getRegisteredEvents = catchAsync(async (req, res, next) => {
    const events = await Event.find({
        users: { 
            $elemMatch: { $eq: req.user._id } 
        },
        date: { $gte: new Date() },
    }).sort({createdAt:-1})
    ;
    res.status(200).json(events);
    }
);

export const getPastEvents = catchAsync(async (req, res, next) => {
    const events = await Event.find({
        date: { $lt: new Date() },
    }).sort({createdAt:-1});
    res.status(200).json(events);
    });

export const createEvent = catchAsync(async (req, res, next) => {
    const { name:title, description,  date, location,guests } = req.body;
    const event = new Event({
        title,
        description,
        image:`${process.env.SERVER_URL}/uploads/${req.file.filename}`,
        date,
        location,
        time: req.body.time,
        guests,
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
    }
);

export const deleteEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        const deletedEvent = await event.remove();
        res.json(deletedEvent);
    } else {
        next(new AppError("Event not found", 404));
    }
    }
);

export const updateEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.image = req.body.images || event.images;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } else {
        next(new AppError("Event not found", 404));
    }
    }
);

export const registerEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        event.users.push(req.user._id);
        const updatedEvent = await event.save();
        res.status(201).json(updatedEvent);
    } else {
        next(new AppError("Event not found", 404));
    }
    }
);

export default router;