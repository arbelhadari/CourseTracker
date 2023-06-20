const express = require('express');
const router = express.Router();
const { getStudents } = require("../controllers/CourseController");
 const requireAuth = require('../middleware/requireAuth');

 router.use(requireAuth);

router.get("/:id", getStudents);

module.exports = router;