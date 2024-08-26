const router = require("express").Router();

const {
  adminRegister,
  adminLogin,
} = require("../controllers/admin-controllers");
const {
  studentRegister,
  studentLogin,
} = require("../controllers/student-controller.js");
const {
  teacherRegister,
  teacherLogIn,
} = require("../controllers/teacher-controller.js");


router.post("/AdminReg", adminRegister);
router.post("/AdminLogin", adminLogin);

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogin);

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn);

module.exports=router