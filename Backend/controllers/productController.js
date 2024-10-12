const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const product = await Product.findById(_id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    stock,
    category,
    image1Url,
    image2Url,
    image3Url,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      category,
      image1Url,
      image2Url,
      image3Url,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const {
    name,
    price,
    description,
    category,
    stock,
    image1Url,
    image2Url,
    image3Url,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Invalid id" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    {
      name,
      price,
      description,
      category,
      stock,
      image1Url,
      image2Url,
      image3Url,
    },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({
    message: "Update Successful",
    product: updatedProduct,
  });
};

const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(_id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const searchProducts = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "Search query is required." });
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found." });
    }

    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
