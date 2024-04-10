import './topbar.css'; // Import the CSS file for Navbar styles
import WorkoutForm from '../WorkoutForm';

const Topbar = () => {
    return (
        <div className="top-bar">
            <div className="top-bar-actions">
                <button className="btn btn-purple" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add workout</button>
            </div>
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Add New Workout</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <WorkoutForm />
                </div>
            </div>
        </div>
    )
}

export default Topbar;
