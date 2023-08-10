import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import GradeSheetTable from '../components/GradeSheet';
import StudentForm from '../components/StudentForm';
import Histogram from '../components/GradeHistogram';
import AgeDistribution from '../components/AgeDistribution';


const Course = () => {
    const { courseId } = useParams();
    const { user } = useAuthContext()

    const [ course, setCourse ] = useState(null);
    const [ studentsData, setStudentsData ] = useState([]);



    useEffect(() => {
      const fetchCourse = async () => {
        if (user && user.token){
          const response = await fetch(`/api/courses/${courseId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
          const course = await response.json();
          setCourse(course);
        }
      };

        fetchCourse();
    }, [courseId, user]);

    useEffect(() => {
      const fetchStudents = async () => {
        try {
          if (course && course.GradeSheet) {
            const res = await fetch(`/api/students/${courseId}`, {
              headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const studentJson = await res.json();
            const modifiedStudents = Object.entries(studentJson).map(([studentId, data]) => {
              return {
                ...data,
                grade: course.GradeSheet[data.StudentId]
              };
            });
            setStudentsData(modifiedStudents);
          }
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
    
      fetchStudents();
    }, [course, courseId, user]);

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
                </div>
                <h2>{course.Year}{course.Semester}</h2>
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
            <Histogram studentsData={ studentsData }/>
          </div>
      </div>
      )
}

export default Course;