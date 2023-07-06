const express = require('express');
const router = express.Router();
const { getStudents } = require("../controllers/CourseController");
const { GetOneStudent } = require('../controllers/StudentController')
 const requireAuth = require('../middleware/requireAuth');

 router.use(requireAuth);

router.get("/:id", getStudents);

router.patch("/:id", GetOneStudent);

module.exports = router;