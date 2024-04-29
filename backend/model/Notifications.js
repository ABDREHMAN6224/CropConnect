import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        enum: ["chat","announcement","order","review","feedback","verified","live"],
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true
    },
    scope:{
        type:String,
    }
},{timestamps: true});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;