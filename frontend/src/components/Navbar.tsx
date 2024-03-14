import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout }  = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Bud</h1>
                </Link>
                <nav>
                    {/* condition to check if we are logged in or out to outputa accordingly
                    If user is not null, then output logout and email, means logged in..*/}
                    {user && (
                        <div>
                            <span>{ user.email }</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {/* if we don't have a user*/}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar
