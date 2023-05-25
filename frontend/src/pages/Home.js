import { useEffect } from "react";
import { useCoursesContext } from "../hooks/useCoursesContext";

// components
import CourseDetails from "../components/CourseDetails";
import CourseForm from "../components/CourseForm";

const Home = () => {
    const {courses, dispatch} = useCoursesContext()

    useEffect(() => {
        const fetchCourses = async () => {
            // TODO: in production - need to change the fetch path to specific full path
            const response = await fetch("/api/courses");
            const json = await response.json();

            if (response.ok) 
                dispatch({type: 'SET_COURSES', payload: json});
        }

        fetchCourses();
    }, []);

    return (
        <div className="home">
            <div className="courses">
                {courses && courses.map((course) => (
                    <CourseDetails key={course._id} course={course} />
                ))}
            </div>
            <CourseForm />
        </div>
    )
};

export default Home;