

const CourseDetails = ({course}) => {
    
    return (
        <div className="course-details">
            <h4>{course.CourseName}</h4>
            <p><strong>{course.Year} semester: {course.Semester}</strong></p>
            <p>Number of Students: {Object.keys(course.GradeSheet).length}</p>
            <br/>
            <p><strong>Details: </strong></p>
            <p>{course.CourseDetails}</p>
        </div>
    )
};

export default CourseDetails;