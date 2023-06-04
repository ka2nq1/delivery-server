const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: String,
    products: [
        {
            name: String,
            price: Number,
            amount: Number,
            shop: String
        }
    ],
    name: String,
    email: String,
    phone: String,
    address: String,
    totalSum: Number
});

module.exports = mongoose.model('Order', orderSchema);