import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useStudentsContext } from "../hooks/useStudentsContext";
// import { useCoursesContext } from "../hooks/useCoursesContext";
import { useAuthContext } from "../hooks/useAuthContext";


const StudentForm = () => {
    // TODO: create StudentContext thingy
    const { dispatch } = useStudentsContext();
    // const { dispatch } = useCoursesContext();
    
    const { user } = useAuthContext();

    const { courseId } = useParams();
    const [StudentId, setStudentId] = useState("");
    const [StudentDOB, setStudentDOB] = useState("");
    const [Gender, setGender] = useState("");
    const [Grade, setGrade] = useState("");
    const [Error, setError] = useState(null)
    const [studentExists, setStudentExists] = useState(false);


    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      const formattedValue = inputValue.slice(0, 9); // Limit to 9 digits
    
      setStudentId(formattedValue);
      fetch(`/api/students/${formattedValue}`, {
        method: "PATCH",
        // headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` }
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setStudentExists(data.exists);
        })
        .catch((error) => {
          console.error("Error checking student existence:", error);
          setStudentExists(false); // Set to false in case of any error
        });
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
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` }
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
            dispatch({type: "CREATE_STUDENT", payload: json})
        }
    };

    return (
        <div className="student_form">
          <form className="student_form" onSubmit={handleSubmit}>
            <h2>Add a Student</h2>
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
              disabled={studentExists} // Disable if student exists

            />
              <label>Gender:</label>
              <div className="gender">
                <label htmlFor="male">
                  <input
                    type="radio"
                    value="M"
                    checked={Gender === "M"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={studentExists} // Disable if student exists

                  />
                  Male
                </label>
                <label htmlFor="female">
                  <input
                    type="radio"
                    value="F"
                    checked={Gender === "F"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={studentExists} // Disable if student exists

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
    <p>Student already exists in the database. Enter grade only</p>
)}
         {Error && <div className="error">{Error}</div>}
          </form>
        </div>
      );

    // return (
    //     <form className="create" onSubmit={handleSubmit}>
    //       <h3>Add a New Course</h3>
    //       <label htmlFor="course-name">Course Name: </label>
    //         <input
    //           type="text"
    //           id="course-name"
    //           value={CourseName}
    //           onChange={(e) => setCourseName(e.target.value)}
    //           required
    //         />

    //       <label htmlFor="year">Year: </label>
    //       <select
    //         id="year"
    //         value={Year}
    //         onChange={(e) => setYear(e.target.value)}
    //         required
    //       >
    //       <option value="" disabled>Select a Year: </option>
    //       {Array.from({ length: new Date().getFullYear() - 1979 }, (_, index) => (
    //         <option key={index} value={1980 + index}>{1980 + index}</option>
    //       ))}
    //       </select>

    //       <label>Semester:</label>
    //         <div className="semester-options">
    //           <label htmlFor="semester-a">
    //             <input
    //               className="radio"
    //               type="radio"
    //               id="semester-a"
    //               name="semester"
    //               value="a"
    //               checked={Semester === 'a'}
    //               onChange={(e) => setSemester(e.target.value)}
    //               required
    //             />a
    //           </label>

    //           <label htmlFor="semester-b">
    //             <input
    //               className="radio"
    //               type="radio"
    //               id="semester-b"
    //               name="semester"
    //               value="b"
    //               checked={Semester === 'b'}
    //               onChange={(e) => setSemester(e.target.value)}
    //               required
    //             />b
    //           </label>
    //         </div>

    //       <label htmlFor="course-details">Course Details:</label>
    //         <textarea
    //         id="course-details"
    //         value={CourseDetails}
    //         onChange={(e) => setCourseDetails(e.target.value)}
    //         ></textarea>

    //       <button type="submit">Add Course</button>
    //       {Error && <div className="error">{Error}</div>}
    //   </form>
// )
};

export default StudentForm;