const express = require("express");
const router = express.Router();
const Subject = require("../models/subjectModel");
const {
  createSubject,
  getSubjects,
  getSingleSubject,
  deleteSubject,
  updateSubject
} = require("../controllers/subjectController");

// Create a new subject
router.post("/", createSubject);

// Get all subjects
router.get("/", getSubjects);

// Get a single subject
router.get("/:id", getSingleSubject);

// Update a subject
router.patch("/:id", updateSubject);

// Delete a subject
router.delete("/:id", deleteSubject);

module.exports = router;
