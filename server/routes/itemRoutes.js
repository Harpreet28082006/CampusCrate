const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  getItemById,
} = require("../controllers/itemController");

// Create a new lost/found item
router.post("/", createItem);

// Get all items
router.get("/", getAllItems);

// Get a single item by ID
router.get("/:id", getItemById);

module.exports = router;