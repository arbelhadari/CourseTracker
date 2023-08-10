import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
// import { useStudentsContext } from "../hooks/useStudentsContext";

const GradeSheetTable = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState(null);
  const { user } = useAuthContext();
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [updatedGrade, setUpdatedGrade] = useState('');
  const [showTextWindow, setShowTextWindow] = useState(false);

  // const { students, dispatch } = useStudentsContext();

  useEffect(() => {
    const fetchStudents = async () => {
      if (user && user.token){
      try {
        const students_res = await fetch(`/api/students/${courseId}`, {
          headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` }
        });
        const course_res = await fetch(`/api/courses/${courseId}`, {
          headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` }
        });
        const json_students = await students_res.json();
        const json_course = await course_res.json();
        setStudents(json_students);
        // dispatch({ type: 'SET_STUDENTS', payload: json_students });
        setCourse(json_course);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
  };
    fetchStudents();
  }, [courseId, user]);

  const handleEditClick = (studentId) => {
    setSelectedStudentId(studentId);
    setShowTextWindow(true);
    const tableRows = document.querySelectorAll('.grade-table tbody tr');
  tableRows.forEach(row => {
    if (row.dataset.studentId === studentId) {
      row.classList.add('edit-mode');
    } else {
      row.classList.remove('edit-mode');
    }
  });
  };

  const handleGradeUpdate = () => {
     // Perform any validation on the updatedGrade value (e.g., check if it's within the range 0-100)
     if (updatedGrade < 0 || updatedGrade > 100) {
      alert('Invalid grade. Please enter a grade between 0 and 100.');
      return; // Don't proceed with the update
    }
  
    // Update the gradesheet for the selected student in the course object
    const updatedCourse = { ...course };
    updatedCourse.GradeSheet[selectedStudentId] = updatedGrade;
    const newGrade = {newGrade: updatedGrade, studentId: selectedStudentId};
    fetch(`/api/courses/${courseId}/Student`, {
      method: "PATCH",
      body: JSON.stringify(newGrade),
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` }
  });
    // Update the course state with the updated gradesheet
    setCourse(updatedCourse);
    window.location.reload()

    // Clear the updated grade value and close the modal
    setUpdatedGrade('');
    setSelectedStudentId(null);
    setShowTextWindow(false);
  };

  const handleDeleteClick = async (studentId) => {
    try {
      const student = {StudentId: studentId};
      await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(student),
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` }
      });

      window.location.reload()
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

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
            <tr key={student.StudentId} data-student-id={student.StudentId}>
              <td>{student.StudentId}</td>
              <td>{new Date(student.StudentDOB).toLocaleDateString('en-GB')}</td>
              <td>{student.Gender}</td>
              <td>
                {selectedStudentId === student.StudentId && showTextWindow ? (
                  <input
                    type="number"
                    value={updatedGrade}
                    onChange={(e) => setUpdatedGrade(e.target.value)}
                    style={{ width: '40px' }}
                  />
                ) : (
                  course && course.GradeSheet[student.StudentId]
                )}
              </td>
              <td>
                {selectedStudentId === student.StudentId && showTextWindow ? (
                  <button 
                  className="update-button"
                  onClick={handleGradeUpdate}
                  >Update</button>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handleEditClick(student.StudentId)}
                  >
                    edit
                  </span>
                )}
              </td>
              <td>
                
                <span 
                className="material-symbols-outlined"
                onClick={() => handleDeleteClick(student.StudentId)}
                >
                Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeSheetTable;