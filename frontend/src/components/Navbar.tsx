import './navbar.css'; // Import the CSS file for Navbar styles
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";
import { useSidebarContext } from '../context/SidebarContext';


const Navbar= () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const { isSidebarOpen } = useSidebarContext();


    const handleClick = () => {
        logout();
    };

    if (!isSidebarOpen) {
        return null; // Hide the Navbar if isSidebarOpen is false
    }

    return (
        <div className={"sidebar"}>

            {/* Logo */}
            <h1 className="display-6 fw-bold">FitTrack</h1>
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
    );
};

export default Navbar;
