import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isGroup: {
        type: Boolean,
        default: false,
    },
    recentMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;