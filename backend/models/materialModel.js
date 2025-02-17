const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["pdf", "video", "link", "note"],
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
