import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  attendance: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  image: {
    type: String,
  },
});

mongoose.model("Student", StudentSchema);
