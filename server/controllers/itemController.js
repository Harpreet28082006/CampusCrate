const Item = require("../models/Item");

// Create a new lost/found item
const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createItem,
  getAllItems,
};