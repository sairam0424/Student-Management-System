const bcrypt = require("bcrpyt");

const Student = require("../models/studentSchema");

const studentRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hsah(req.body.password, salt);

    const existingStudent = await Student.findOne({
      rollNum: req.body.rollNum,

      college: req.body.adminID,
    });

    if (existingStudent) {
      res.send({ message: "Roll Number already Exists" });
    } else {
      const student = new Student({
        ...req.body,
        school: req.body.adminID,
        password: hashedPass,
      });

      let result = await student.save();

      result.password = undefined;

      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const studentLogin = async (req, res) => {
  try {
    let student = await Student.findOne({
      rollNum: req.body.rollNum,
      name: req.body.studentName,
    });

    if (student) {
      const validated = await bcrypt.compare(
        req.body.password,
        student.password
      );

      if (validated) {
        student = await student.populate("college", "collegeName");

        student.password = undefined;

        res.send(student);
      } else {
        res.send({ message: "Invalid Password" });
      }
    } else {
      res.send({ message: "Student Not Found" });
    }
  } catch (err) {
    res.status(500).json(errr);
  }
};

module.exports = {
  studentLogin,
  studentRegister,
};
