const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    StudentId: {
      type: String,
      match: [/^\d{9}$/, 'Please enter a 9-digit number.'],
      required: true,
      unique: true
    },
    StudentDOB: {
        type: Date,
        require: true,
        validate: [
            {
              validator: function(v) {
                // calculate age from date of birth
                const ageInMilliseconds = Date.now() - v.getTime();
                const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
                const minAge = 0; // minimum age required
                return ageInYears >= minAge;
              },
              message: 'Invalid date of birth.'
            }
          ]
    },
    Gender: {
        type: String,
        require: true,
        enum: ['M', 'F']
    },
    CourseCount: {
      type: Number,
      default: 1
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);