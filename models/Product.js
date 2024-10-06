// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    gst: { type: Number, required: true },
    wastage: { type: Number, required: true },
    packagingCost: { type: Number, required: true },
    transport: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
