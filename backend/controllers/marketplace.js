import Marketplace from "../model/marketplace";

export const createMarketplace = ExpressAsyncHandler(async (req, res) => {
    const marketplace = new Marketplace({
        name: req.body.name,
        description: req.body.description,
        image: req.file.path,
        seller: req.user._id,
        price: req.body.price
    });
    const createdMarketplace = await marketplace.save();
    res.status(201).json(createdMarketplace);
})

export const getMarketplaces = ExpressAsyncHandler(async (req, res) => {
    const marketplaces = await Marketplace.find();
    res.json(marketplaces);
})

export const getMarketplace = ExpressAsyncHandler(async (req, res) => {
    const marketplace = await Marketplace.findById(req.params.id);
    if (marketplace) {
        res.json(marketplace);
    } else {
        res.status(404);
        throw new Error("Marketplace not found");
    }
})

export const updateMarketplace = ExpressAsyncHandler(async (req, res) => {
    const marketplace = await Marketplace.findById(req.params.id);
    
    if (marketplace) {
        marketplace.name = req.body.name || marketplace.name;
        marketplace.description = req.body.description || marketplace.description;
        marketplace.image = req.file.path || marketplace.image;
        marketplace.price = req.body.price || marketplace.price;
        const updatedMarketplace = await marketplace.save();
        res.json(updatedMarketplace);
    } else {
        res.status(404);
        throw new Error("Marketplace not found");
    }
})

export const deleteMarketplace = ExpressAsyncHandler(async (req, res) => {
    const marketplace = await Marketplace.findById(req.params.id);
    if (marketplace) {
        await marketplace.remove();
        res.json({ message: "Marketplace removed" });
    } else {
        res.status(404);
        throw new Error("Marketplace not found");
    }
})

export const buyMarketplace = ExpressAsyncHandler(async (req, res) => {
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
        res.status(404);
        throw new Error("Marketplace not found");
    }
})