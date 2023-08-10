import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import GradeSheetTable from '../components/GradeSheet';
import StudentForm from '../components/StudentForm';
import Histogram from '../components/GradeHistogram';
import Distribution from '../components/Distribution';
import { 
  categorizeStudentsByAge, 
  categorizeStudentsByGender,
  categorizeStudentsByGrade,
  getAverageGrade,
  getMinGrade,
  getMaxGrade 
} from '../utils';


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
            <div className='titles-headlines'>
                  <h1 className="course-page-title" style={{height: "1vh", fontSize:"xxx-large"}}>
                    {course.CourseName}
                  </h1>
                  <h3>{course.Year} {course.Semester.toUpperCase()}</h3>
              </div>
          <div className='grade-student'>
            <div className='grade-sheet'>
              <div className='titles'>

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
          <div className='hist-container'>
          <p className='title'>Grades Distribution</p>
            <Histogram studentsData={ categorizeStudentsByGrade(studentsData) }/>
          </div>
          <div className='dist-container'>
            <div className='inner-dist'>
              <p className='title'>Age</p>
              <Distribution studentsData={ categorizeStudentsByAge(studentsData) }/>
            </div>
            <div className='inner-dist'>
              <p className='title'>Gender</p>
              <Distribution studentsData={ categorizeStudentsByGender(studentsData) }/>
            </div>
          </div>
          
          <div className="number-stats-container">
          <div className='num-stat'>
              <p className='num'>{getMinGrade(studentsData)}</p>
              <p className='num-title'>Lowest Grade</p>
            </div>
            <div className='num-stat'>
              <p className='num'>{getAverageGrade(studentsData)}</p>
              <p className='num-title'>Average Grade</p>
            </div>
            <div className='num-stat'>
              <p className='num'>{getMaxGrade(studentsData)}</p>
              <p className='num-title'>Highest Grade</p>
            </div>
          </div>
      </div>
      )
}

export default Course;