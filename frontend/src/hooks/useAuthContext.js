import { AuthContext } from "../context/UserContext";
import { useContext } from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) 
        throw Error("useAuthContext must be used inside an UserContextProvider.");
    
    return context;
};
