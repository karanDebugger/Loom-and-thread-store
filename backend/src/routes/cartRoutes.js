const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const {
  protect,
} = require("../middleware/authMiddleware");

// ===============================
// Cart Routes
// ===============================

// Add Product To Cart
router.post("/", protect, addToCart);

// Get Logged In User Cart
router.get("/", protect, getCart);

// Update Cart Item Quantity
router.put("/:id", protect, updateCartItem);

// Remove Single Cart Item
router.delete("/:id", protect, removeCartItem);

// Clear Entire Cart
router.delete("/", protect, clearCart);

module.exports = router; 