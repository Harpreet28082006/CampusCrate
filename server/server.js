const dns = require("dns");

// Fix DNS resolution for MongoDB Atlas
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 CampusCrate Backend is Running");
});

// Item Routes
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});