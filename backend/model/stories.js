import mongoose from "mongoose"

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    },
    files: [
        {
            type: String,
        }
    ],
    category: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})



const Story = mongoose.model("Story", storySchema)

export default Story