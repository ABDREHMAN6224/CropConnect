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
    req.body.products.forEach(async (order) => {
        await Marketplace.findByIdAndUpdate(order, {
            $push: { reviews: createdReview._id }
        });
    });
    const newReview = await Review.findById(createdReview._id).populate("author", "name email avatar");
    res.status(201).json(newReview);
})

