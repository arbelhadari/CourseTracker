const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    CourseName: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        unique: true,
    },
    ProfessorID: {
        type: String,
        require: true
    },
    Semester: {
        type: String,
        require: true,
        enum: ['a', 'b']
    },
    Year: {
        type: String,
        require: true,
    },
    GradeSheet: {
        type: Map,
        of: Number,
        require: false,
        default: new Map()
    },
    CourseDetails: {
        type: String,
        min: 0,
        max: 1000,
    }
}, {timestamps: true}
);


module.exports = mongoose.model("Courses", CourseSchema);