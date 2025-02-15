const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },

    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User", // Reference to the User who created the subject
    //   required: true
    // },
    materials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Material" // Reference to uploaded study materials
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now // Automatically sets the timestamp
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

module.exports = mongoose.model("Subject", subjectSchema);
