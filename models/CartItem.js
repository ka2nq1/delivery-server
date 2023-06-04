const mongoose = require('mongoose');

const cartItemSchema =  new mongoose.Schema({
    id: String,
    sessionId: String,
    product: {
        name: String,
        price: Number,
        image: String,
        amount: Number,
        shop: String
    }
});

module.exports = mongoose.model('CartItem', cartItemSchema);