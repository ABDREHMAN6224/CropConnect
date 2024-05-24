import Marketplace from "../model/marketplace.js";
import Order from "../model/order.js";
import catchAsync from "../utils/catchAsync.js";
import Email from "../utils/email.js";

export const createOrder = catchAsync(async (req, res, next) => {
    const newOrder = new Order({
        user: req.user._id,
        orderItems: req.body.orderItems.map(i=>i.toString()),
        shippingAddress: req.body.shippingAddress,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const createdOrder = await newOrder.save();
    const email = new Email(req.user);
    await email.sendOrderConfirmation();
    // for each product in order update buyers
    for (let i = 0; i < req.body.orderItems.length; i++) {
        await Marketplace.updateOne(
            { _id: req.body.orderItems[i] },
            [
              {
                $set: {
                  buyers: { $concatArrays: ["$buyers", [req.user._id]] },
                  status: {
                    $cond: {
                      if: { $eq: ["$stock", 1] },
                      then: "sold",
                      else: "$status"
                    }
                  },
                  stock: { $subtract: ["$stock", 1] }
                }
              }
            ]
          );
              }
    const order = await Order.findById(createdOrder._id).populate("user", "name email avatar").populate("orderItems", "name price images");
    res.status(201).json(order);
})

export const getMyOrders = catchAsync(async (req, res, next) => {
    // populate reviews with author
    const orders = await Order.find({ user: req.user._id }).populate("user", "name email avatar").populate("orderItems", "name price images reviews")
    .populate({
        path: "orderItems",
        populate: {
            path: "reviews",
            select: "author"
        }
    });
    res.status(200).json(orders);
})

export const getStoreOrders = catchAsync(async (req, res, next) => {
    const found_orders = await Order.aggregate([
        {
            $unwind: "$orderItems"
        },
        {
            $lookup: {
                from: "marketplaces",
                localField: "orderItems",
                foreignField: "_id",
                as: "orders"
            }
        },
        {
            $match:{
                "orders.seller": req.user._id
            }
        },
        {
            $group: {
                _id: "$_id",
                user: { $first: "$user" },
                orderItems: { $push: "$orderItems" },
                orders: { $push: "$orders" },
                shippingAddress: { $first: "$shippingAddress" },
                shippingPrice: { $first: "$shippingPrice" },
                totalPrice: { $first: "$totalPrice" },
                isPaid: { $first: "$isPaid" },
                isDelivered: { $first: "$isDelivered" },
                deliveredAt: { $first: "$deliveredAt" },
                status: { $first: "$status" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" }
            }
        },
        {
            $project: {
                _id: 1,
                user: 1,
                orderItems: 1,
                orders: { $reduce: {
                    input: "$orders",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this"] }
                } },
                shippingAddress: 1,
                shippingPrice: 1,
                totalPrice: 1,
                isPaid: 1,
                isDelivered: 1,
                deliveredAt: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ])
    res.status(200).json(found_orders);
})

export const getOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email avatar").populate("orderItems.product", "name price images");
    if (order) {
        res.status(200).json(order);
    } else {
        next(new AppError("Order not found", 404));
    }
})

export const updateOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, { new: true });

    if (order) {
        if(req.body.status === "delivered"){
            const email = new Email(order.user);
            await email.sendOrderDelivered();
        }
        res.status(200).json(order);
    } else {
        next(new AppError("Order not found", 404));
    }
})

export const allOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find().populate("orderItems", "name price image");
    res.status(200).json(orders);
})