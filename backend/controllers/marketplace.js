import Marketplace from "../model/marketplace.js";
import ApiFeature from "../utils/ApiFeature.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const serverUrl = "http://localhost:5000";

export const createMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = new Marketplace({
        name: req.body.name,
        description: req.body.description,
        images: req.files.map((file) => `${serverUrl}/uploads/${file.filename}`),
        price: req.body.price,
        category: req.body.category,
        seller: req.user._id
    });
    const createdMarketplace = await marketplace.save();
    const product = await createdMarketplace.populate("seller", "name email avatar")
    res.status(201).json(product);
})

export const getMarketplaces = catchAsync(async (req, res, next) => {
    const marketplaces = await Marketplace.find({
        status: "active",
        seller: { $ne: req.user._id }
    }).populate("seller", "name email avatar").sort({ createdAt: -1 });
    res.status(200).json(marketplaces);
})

export const getMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id).populate("seller", "name email avatar").populate("buyers","name email avatar reviews").populate({
        path: "reviews",
        populate: {
            path: "author",
            select: "name email avatar"
        }
    });
    if (marketplace) {
        res.status(200).json(marketplace);
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})

export const updateMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        $push: { images: req.files.map((file) => `${serverUrl}/uploads/${file.filename}`) }
    }, { new: true });
    if (marketplace) {
        const product = await Marketplace.findById(req.params.id).populate("seller", "name email avatar");
        res.status(200).json(product);
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})

export const deleteMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findByIdAndDelete(req.params.id);
    if (marketplace) {
        res.status(200).json({ message: "Marketplace removed" });
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})

export const buyMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id);
    if (marketplace) {
        if (marketplace.status === "active") {
            marketplace.status = "sold";
            marketplace.buyers.push(req.user._id);
            const updatedMarketplace = await marketplace.save();
            const product = await updatedMarketplace.populate("seller", "name email avatar");
            res.status(200).json(product);
        } else {
            res.status(400);
            throw new Error("Marketplace already sold");
        }
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})

export const getMyMarketplaces = catchAsync(async (req, res, next) => {
    const marketplaces = await Marketplace.find({ seller: req.user._id }).populate("seller", "name email avatar").sort({ createdAt: -1 });
    res.status(200).json(marketplaces);
})

export const makeAvailable = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id);
    if (marketplace) {
        marketplace.status = "active";
        const updatedMarketplace = await marketplace.save();
        res.status(200).json(updatedMarketplace);
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})