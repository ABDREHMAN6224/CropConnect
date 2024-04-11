import Order from "../model/order.js";
import catchAsync from "../utils/catchAsync.js";

export const createOrder = catchAsync(async (req, res, next) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const createdOrder = await newOrder.save();
    const order = await Order.findById(createdOrder._id).populate("user", "name email avatar").populate("orderItems.product", "name price image");
    res.status(201).json(order);
})

export const getMyOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }).populate("user", "name email avatar").populate("orderItems.product", "name price image");
    res.status(200).json(orders);
})

export const getStoreOrders = catchAsync(async (req, res, next) => {
    const found_orders = await Order.find({ 
        orderItems: {
            $elemMatch: {
                "product.seller": req.user._id
            }
        }
     }).populate("user", "name email avatar").populate("orderItems.product", "name price image");
    const orders = found_orders.map((order) => {
        order.orderItems = order.orderItems.filter((item) => item.product.seller.toString() === req.user._id.toString());
        return order;
    });
    res.status(200).json(orders);
})

export const getOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email avatar").populate("orderItems.product", "name price image");
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
        res.status(200).json(order);
    } else {
        next(new AppError("Order not found", 404));
    }
})

