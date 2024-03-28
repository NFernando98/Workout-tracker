import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            {/* Sidebar */}
            <div className="sidebar">
                <div className="container">
                    {/* Logo */}
                    <Link to="/">
                        <h1 className="display-6 fw-bold">FitTrack</h1>
                    </Link>
                    {/* Navigation */}
                    <nav>
                        {/* Condition to check if user is logged in */}
                        {user ? (
                            // If user is logged in, display email and logout button
                            <div className='email-logout'>
                                <span>{user.email}</span>
                                <button onClick={handleClick}>Log out</button>
                            </div>
                        ) : (
                            // If user is not logged in, display login and signup links
                            <div>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>


    );
};

export default Navbar