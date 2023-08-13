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
      <div className="course-page-container">

            <div className="course-page-header">
                <center className="course-header name">{course.CourseName}</center>
                <center className="course-header date">{course.Year} {course.Semester.toUpperCase()}</center>
                <h3 className="course-header details"><strong>Course Details: </strong>{course.CourseDetails}</h3>
            </div>

            <div className="grade-sheet-and-form-container">
                <div className="grade-sheet-table">
                    <GradeSheetTable/>
                </div>
                
                <StudentForm/>
            </div>

            <div className="grade-hist-container">
                <center className="grade-hist-title">Grades Frequency Distribution</center>

                <div className="grade-hist-inner-container">
                    <Histogram studentsData={categorizeStudentsByGrade(studentsData)}/>
                </div>
                
            </div>

            <div className="students-stats-container">
                <div className="pie-chart-container">
                    <p className="pie-chart-title">Ages</p>

                    <div className="pie-chart-container">
                        <Distribution studentsData={categorizeStudentsByAge(studentsData)}/>
                    </div>
                    
                </div>

                <div className="pie-chart-container">
                    <p className="pie-chart-title">Genders</p>

                    <div className="pie-chart-container">
                        <Distribution studentsData={categorizeStudentsByGender(studentsData)}/>
                    </div>
                </div>
            </div>

            <div className="grades-stats-container">
                <div className="grades-stat">
                    <p className="stat">{getMinGrade(studentsData)}</p>
                    <p className="stat-title">Lowest Grade</p>
                </div>

                <div className="grades-stat">
                    <p className="stat">{getAverageGrade(studentsData)}</p>
                    <p className="stat-title">Average Grade</p>
                </div>

                <div className="grades-stat">
                    <p className="stat">{getMaxGrade(studentsData)}</p>
                    <p className="stat-title">Highest Grade</p>
                </div>
            </div>
        </div>
      )
}

export default Course;