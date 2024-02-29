import axios from 'axios';
import { useEffect, useState } from 'react';

// components
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {
    const [workouts, setWorkouts] = useState<any[]>([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/workouts');
                if (response.status === 200) {
                    setWorkouts(response.data);
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
                    <WorkoutDetails key={workout._id} workout={workout}  />
          ))}
            </div>
        </div>
    );
};

export default Home;
