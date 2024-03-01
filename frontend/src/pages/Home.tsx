import axios from 'axios';
import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/workouts');
                if (response.status === 200) {
                    dispatch({ type: 'SET_WORKOUTS', payload: response.data })
                    console.log(response.data); // Log response.data here to see the fetched data
                } else {
                    console.error('Failed to fetch workouts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm></WorkoutForm>
        </div>
    );
};

export default Home;
