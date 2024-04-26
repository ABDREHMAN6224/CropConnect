import Story from '../model/stories.js';
import ApiFeatures from '../utils/ApiFeature.js';
import catchAsync from '../utils/catchAsync.js';

export const getStories = catchAsync(async (req, res) => {
    const feature = new ApiFeatures(Story.find({
        status: "approved",
        author: { $ne: req.user._id }
    }), req.query).sort().limitFields();
    const stories = await feature.query.populate("author","name email avatar");
    res.status(200).json(stories);
})

export const getMyStories = catchAsync(async (req, res) => {
    const feature = new ApiFeatures(Story.find({
        author: req.user._id
    }
    ), req.query).sort().limitFields();
    const stories = await feature.query.populate("author","name email avatar");
    res.status(200).json(stories);
})

export const createStory = catchAsync(async (req, res) => {
    const story={
        title:req.body.title,
        author:req.user._id,
        content:req.body.content,
        category:req.body.category,
        files:req.files.map((file) => `${process.env.SERVER_URL}/uploads/${file.filename}`)
    }
    const newStory = await Story.create(story);
    const storyWithAuthor = await Story.findById(newStory._id).populate("author","name email avatar");
    res.status(201).json(storyWithAuthor);
})

export const getStory = catchAsync(async (req, res) => {
    const story = await Story.find({
       _id: req.params.id,
       status: "approved"
    }).populate("author","name email avatar");
    res.status(200).json(story);
})

export const deleteStory = catchAsync(async (req, res) => {
    const story = await Story.findByIdAndDelete(req.params.id);
    res.json(story);
})

export const updateStory = catchAsync(async (req, res) => {
    const { title, content } = req.body;
    const story = await Story.findByIdAndUpdate(req.params.id,{
        title,
        content
    }, { new: true});
    res.json(story);
})

export const getPendeingStories = catchAsync(async (req, res) => {
    const stories = await Story.find({
        status: "pending"
    }).populate("author","name email avatar");
    res.status(200).json(stories);
})

export const approveStory = catchAsync(async (req, res) => {
    const story = await Story.findByIdAndUpdate(req.params.id, {
        status: "approved"
    }, { new: true});
    res.status(200).json(story);
})

export const rejectStory = catchAsync(async (req, res) => {
    const story = await Story.findByIdAndUpdate(req.params.id, {
        status: "rejected"
    }, { new: true});
    res.status(200).json(story);
})
