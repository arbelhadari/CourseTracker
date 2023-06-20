import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GradeSheetTable = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/courses/students/${courseId}`);
        console.log(response);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();

  }, [courseId]);
  
  return (
    <table>
      <thead>
        <tr>
          <th>StudentID</th>
          <th>StudentDOB</th>
          <th>Gender</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {
        // students.map((student) => (
        //   <tr key={student.StudentId}>
        //     <td>{student.StudentId}</td>
        //     <td>{student.StudentDOB}</td>
        //     <td>{student.Gender}</td>
        //     <td>{student.Grade}</td> {/* Assuming the Grade is available in the student object */}
        //   </tr>
        // ))
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
