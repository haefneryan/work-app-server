const express = require('express');
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orders');

const router = express.Router();

const Order = require('../models/Order')

router.route('/').get(getOrders).post(createOrder);
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;