// TODO: this is just a copy of CourseContext with the names changed! need to check what to do here

import { createContext, useReducer } from 'react';

export const StudentContext = createContext();

export const StudentsReducer = (state, action) => {
    switch (action.type) {
        case "SET_STUDENTS":
            return { students: action.payload };
        case "CREATE_STUDENT":
            return { students: [action.payload, ...state.students] };
        case "DELETE_STUDENT":
            // TODO: probably won't work for delete student...
            return  { students: state.students.filter((w) => w._id !== action.payload._id) } 
        default: 
            return state
    }
}

export const StudentContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(StudentsReducer, {students: []});

    return (
        <StudentContext.Provider value={{...state, dispatch}}>
            {children}
        </StudentContext.Provider>
    )
}
