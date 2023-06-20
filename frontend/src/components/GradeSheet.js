import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const GradeSheetTable = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState(null);
  const {user} = useAuthContext()

  useEffect(() => {
    
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/students/${courseId}`, {
          headers: {
              'Authorization' : `Bearer ${user.token}`
          }
      });

      const course_res = await fetch(`/api/courses/${courseId}`, {
        headers: {
            'Authorization' : `Bearer ${user.token}`
        }
    })
        const json = await response.json();
        const json_course = await course_res.json();
        setStudents(json);
        setCourse(json_course);
        console.log(students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
      
    };

    fetchStudents();

  }, [courseId, students, user]);
  
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>DOB</th>
          <th>Gender</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {
        students.map((student) => (
          <tr key={student.StudentId}>
            <td>{student.StudentId}</td>
            <td>{new Date(student.StudentDOB).toLocaleDateString('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
}).replace(/\//g, '\\')}</td>
            <td>{student.Gender}</td>
            <td>{course.GradeSheet[student.StudentId]}</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
};

export default GradeSheetTable;


// const GradeSheetTable = async ({ gradeSheet }) => {
//     const { courseId } = useParams();
//     const students = await fetch(`/api/courses/${courseId}`);
//     console.log(students);
// //    const {students, dispatch} = useCoursesContext()
//     // const {user} = useAuthContext()
//     // useEffect(() => {
//     //     const fetchCourses = async () => {
//     //         // TODO: in production - need to change the fetch path to specific full path

//     //         const response = await fetch("/api/courses/students", {
//     //             headers: {
//     //                 'Authorization' : `Bearer ${user.token}`
//     //             }
//     //         });
//     //         const json = await response.json();

//     //         if (response.ok) 
//     //             dispatch({type: 'SET_COURSES', payload: json});
//     //     }
//     //     if (user){
//     //         fetchCourses();
//     //     }
//     // }, [dispatch, user]);
//     // console.log(students);
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>StudentID</th>
//             <th>StudentDOB</th>
//             <th>Gender</th>
//             <th>Grade</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {students.map((studentID) => {
//             const { student } = ;
  
//             return (
//               <tr key={studentID}>
//                 <td>{studentID}</td>
//                 <td>{student.StudentDOB}</td>
//                 <td>{student.Gender}</td>
//               </tr>
//             );
//           })} */}
//         </tbody>
//       </table>
//     );
//   };
  
//   export default GradeSheetTable;
