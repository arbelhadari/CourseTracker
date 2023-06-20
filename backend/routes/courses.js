const express = require('express');
const router = express.Router();
const {
    getStudents,
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
 } = require("../controllers/CourseController");
 const requireAuth = require('../middleware/requireAuth')

 const {
    addStudent,
    updateStudent,
    removeStudent
 } = require("../controllers/StudentController");
 const courseStudentsRouter = express.Router();

 router.use(requireAuth);

// GET all courses
router.get("/", getAllCourses);

// TODO: GET all student in course
courseStudentsRouter.get("/:id", getStudents);

// GET a single course
router.get("/:id", getCourse);


// POST a new course
router.post("/", createCourse);


// DELETE a course
router.delete("/:id", deleteCourse);


// UPDATE a course
router.patch("/:id", updateCourse);





// GET student
// router.get("/:id/:studentid", getStudent);


// add student to course
router.post("/:id", addStudent);


// remove student from course
router.put("/:id", removeStudent);


// change student's grade
router.patch("/:id/:Student", updateStudent);

router.use('/course/students', courseStudentsRouter);


module.exports = router;