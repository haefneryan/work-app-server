const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    customer: String,
    stylenumber: String,
    triageowner: String,
    owner: String,
    workload: Number,
    buildtime: Number,
    triagecomplete: String,
    designcomplete: String,
    duedate: String,
    salesorder: String,
    solineitem: String,
    buildtime: Number,
    sameas: String,
    sameasChildren: Array
})

module.exports = mongoose.model('order', OrdersSchema);