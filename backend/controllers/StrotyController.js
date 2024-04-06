import Story from '../model/stories.js';
import ApiFeatures from '../utils/ApiFeature.js';
import catchAsync from '../utils/catchAsync.js';

export const getStories = catchAsync(async (req, res) => {
    const feature = new ApiFeatures(Story.find(), req.query).search().filter().pagination(10);
    const stories = await feature.query;
    res.json(stories);
})

export const createStory = catchAsync(async (req, res) => {
    const story = await Story.create(req.body);
    res.json(story);
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


