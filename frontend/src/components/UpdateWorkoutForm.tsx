import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from "react"
// date fns
import { formatDistanceToNow } from 'date-fns';

const UpdateWorkoutForm = ({ workoutId }: { workoutId: string }) => {

  const [title, setTitle] = useState<string>('');
  const [load, setLoad] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<string>("kg");
  const [notes, setNotes] = useState<string>('');
  const { dispatch } = useWorkoutsContext(); // to keep our ui in sync with out database
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(true); // state variable to track form visibility

  const handleUpdate = async (e: any) => {
    e.preventDefault(); 
    if (!user) {
      return;
    }
    const updatedWorkout: { [key: string]: any } = {}; // Initialize as an empty object
    // Only include attributes that are not empty
    if (title) {
      updatedWorkout.title = title;
    }
    if (load) {
      updatedWorkout.load = load;
    }
    if (selectedWeight) {
      updatedWorkout.selectedWeight = selectedWeight;
    }
    if (reps) {
      updatedWorkout.reps = reps;
    }
    if (notes) {
      updatedWorkout.notes = notes;
    }
    const response = await fetch(`http://localhost:4000/api/workouts/${workoutId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Assuming user.token is the JWT token
      }
    });

    const json = await response.json();

    if (response.ok) {
      console.log('updated workout:', json);
      dispatch({ type: 'UPDATE_WORKOUT', payload: json }); // Update local state with the updated workout
      setShowForm(false); // hide the form after successful update
    }
  };

  if (!showForm) {
    return null; // do not render the form if showForm is false
  }


  return (
    <form onSubmit={handleUpdate}>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load <select value={selectedWeight} onChange={(e) => setSelectedWeight(e.target.value)}>
        <option value="kg">kg</option>
        <option value="lbs">lbs</option>
      </select>:
      </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <label>Notes:</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={5}
      />

      <button>Submit</button>

    </form>
  )

}

export default UpdateWorkoutForm;
