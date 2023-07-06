import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import GradeSheetTable from '../components/GradeSheet';
import StudentForm from '../components/StudentForm';
import Histogram from '../components/GradeHistogram';


const Course = () => {
    const { courseId } = useParams();
    const { user } = useAuthContext()

    const [ course, setCourse ] = useState(null);
    const [ students, setStudents ] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
          if (user && user.token){
            const response = await fetch(`/api/courses/${courseId}`, {
              headers: { 'Authorization': `Bearer ${user.token}` }
          });
            const json = await response.json();
            setCourse(json);
          }
        };
        fetchCourse();
    }, [courseId, user]);

    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const res = await fetch(`/api/students/${courseId}`, {
            headers: {'Authorization' : `Bearer ${user.token}`}
          });
          const json = await res.json();
          setStudents(json);
        } 
        catch (error) {
          console.error('Error fetching students:', error);
        }};
      fetchStudents();
    }, [user, courseId]);

    console.log(students)
    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
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
        </div>
        </div>
        <div className='container add-student box'>
          <StudentForm/>
        </div>
        </div>
        <div className='container statistics box'>
          <Histogram/>
        </div>
      </div>
      )
}

export default Course;