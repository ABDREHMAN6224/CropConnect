import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    type: {
        type: String,
        default: "text"
    }
}, {
    timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);
export default Message;