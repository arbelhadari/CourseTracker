// TODO: this is just a copy of useCoursesContext with the names changed!

import { StudentContext } from "../context/StudentContext";
import { useContext } from 'react';

export const useStudentsContext = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw Error("useStudentsContext must be used inside an StudentsContextProvider.");
    }
    return context;
}
