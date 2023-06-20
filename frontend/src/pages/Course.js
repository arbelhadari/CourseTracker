import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Course = () => {
    const { courseId } = useParams();
    const [ course, setCourse ] = useState(null);
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/api/courses/${courseId}`, {
              headers: {
                  'Authorization' : `Bearer ${user.token}`
              }
          });
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
          <h1 className="course-page-title">Course Page</h1>
          <h2>Course ID: {courseId}</h2>
          <h2>Course Name: {course.CourseName}</h2>
          <h2>Professor: {course.ProfessorUsername}</h2>
          <h2>Semester: {course.Semester}</h2>
          <h2>Year: {course.Year}</h2>
          <h2>Grade Sheet:</h2>
          <ul>
            {course.GradeSheet && Object.entries(course.GradeSheet).map(([student, grade]) => (
              <li key={student}>
                {student}: {grade}
              </li>
            ))}
          </ul>
          {/* <h2>Grade Sheet:</h2>
          <ul>
            {Object.entries(course.GradeSheet).map(([student, grade]) => (
              <li key={student}>
                {student}: {grade}
              </li>
            ))}
          </ul> */}
          <h2>Course Details: {course.CourseDetails}</h2>
        </div>
      )
}

export default Course;