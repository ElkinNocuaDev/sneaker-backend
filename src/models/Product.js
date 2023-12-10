const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  basePrice: { type: Number, required: true },
  brand: { type: String, required: true },
  specialPrices: { type: Map, of: Number, default: {} },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
