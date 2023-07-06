import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import GradeSheetTable from '../components/GradeSheet';
import StudentForm from '../components/StudentForm';


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
        <div>
        <div className='grade-student'>
        <div className='grade-sheet'>
        <div className='titles'>
        <div className='titles-headlines'>
        <h1 className="course-page-title">{course.CourseName}</h1>
        <h2>{course.Year} Semester: {course.Semester}</h2>
        </div>
        <h3>Course Details: {course.CourseDetails}</h3>
        </div>
        <div className="container grade-sheet-table box">
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
        </div>
        <div className='container add-student box'>
                    {/* here will be student form */}
          <StudentForm/>
        </div>
        </div>
        <div className='container statistics box'>
                    here will be statistics
        </div>
      </div>
      )
}

export default Course;