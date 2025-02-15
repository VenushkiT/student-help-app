const express = require("express");
const router = express.Router();
const Material = require("../models/materialModel");

// Create a new material
router.post("/", async (req, res) => {
  const { title, type, url, subjectId } = req.body;
  const createdAt = new Date();
  try {
    const material = await Material.create({ title, type, url, subjectId, createdAt });
    res.status(200).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all materials
router.get("/", (req, res) => {
  res.json({ mssg: "GET all materials" });
});

// Get a single material
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single material" });
});

// Update a material
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a material" });
});

// Delete a material
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a material" });
});

module.exports = router;
