const express = require("express");
const router = express.Router();
const upload = require("../uploads/uploads");
const {
  createMaterial,
  getMaterials,
  getMaterialsBySubject,
  getSingleMaterial,
  updateMaterial,
  deleteMaterial
} = require("../controllers/materialController");

// Create a new material
router.post("/subject/:subjectId", upload.single("file"), createMaterial);

// Get all materials
router.get("/", getMaterials);

// Get materials for a specific subject
router.get("/subject/:subjectId", getMaterialsBySubject);

// Get a single material
router.get("/:id", getSingleMaterial);

// Update a material
router.patch("/:id", updateMaterial);

// Delete a material
router.delete("/:id", deleteMaterial);

module.exports = router;
