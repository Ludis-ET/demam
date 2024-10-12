const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  image1Url: { type: String },
  image2Url: { type: String },
  image3Url: { type: String },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
