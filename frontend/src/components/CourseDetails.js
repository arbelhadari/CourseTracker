import { useCoursesContext } from "../hooks/useCoursesContext";

const CourseDetails = ({course}) => {
    const { dispatch } = useCoursesContext()
    const handleClick = async () => {
        const response = await fetch('/api/courses/' + course._id, {
            method: 'DELETE'
    })
    const json = await response.json()
    if (response.ok) {
        dispatch({type: 'DELETE_COURSE', payload: json})
    }
}
    return (
        <div className="course-details">
            <h4>{course.CourseName}</h4>
            <p><strong>{course.Year} semester: {course.Semester}</strong></p>
            <p>Number of Students: {Object.keys(course.GradeSheet).length}</p>
            <br/>
            <p><strong>Details: </strong></p>
            <p>{course.CourseDetails}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
};

export default CourseDetails;