import { useAuthContext } from './useAuthContext'
import { useCoursesContext } from './useCoursesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: coursesDispatch } = useCoursesContext()


  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    coursesDispatch({type: 'SET_COURSES', payload : null})
  }

  return { logout }
}