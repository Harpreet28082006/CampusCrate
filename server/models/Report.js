const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

   status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);