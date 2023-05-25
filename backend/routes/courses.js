const express = require('express');
const router = express.Router();
const { 
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
 } = require("../controllers/CourseController");

 const {
    addStudent,
    updateStudent,
    removeStudent
 } = require("../controllers/StudentController");


// GET all courses
router.get("/", getAllCourses);


// GET a single course
router.get("/:id", getCourse);


// POST a new course
router.post("/", createCourse);


// DELETE a course
router.delete("/:id", deleteCourse);


// UPDATE a course
router.patch("/:id", updateCourse);


// add student to course
router.post("/:id", addStudent);


// remove student from course
router.put("/:id", removeStudent);


// change student's grade
router.patch("/:id/:Student", updateStudent);

module.exports = router;