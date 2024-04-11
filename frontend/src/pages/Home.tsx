import axios from 'axios';
import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import WorkoutDetails from '../components/WorkoutDetails/WorkoutDetails'
import Topbar from '../components/Topbar/Topbar'


const Home = () => {
    const { state: { workouts }, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!user) {
                return; // Exit early if user is null
            }

            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}` // Assuming user.token is the JWT token
                    }
                };

                // middleware will check config and if its valid it'll give access to this endpoint
                const response = await axios.get('https://workout-tracker-lac.vercel.app/api/workouts', config);
                console.log('API Response:', response.data); // Log the API response

                if (response.status === 200) {
                    dispatch({ type: 'SET_WORKOUTS', payload: response.data })
                    console.log('Dispatched SET_WORKOUTS'); // Log after dispatch
                } else {
                    console.error('Failed to fetch workouts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        // fetch only if we have value for the user
        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <Topbar />
            <div className="workouts">
                {workouts && workouts.map((workout: any, index: number) => (
                    <WorkoutDetails key={`${workout._id}-${index}`} workout={workout} />
                ))}
            </div>
        </div>
    );
};

export default Home;
