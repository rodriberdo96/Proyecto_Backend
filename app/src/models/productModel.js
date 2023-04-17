const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now, required: false},
    name:  {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    url: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})

const productsModel = mongoose.model('products', productsSchema);

module.exports = { productsModel }