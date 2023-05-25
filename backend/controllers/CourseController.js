const Courses = require("../models/CourseModel");


// get all courses
const getAllCourses = async (req, res) => {
    const courses = await Courses.find({}).sort({createdAt: -1});
    res.status(200).json(courses);
};


// get a single course
const getCourse = async (req, res) => {
    const { id } = req.params;
    
    // TODO: proper _id check
    
    const course = await Courses.findOne({_id: id});
    if (!course) 
        return res.status(404).json({error: "No such course."});
    
    res.status(200).json(course);
};


// create new course
const createCourse = async (req, res) => {
    // TODO: check if GradeSheet is needed here
    const {CourseName, ProfessorUsername, Semester, Year, GradeSheet, CourseDetails} = req.body;
    try {
        const course = await Courses.create({
            CourseName, ProfessorUsername, Semester, Year, GradeSheet, CourseDetails
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
    
    // TODO: proper _id check

    const course = await Courses.findOneAndDelete({_id: id});
    if (!course) 
        return res.status(404).json({error: "No such course."});

    res.status(200).json(course);
};


// update course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    
    // TODO: change to the proper check

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