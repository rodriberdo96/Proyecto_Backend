const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    numberOrder:{type: String, required: true},    
    stateOrder:{type: String, required: true},  
    timestamp: {type: String, required: true},  
    user: {type: String, required: true},
    address: {type: String, required: true},
    products: {type: Array, required: true},
})

const orderModel = mongoose.model('orders', orderSchema);

module.exports = { orderModel }