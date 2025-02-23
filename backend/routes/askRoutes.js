const express = require("express");
const { askAI } = require("../controllers/askController");

const router = express.Router();

router.post("/", askAI);

module.exports = router;
