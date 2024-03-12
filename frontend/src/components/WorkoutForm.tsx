import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext() // to keep our ui in sync with out database
    const [title, setTitle] = useState<string>('');
    const [load, setLoad] = useState<string>('');
    const [reps, setReps] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [emptyFields, setEmptyFields] = useState<string[]>([]);

    // Function to handle when submitted
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError('')
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            console.log('new workout added:', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json}) // payload is the single new workout we are adding. It is the json, can verify by check-
                                                              // -ing the backend where it sends back workout that is being added back as a response
          }
      
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            
            <label>Load (kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm