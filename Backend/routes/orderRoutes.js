const express = require("express");
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus, // Import the new controller function
} = require("../controllers/orderController");
const { protectAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", placeOrder);

router.get("/:userId", protectAdmin, getUserOrders);

router.get("/", protectAdmin, getAllOrders);

router.put("/:orderId", protectAdmin, updateOrderStatus);

module.exports = router;
