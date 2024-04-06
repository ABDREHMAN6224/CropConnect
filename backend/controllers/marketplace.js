import Marketplace from "../model/marketplace.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";


export const createMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = new Marketplace({
        name: req.body.name, 
        description: req.body.description,
        seller: req.user._id,
        price: req.body.price,
        image: req.body.image
    });
    const createdMarketplace = await marketplace.save();
    res.status(201).json(createdMarketplace);
})

export const getMarketplaces = catchAsync(async (req, res, next) => {
    const marketplaces = await Marketplace.find();
    res.json(marketplaces);
})

export const getMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id);
    if (marketplace) {
        res.json(marketplace);
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})

export const updateMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id);
    
    if (marketplace) {
        marketplace.name = req.body.name || marketplace.name;
        marketplace.description = req.body.description || marketplace.description;
        marketplace.image = req.file.path || marketplace.image;
        marketplace.price = req.body.price || marketplace.price;
        const updatedMarketplace = await marketplace.save();
        res.json(updatedMarketplace);
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})

export const deleteMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id);
    if (marketplace) {
        await marketplace.remove();
        res.json({ message: "Marketplace removed" });
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})

export const buyMarketplace = catchAsync(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id);
    if (marketplace) {
        if (marketplace.status === "active") {
            marketplace.status = "sold";
            marketplace.buyer = req.user._id;
            const updatedMarketplace = await marketplace.save();
            res.json(updatedMarketplace);
        } else {
            res.status(400);
            throw new Error("Marketplace already sold");
        }
    } else {
        next(new AppError("Marketplace not found", 404));
    }
})