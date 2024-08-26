const bcrypt = require("bcryptjs");

const Admin = require("../models/adminSchema");

const Student = require("../models/studentSchema");

const Teacher = require("../models/teacherSchema");

const adminRegister = async (req, res) => {
  try {
    const admin = new Admin({
      ...req.body,
    });

    const existingAdminByEmail = await Admin.findOne({ email: req.body.email });

    const existingCollege = await Admin.findOne({
      componyName: req.body.collegeName,
    });

    if (existingAdminByEmail) {
      res.send({ message: "Email Already exists" });
    } else if (existingCollege) {
      res.send({ message: "College name already" });
    } else {
      let result = await admin.save();

      result.password = undefined;
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const adminLogin = async (req, res) => {
  if (req.body.email && req.body.password) {
    let admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
      if (req.body.password === admin.password) {
        admin.password = undefined;

        res.send(admin);
      } else {
        res.send({ message: "Invalid Password" });
      }
    } else {
      res.send({ message: "User not Found" });
    }
  } else {
    res.send({ message: "Email and password are required" });
  }
};


module.exports = {adminRegister,adminLogin}