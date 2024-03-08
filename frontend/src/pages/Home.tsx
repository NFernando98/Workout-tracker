import axios from 'axios';
import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { state: { workouts }, dispatch } = useWorkoutsContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/workouts');
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
    
        fetchWorkouts();
    }, [dispatch]);
    

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout: any) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm></WorkoutForm>
        </div>
    );
};

export default Home;
