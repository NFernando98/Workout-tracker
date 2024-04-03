import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';


const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const [closeMenu, setCloseMenu] = useState(false);      //used for extending/collapsing the sidebar
    const [showLogout, setShowLogout] = useState(false);    //used to display the logout button

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    }

    const handleProfileClick = () => {
        setShowLogout(!showLogout);
    }
    
    const handleLogout = () => {
        logout();
    };

    return (    
        <div className={closeMenu ? "sidebar active" : "sidebar"}>
            <div className={closeMenu ? "logo-container active" : "logo-container"}>
                <i className='bx bx-walk bx-lg'></i>
                <h1 className="title">FitTrack</h1>
            </div>

            <div className='menu-container'>
                <i onClick={handleCloseMenu} className={closeMenu ? 'bx bx-chevrons-right bx-md' : 'bx bx-chevrons-left bx-md'}></i>
            </div>

            {user ? (
                <>
                    <div className={closeMenu ? "links-container active" : "links-container"}>
                        <ul>
                            <li>
                                <i className='bx bx-home bx-md'></i>
                                <Link to="/">Collections</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={closeMenu ? "profile-container active" : "profile-container"}>
                        <div className={showLogout ? "profile-dropdown-content show" : "profile-dropdown-content"}>
                            <a>Account Details</a>
                            <a href="#" onClick={handleLogout}>Logout</a>
                        </div>
                        <button onClick={handleProfileClick}><i className='bx bxs-user-circle bx-md'></i></button>
                        <p>{user.email}</p>
                    </div>
                </>
            ) : (
                <div className={closeMenu ? "profile-container active" : "profile-container"}>
                    <button><i className='bx bxs-user-circle bx-md'></i></button>
                    <p><Link to="/login">Login</Link> or <Link to="/signup">Signup</Link></p>
                </div>
            )}
        </div>
    );
};

export default Navbar