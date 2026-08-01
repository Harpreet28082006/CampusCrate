const Report = require("../models/Report");
const Item = require("../models/Item");

// Create a report
const createReport = async (req, res) => {
  try {
    const { itemId, reason } = req.body;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Prevent reporting your own item
    if (item.postedBy.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot report your own item",
      });
    }

    // Prevent duplicate report
    const existingReport = await Report.findOne({
      itemId,
      reportedBy: req.user.id,
    });

    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: "You have already reported this item",
      });
    }

    const report = await Report.create({
      itemId,
      reportedBy: req.user.id,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all reports (Admin)

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("itemId", "title type status")
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReport,
  getAllReports,
};