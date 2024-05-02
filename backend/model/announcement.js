import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;