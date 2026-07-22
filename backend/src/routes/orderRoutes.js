const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// ===================================
// User Routes
// ===================================

// Place Order
router.post("/", protect, placeOrder);

// Get Logged In User Orders
router.get("/my-orders", protect, getMyOrders);

// Get Single Order
router.get("/:id", protect, getOrderById);

// Cancel Order
router.put("/:id/cancel", protect, cancelOrder);

// ===================================
// Admin Routes
// ===================================

// Get All Orders
router.get("/", protect, admin, getAllOrders);

// Update Order Status
router.put("/:id", protect, admin, updateOrderStatus);

// Delete Order
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;