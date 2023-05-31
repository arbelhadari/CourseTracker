import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Course Tracker</h1>
                </Link>
                <nav>
                    {user && (
                    <div>
                        <span className='hello'>Hello, {user.email.split('@')[0]}  </span>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    )}
                    {!user &&
                    ( <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;