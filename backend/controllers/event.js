import express from "express";
import ExpressAsyncHandler from "express-async-handler";
import Event from "../model/event.js";

const router = express.Router();

export const getEvents = ExpressAsyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.json(events);
    }
);

export const createEvent = ExpressAsyncHandler(async (req, res) => {
    const { title, description, images, date, location } = req.body;
    const event = new Event({
        title,
        description,
        images,
        date,
        location,
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
    }
);

export const deleteEvent = ExpressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        const deletedEvent = await event.remove();
        res.json(deletedEvent);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
    }
);

export const updateEvent = ExpressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.images = req.body.images || event.images;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
    }
);

export const registerEvent = ExpressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
        event.users.push(req.user._id);
        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
    }
);

export default router;