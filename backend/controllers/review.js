import Marketplace from "../model/marketplace.js";
import Review from "../model/review.js";
import catchAsync from "../utils/catchAsync.js";

export const createReview = catchAsync(async (req, res, next) => {
    const review = new Review({
        author: req.user._id,
        rating: req.body.rating,
        comment: req.body.comment
    });
    const createdReview = await review.save();
    Marketplace.findByIdAndUpdate(req.params.id, {
        $push: { reviews: createdReview._id }
    });
    const newReview = await Review.findById(createdReview._id).populate("author", "name email avatar");
    res.status(201).json(newReview);
})

