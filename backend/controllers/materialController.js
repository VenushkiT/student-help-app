const Material = require("../models/materialModel");
const Subject = require("../models/subjectModel");

const createMaterial = async (req, res) => {
  const { title, type } = req.body;
  const { subjectId } = req.params;

  // Check if all required fields are present
  if (!title || !type || !subjectId) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Ensure a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "File is required." });
  }

  const filePath = req.file.path;

  try {
    // Check if the subjectId exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(400).json({ error: "Invalid subject ID." });
    }

    const material = await Material.create({ title, type, filePath, subjectId });
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all materials
const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().populate("subjectId", "title");
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get materials for a specific subject
const getMaterialsBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const materials = await Material.find({ subjectId }).populate("subjectId", "title");
    if (!materials.length) {
      return res.status(404).json({ error: "No materials found for this subject." });
    }
    res.status(200).json(materials);
  } catch (error) {
    res.status(400).json({ error: "Invalid subject ID" });
  }
};

// Get a single material
const getSingleMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate("subjectId", "title");
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(400).json({ error: "Invalid material ID" });
  }
};

// Update a material
const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate("subjectId", "title");
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(400).json({ error: "Invalid update request" });
  }
};

// Delete a material
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid material ID" });
  }
};

module.exports = {
  createMaterial,
  getMaterials,
  getMaterialsBySubject,
  getSingleMaterial,
  updateMaterial,
  deleteMaterial
};
