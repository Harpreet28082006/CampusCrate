const dns = require("dns");

// Fix DNS resolution for MongoDB Atlas
dns.setServers(["8.8.8.8", "8.8.4.4"]);




const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CampusCrate Backend is Running 🚀");
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});