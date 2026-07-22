const express = require("express");

const router = express.Router();

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Get Wishlist
router.get("/", protect, getWishlist);

// Add Product
router.post("/", protect, addToWishlist);

// Remove Product
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;