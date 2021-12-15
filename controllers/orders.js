const ErrorResponse = require('../utils/errorResponse');
const Order = require('../models/Order');
const Orders = require('../models/Order');

// @desc    Get all orders
// @route   GET /
// @access  Public
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find();
        console.log(res)

        res.status(200).json({ success: true, count: orders.length, data: orders })
    } catch (err) {
        //res.status(400).json({ success: false })
        next(err);
    }
}

// @desc    Get single order
// @route   GET /:id
// @access  Public
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if(!order) {
            return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 200));
        }

        res.status(200).json({ success: true, data: order })
    } catch (err) {
        next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 400));
    }
}

// @desc    Create new order
// @route   POST /
// @access  Public
exports.createOrder = async (req, res, next) => {
    const order = await Order.create(req.body);

    res.status(201).json({
        success: true,
        data: order
    })
}

// @desc    Update order
// @route   PUT /:id
// @access  Public
exports.updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
    
        if(!order) {
            return res.status(400).json({ success: false })
        }
    
        res.status(200).json({ success: true, data: order })

    } catch (err) {
        res.status(400).json({ success: false })
    }
    
}

// @desc    Delete order
// @route   DELETE /:id
// @access  Public
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
    
        if(!order) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
