/* This code snippet is defining a Mongoose schema for a user in a MongoDB database. Here's a breakdown
of what each part is doing: */
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "admin",
  },
});

mongoose.model("User", UserSchema);
