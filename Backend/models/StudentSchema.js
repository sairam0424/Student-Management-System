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
      unique: true, // Ensures email is unique
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
      type: String, // URL or base64 string for image
    },
  });

  mongoose.model("Student", StudentSchema);