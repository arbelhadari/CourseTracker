import { useAuthContext } from './useAuthContext';
import { useCoursesContext } from './useCoursesContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: coursesDispatch } = useCoursesContext();


  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    coursesDispatch({type: 'SET_COURSES', payload : null});
  }

  return {logout};
};
