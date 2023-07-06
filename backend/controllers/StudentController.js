const Courses = require("../models/CourseModel");
const Students = require("../models/StudentModel");
const mongoose = require('mongoose');


const GetOneStudent = async (req, res) => {
    const student = await getStudent(req.params['id']);
    if (!student) {
        return res.status(404).json({exist: false})
    }
    res.status(200).json({exist: true, Gender: student.Gender, StudentDOB: student.StudentDOB})
}


async function getStudent(StudentId){
    try {
        const student = await Students.findOne({StudentId: StudentId});
        if (!student) {
            console.log("cannot find student");
            return false;
        }
        return student;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}


async function createStudent(StudentData){
    const { StudentId, StudentDOB, Gender } = StudentData;
    try {
        return await Students.create({StudentId, StudentDOB, Gender});
    } catch (err) {
        console.log(err);
        return -1;
    }
}

async function deleteStudent(StudentData){
    try{
        const deleted = await Students.findOneAndDelete({StudentId: StudentData.StudentId});
        console.log(8);
        return deleted;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

async function incrementCourseCount(studentId)
{
    try {
        return await Students.findOneAndUpdate({StudentId: studentId}, {$inc: {CourseCount: 1}}, {new:true});
    }
    catch (err) {
        return -1;
    }
}

async function decrementCourseCount(studentId)
{
    try {
        const student = await Students.findOneAndUpdate({StudentId: studentId},{$inc: {CourseCount: -1}}, {new:true} );
        console.log(6);
        if (student.CourseCount == 0){
            console.log(7);
            const res = await deleteStudent(student);
            console.log(9);
            if (res === -1)
                return -1;
        }
        await student.save();
        return student
    } catch (err) {
        return -1;
    }
}

const addStudent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "bad id"});
        }

        let course = await Courses.findById({_id: id});
        if (!course) {
            return res.status(500).send({mssg: "Courses not found"});
        }

        let student = await Students.findOne({StudentId: req.body.StudentId});
        if (!student) {
            student = await createStudent(req.body);
            if (student == -1) {
                return res.status(500).send({mssg: "Can't create student"});
            }
        }
        else {
            if (course.GradeSheet.has(req.body.StudentId)) {
                return res.status(400).send({error: "Student's ID already exists in this course."})
            }
            else {
                incrementCourseCount(req.body.StudentId);
            }
        }
        console.log(course.GradeSheet);
        course.GradeSheet.set(req.body.StudentId, req.body.Grade);
        console.log(course.GradeSheet);
        try {
            await course.save();
            res.status(200).json(student);
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(501).json(err);
    }
}


const removeStudent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "bad id"});
        }
        console.log(req.body.StudentId)
        let course = await Courses.findById({_id: id});
        if (!course) {
            return res.status(500).send({mssg: "Courses not found"});
        }

        if (course.GradeSheet.has(req.body.StudentId)) {
            course.GradeSheet.delete(req.body.StudentId); 
            await course.save();

            let student = await Students.findOne({StudentId: req.body.StudentId});

            if (!student) {
                return res.status(404).json({error: "Student not found in DB"});
            }

            await decrementCourseCount(req.body.StudentId);
            return res.status(200).json(course);
        }
        else {
            return res.status(404).json({error: "Student not found in course"});
        }
    } catch (err) {
        return res.status(501).json(err);
    }
}


const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "bad id"});
        }

        let course = await Courses.findById({_id: id});
        if (!course) {
            return res.status(500).send({mssg: "Courses not found"});
        }

        if (course.GradeSheet.has(req.body.studentId)) {
            course.GradeSheet.set(req.body.studentId, req.body.newGrade);
            await course.save();
            return res.status(200).json(course[0]);
        }
        else {
            return res.status(404).json({error: "Student not found in course"});
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}


module.exports = {
    GetOneStudent,
    addStudent,
    removeStudent,
    updateStudent
}