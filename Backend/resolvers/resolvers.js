/* This code snippet is a set of resolvers for a GraphQL schema. It includes queries and mutations to
interact with a MongoDB database using Mongoose for object modeling, bcrypt for password hashing,
and jsonwebtoken for generating authentication tokens. */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
const User = mongoose.model("User");
const Student = mongoose.model("Student");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    students: async () => await Student.find({}),
    student: async (_, { _id }) => await Student.findById(_id),
  },

  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },

    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User doesn't exist with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("Email or password is invalid");
      }
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET
      );
      return { token, role: user.role };
    },

    // Student Mutations
    addStudent: async (_, { studentNew }) => {
      const student = new Student({
        ...studentNew,
      });
      return await student.save();
    },

    updateStudent: async (_, { _id, studentUpdate }) => {
      const student = await Student.findByIdAndUpdate(_id, studentUpdate, {
        new: true,
        runValidators: true,
      });
      if (!student) {
        throw new Error("Student not found");
      }
      return student;
    },

    deleteStudent: async (_, { _id }) => {
      const student = await Student.findByIdAndDelete(_id);
      if (!student) {
        throw new Error("Student not found");
      }
      return "Student deleted successfully";
    },
  },
};

export default resolvers;
