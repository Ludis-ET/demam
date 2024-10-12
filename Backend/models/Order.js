const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false } // Disable _id for subdocuments
);

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true }, // Customer name instead of user reference
    phoneNumber: { type: String, required: true }, // Customer phone number
    orderItems: [orderItemSchema], // Array of order items
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" }, // Status default to "pending"
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
