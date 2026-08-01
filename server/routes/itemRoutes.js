const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  getMyItems,
  getItemById,
  updateItem,
  deleteItem,
  markItemReturned,
} = require("../controllers/itemController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


// Create a new lost/found item
router.post("/", protect, upload.single("photo"), createItem);

// Get all items
router.get("/", getAllItems);

// Get logged-in user's items
router.get("/my-items", protect, getMyItems);

// Get a single item by ID
router.get("/:id", getItemById);

// Update an item
router.put("/:id", protect, updateItem);

// Delete an item
router.delete("/:id", protect, deleteItem);

router.patch("/:id/status", protect, markItemReturned);
module.exports = router;