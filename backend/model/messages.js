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
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserGroup",
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