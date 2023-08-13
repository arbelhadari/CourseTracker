const express = require('express');
const router = express.Router();
const { getStudents } = require("../controllers/CourseController");
const { GetOneStudent } = require('../controllers/StudentController');
 const requireAuth = require('../middleware/requireAuth');

 router.use(requireAuth);
 
 router.get("/:id/studentid", GetOneStudent);

router.get("/:id", getStudents);


module.exports = router;