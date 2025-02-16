const Subject = require("../models/subjectModel");
const mongoose = require("mongoose");

//create a new subject
const createSubject = async (req, res) => {
  const { title, description } = req.body;
  const createdAt = new Date();

  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!description) emptyFields.push("description");
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: `Please provide ${emptyFields.join(", ")}`, emptyFields });
  }

  //creating a doc in db
  try {
    const subject = await Subject.create({ title, description, createdAt });
    res.status(201).json(subject);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Invalid input data" });
    }
    console.error("Error creating subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({}).sort({ createdAt: -1 });
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get a single subject
const getSingleSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid subject ID" });
    }
    console.error("Error fetching subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete a subject
const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findOneAndDelete({ _id: id });
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid subject ID" });
    }
    console.error("Error deleting subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a subject
const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true, runValidators: true } // Ensures updated document is returned and validation is applied
    );

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid subject ID" });
    }
    console.error("Error updating subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createSubject, getSubjects, getSingleSubject, deleteSubject, updateSubject };
