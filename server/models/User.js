const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    college: {
      type: String,
      default: "",
    },

    // ✅ NEW
    phone: {
      type: String,
      default: "",
    },

    // ✅ NEW
    course: {
      type: String,
      default: "",
    },

    // ✅ NEW
    bio: {
      type: String,
      default: "",
      maxlength: 250,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);