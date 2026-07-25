const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const { protect } = require("../middleware/authMiddleware");
// Create a new lost/found item
router.post("/", protect, createItem);
// Get all items
router.get("/", getAllItems);

// Get a single item by ID
router.get("/:id", getItemById);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);
module.exports = router;