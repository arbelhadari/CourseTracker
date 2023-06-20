import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import GradeSheetTable from '../components/GradeSheet';


const Course = () => {
    const { courseId } = useParams();
    const [ course, setCourse ] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/api/courses/${courseId}`, {
              headers: {
                  'Authorization' : `Bearer ${user.token}`
              }
          });
            console.log(response);
            const json = await response.json();
            setCourse(json);
        }

        fetchCourse();
    }, [courseId, user]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pages">
          <h1 className="course-page-title">{course.CourseName}</h1>
          <h2>{course.Year} Semester: {course.Semester}</h2>
          <h3>Course Details: {course.CourseDetails}</h3>
          <GradeSheetTable/>
          {/* <h2>Grade Sheet:</h2>
          <ul>
            {course.GradeSheet && Object.entries(course.GradeSheet).map(([student, grade]) => (
              <li key={student}>
                {student}: {grade}
              </li>
            ))}
          </ul> */}
        </div>
      )
}

export default Course;