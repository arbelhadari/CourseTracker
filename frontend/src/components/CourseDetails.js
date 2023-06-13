import { useCoursesContext } from "../hooks/useCoursesContext";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";


const CourseDetails = ({course}) => {
    const { dispatch } = useCoursesContext()
    const {user} = useAuthContext()
    const handleClick = async () => {
        if (!user){
            return
        }
        const response = await fetch('/api/courses/' + course._id, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user.token}`
            }
    })
    const json = await response.json()
    if (response.ok) {
        dispatch({type: 'DELETE_COURSE', payload: json})
    }
}
    return (
        <div className="course-details">
            <Link className="course-details-link" to={`/course/${course._id}`}>
            <h4>{course.CourseName}</h4>
            </Link>
            <p><strong>{course.Year} semester: {course.Semester}</strong></p>
            <p>Number of Students: {Object.keys(course.GradeSheet).length}</p>
            <br/>
            <p><strong>Details: </strong></p>
            <p>{course.CourseDetails}</p>
            <span className= "material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
};

export default CourseDetails;