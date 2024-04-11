import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{
    timestamps:true
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;