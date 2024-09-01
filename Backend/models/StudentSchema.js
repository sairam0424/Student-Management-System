/* This code snippet is defining a Mongoose schema for a "Student" model in a Node.js application using
MongoDB as the database. Here's a breakdown of what each part of the code is doing: */
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
