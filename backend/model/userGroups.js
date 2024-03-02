import mongoose from 'mongoose';

const userGroup = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    users: [{
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
}, {
    timestamps: true,
});

const UserGroup = mongoose.model("UserGroup", userGroup);
export default UserGroup;