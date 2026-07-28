const Item = require("../models/Item");

// Create a new lost/found item
const createItem = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    const item = await Item.create({
      ...req.body,
      photoUrl: req.file ? req.file.path : "",
      postedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get all items
const getAllItems = async (req, res) => {
  try {
    const { search, type, category, location, status } = req.query;

    let filter = {};

    // Search by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by type
    if (type) {
      filter.type = type;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Filter by status
    if (status) {
      filter.status = status;
    }

    const items = await Item.find(filter).sort({ createdAt: -1 });

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
// Get single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update an item
const updateItem = async (req, res) => {
  try {
    // Find the item
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Check if logged-in user is the owner
    if (item.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this item",
      });
    }

    // Update item
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete an item
const deleteItem = async (req, res) => {
  try {
    // Find the item
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Check if logged-in user is the owner
    if (item.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this item",
      });
    }

    // Delete the item
    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({
      postedBy: req.user.id,
    }).sort({ createdAt: -1 });

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
  getMyItems,
  getItemById,
  updateItem,
  deleteItem,
};