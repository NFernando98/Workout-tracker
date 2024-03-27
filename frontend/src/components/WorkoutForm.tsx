import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext() // to keep our ui in sync with out database
    const { user } = useAuthContext()

    const [title, setTitle] = useState<string>('');
    const [load, setLoad] = useState<string>('');
    const [reps, setReps] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [emptyFields, setEmptyFields] = useState<string[]>([]);
    const [selectedWeight, setSelectedWeight] = useState<string>("kg");
    const [notes, setNotes] = useState<string>('');
    console.log("empty fields", emptyFields)

    // Function to handle when submitted
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = { title, load, selectedWeight, reps, notes };

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` // Assuming user.token is the JWT token
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            if (Array.isArray(json.emptyFields)) {
                setEmptyFields(json.emptyFields);
            } else {
                setEmptyFields([]);
            }
        }


        if (response.ok) {
            setError('')
            setTitle('')
            setLoad('')
            //setSelectedWeight('')
            setReps('')
            setNotes('')
            setEmptyFields([])
            console.log('new workout added:', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json }) // payload is the single new workout we are adding. It is the json, can verify by check-
            // -ing the backend where it sends back workout that is being added back as a response
        }

    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                // 'error' class there to style in css
                className={emptyFields.includes('title') ? 'error' : ''}
            />


            <label>Load <select  value={selectedWeight} onChange={(e) => setSelectedWeight(e.target.value)}>
                            <option  value="kg">kg</option>
                            <option  value="lbs">lbs</option>
                        </select>:</label>
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


            <label>Notes:</label>
            <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className={emptyFields.includes('notes') ? 'error' : ''}
            />


            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm