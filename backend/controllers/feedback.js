import Feedback from "../model/feedback.js";
import catchAsync from "../utils/catchAsync.js";

export const createFeedback = catchAsync(async (req, res, next) => {
    const existingFeedback = await Feedback.findOne({ user: req.user._id });
    if(existingFeedback){
        existingFeedback.feedback = req.body.feedback;
        const updatedFeedback = await existingFeedback.save();
        const feedback = await updatedFeedback.populate("user", "name email avatar");
        return res.status(200).json(feedback);
    }
    const newFeedback = new Feedback({
        feedback: req.body.feedback,
        user: req.user._id
    });
    const createdFeedback = await newFeedback.save();
    const feedback = await createdFeedback.populate("user", "name email avatar");
    res.status(201).json(feedback);
})

export const getFeedbacks = catchAsync(async (req, res, next) => {
    const feedbacks = await Feedback.find({}).populate("user", "name email avatar");
    res.status(200).json(feedbacks);
})

export const getMyFeedback = catchAsync(async (req, res, next) => {
    const feedback = await Feedback.findOne({ user: req.user._id }).populate("user", "name email avatar");
    res.status(200).json(feedback);
})