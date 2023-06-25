import React, { useEffect, useState } from 'react';
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
        const students_res = await fetch(`/api/students/${courseId}`, {
          headers: {'Authorization' : `Bearer ${user.token}`}
        });
        const course_res = await fetch(`/api/courses/${courseId}`, {
          headers: {'Authorization' : `Bearer ${user.token}`}
        });
        const json_students = await students_res.json();
        const json_course = await course_res.json();
        setStudents(json_students);
        setCourse(json_course);
      } 
      catch (error) {
        console.error('Error fetching students:', error);
      }};
    fetchStudents();
  }, [courseId, students, user]);

  return (
    <div>
      <table className="grade-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Grade</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.StudentId}>
              <td>{student.StudentId}</td>
              <td>{new Date(student.StudentDOB).toLocaleDateString('en-GB')}</td>
              <td>{student.Gender}</td>
              <td>{course && course.GradeSheet[student.StudentId]}</td>
              <td><span className="material-symbols-outlined">edit</span></td>
              <td><span className="material-symbols-outlined">delete</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeSheetTable;
