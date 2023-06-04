const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: String,
  products: [
    {
      name: String,
      price: Number,
      image: String
    }
  ]
});

module.exports = mongoose.model('Shop', shopSchema);
