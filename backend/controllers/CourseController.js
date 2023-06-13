const Courses = require("../models/CourseModel");
const Students = require("../models/StudentModel");
const mongoose = require('mongoose');


// get all user's courses


// get all students in a course
async function getStudentsFromGradeSheet(id) {
    try {
      const course = await Courses.findById({_id: id});
      if (!course) return [];
      
      // Get the student IDs from the GradeSheet map
      const studentIds = [...(Object.keys(course.GradeSheet))];
  
      // Find the students with matching IDs
      const students = await Students.find({ _id: { $in: studentIds } });
      return students;
    } 
    catch (err) {
      return [];
    }
  }


// get all courses
const getAllCourses = async (req, res) => {
    const ProfessorID = req.user._id
    const courses = await Courses.find({ProfessorID}).sort({createdAt: -1});
    res.status(200).json(courses);
};


// get a single course
const getCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "bad id"});
    }
    
    const course = await Courses.findOne({_id: id});
    if (!course) 
        return res.status(404).json({error: "No such course."});
    
    res.status(200).json(course);
};


// create new course
const createCourse = async (req, res) => {
    // TODO: check if GradeSheet is needed here
    const {CourseName, Semester, Year, GradeSheet, CourseDetails} = req.body;
    try {
        const ProfessorID = req.user._id
        const course = await Courses.create({
            CourseName, ProfessorID, Semester, Year, GradeSheet, CourseDetails
        });
        res.status(200).json(course);
    } catch (err) {
        res.status(400).json({err: err.message});
    }
};


// delete course
const deleteCourse = async (req, res) => {
    // TODO: decrement CourseCount for each student in this course
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "bad id"});
    }

    const course = await Courses.findOneAndDelete({_id: id});
    if (!course) 
        return res.status(404).json({error: "No such course."});

    res.status(200).json(course);
};


// update course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "bad id"});
    }

    const course = await Courses.findOneAndUpdate({_id: id}, {...req.body});
    if (!course) 
        return res.status(404).json({error: "No such course."});
    
    res.status(200).json(course);
};


module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    deleteCourse,
    updateCourse
};