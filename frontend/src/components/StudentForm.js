import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useStudentsContext } from "../hooks/useStudentsContext";
import { useAuthContext } from "../hooks/useAuthContext";


const StudentForm = () => {
    const { dispatch } = useStudentsContext();
    const { user } = useAuthContext();

    const { courseId } = useParams();
    const [StudentId, setStudentId] = useState("");
    const [StudentDOB, setStudentDOB] = useState("");
    const [Gender, setGender] = useState("");
    const [Grade, setGrade] = useState("");
    const [Error, setError] = useState(null);
    const [studentExists, setStudentExists] = useState(false);


    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      const formattedValue = inputValue.slice(0, 9);
    
      setStudentId(formattedValue);
      setError(null);
      setStudentExists(false);
      if (formattedValue.length === 9) {
        fetch(`/api/students/${formattedValue}/studentid`, {
                method: "GET",
                headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${user.token}`}
            })
                .then((response) => response.json())
                .then((data) => {
                  setStudentExists(data.exist);
                  setStudentDOB(data.StudentDOB.split("T")[0]);
                  setGender(data.Gender);
                  setError(null);
                })
                .catch((error) => {
                  console.error("Error checking student existence:", error);
                  setStudentExists(false);
                  setStudentDOB("");
                  setGender("");
                });
      }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!user) {
          setError('you must be logged in');
          return;
        }

        const student = {StudentId, StudentDOB, Gender, Grade};
        const response = await fetch(`/api/courses/${courseId}`, {
            method: "POST",
            body: JSON.stringify(student),
            headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${user.token}`}
        });
        const json = await response.json();
        if (!response.ok) 
            setError(json.error);
        else {
            setStudentId("")
            setStudentDOB("");
            setGender("");
            setGrade("");
            setError(null);
            dispatch({type: "CREATE_STUDENT", payload: json});
            window.location.reload();
        }

    };

    return (
          <form className="student_form" onSubmit={handleSubmit}>
            <h2>Add Student</h2>
            <label htmlFor="studentId">Student ID:</label>
            <input
              type="text"
              value={StudentId}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={StudentDOB}
              onChange={(e) => setStudentDOB(e.target.value)}
              pattern="\d{2}/\m{2}/\d{4}"
              placeholder="DD/MM/YYYY"
              required
              min="1920-01-01"
              max={new Date().toISOString().split("T")[0]}
              disabled={studentExists}

            />
              <label>Gender:</label>
              <div className="gender">
                <label htmlFor="male">
                  <input
                    type="radio"
                    value="M"
                    checked={Gender === "M"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={studentExists}

                  />
                  Male
                </label>
                <label htmlFor="female">
                  <input
                    type="radio"
                    value="F"
                    checked={Gender === "F"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={studentExists}

                  />
                  Female
                </label>
              </div>
            <div>
              <label htmlFor="grade">Grade: <span className="spanForm"> {Grade}</span></label>
              <input
                type="range"
                id="grade"
                value={Grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                min="0"
                max="100"
                required
              />
            </div>
            <button type="submit">Submit</button>
            
            {studentExists && (
              <div className="error-box">
                <p id="errorMessage">Student already exists in the database. Enter grade only</p>
              </div>)}
         {Error && <div className="error">{Error}</div>}
          </form>
      );
};

export default StudentForm;