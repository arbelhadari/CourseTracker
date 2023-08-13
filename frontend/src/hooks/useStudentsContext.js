import { StudentContext } from "../context/StudentContext";
import { useContext } from 'react';

export const useStudentsContext = () => {
    const context = useContext(StudentContext);
    if (!context) 
        throw Error("useStudentsContext must be used inside an StudentsContextProvider.");
    
    return context;
};
