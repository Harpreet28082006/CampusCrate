const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
} = require("../controllers/itemController");

router.post("/", createItem);
router.get("/", getAllItems);

module.exports = router;