import { useState } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";

const CourseForm = () => {

    const { dispatch } = useCoursesContext()
    const [CourseName, setCourseName] = useState("");
    const [Year, setYear] = useState("");
    const [Semester, setSemester] = useState("");
    const [CourseDetails, setCourseDetails] = useState("");
    const [Error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: figure out how to get the current username 
        const ProfessorUsername = "prof1"
        const course = {CourseName, Year, Semester, CourseDetails, ProfessorUsername};
        const response = await fetch('/api/courses', {
            method: "POST",
            body: JSON.stringify(course),
            headers: { "Content-Type": "application/json" }
        });
        const json = await response.json();
        if (!response.ok) 
            setError(json.error);
        else {
            setCourseName("")
            setYear("");
            setSemester("");
            setCourseDetails("");
            setError(null);
            // console.log("New Course Added", json);
            dispatch({type: "CREATE_COURSE", payload: json})
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add a New Course</h3>
          <label htmlFor="course-name">Course Name: </label>
            <input
              type="text"
              id="course-name"
              value={CourseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />

          <label htmlFor="year">Year: </label>
          <select
            id="year"
            value={Year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
          <option value="" disabled>Select a Year: </option>
          {Array.from({ length: new Date().getFullYear() - 1979 }, (_, index) => (
            <option key={index} value={1980 + index}>{1980 + index}</option>
          ))}
          </select>

          <label>Semester:</label>
            <div className="semester-options">
              <label htmlFor="semester-a">
                <input
                  className="radio"
                  type="radio"
                  id="semester-a"
                  name="semester"
                  value="a"
                  checked={Semester === 'a'}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                />a
              </label>

              <label htmlFor="semester-b">
                <input
                  className="radio"
                  type="radio"
                  id="semester-b"
                  name="semester"
                  value="b"
                  checked={Semester === 'b'}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                />b
              </label>
            </div>

          <label htmlFor="course-details">Course Details:</label>
            <textarea
            id="course-details"
            value={CourseDetails}
            onChange={(e) => setCourseDetails(e.target.value)}
            ></textarea>

          <button type="submit">Add Course</button>
          {Error && <div className="error">{Error}</div>}
      </form>
    )
};

export default CourseForm;