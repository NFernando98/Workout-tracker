import axios from 'axios';
import { Key, useEffect, useState } from 'react';

const Home = () => {
    const [workouts, setWorkouts] = useState<{ _id: Key | null | undefined; title: string; }[] | null>(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/workouts');
                if (response.status === 200) {
                    setWorkouts(response.data.json);
                    console.log(workouts)
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
                    <p key={workout._id}>{workout.title}</p>
                ))}
            </div>
        </div>
    );
};

export default Home;
