const express = require("express");
const router = express.Router();
const Subject = require("../models/subjectModels");

// Create a new subject
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const createdAt = new Date();
  try {
    const subject = await Subject.create({ title, description, createdAt });
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all subjects
router.get("/", (req, res) => {
  res.json({ mssg: "GET all subjects" });
});

// Get a single subject
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single subject" });
});

// Update a subject
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a subject" });
});

// Delete a subject
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a subject" });
});

module.exports = router;
