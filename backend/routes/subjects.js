const express = require("express");
const router = express.Router();

// Create a new subject
router.post("/", (req, res) => {
  res.json({ mssg: "POST a new subject" });
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
