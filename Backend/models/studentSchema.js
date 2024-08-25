const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  roolno: {
    type: String,

    required: true,

    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
});

const model = mongoose.model("student", studentSchema);

module.exports = model;
