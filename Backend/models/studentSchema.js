const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollno: {
    type: Number,

    required: true,
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
  role: {
    type: String,
    default: "Student",
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
});

const model = mongoose.model("student", studentSchema);

module.exports = model;
