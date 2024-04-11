import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from "react"
// date fns
import { formatDistanceToNow } from 'date-fns';

const UpdateWorkoutForm = ({ workoutId, updateWorkoutDetails, handleCancelEdit }: { workoutId: any, updateWorkoutDetails: (updatedWorkoutDetails: any) => void, handleCancelEdit: () => void}) => {

  const [title, setTitle] = useState<string>(workoutId.title);
  const [load, setLoad] = useState<string>(workoutId.load);
  const [reps, setReps] = useState<string>(workoutId.reps);
  const [error, setError] = useState<string>('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<string>(workoutId.selectedWeight);
  const [notes, setNotes] = useState<string>(workoutId.notes);
  const { dispatch } = useWorkoutsContext(); // to keep our ui in sync with out database
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(true); // state variable to track form visibility

  const handleUpdate = async (e: any) => {
    e.preventDefault(); 
    if (!user) {
      return;
    }
    const updatedWorkout: { [key: string]: any } = {}; //empty array
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
    updateWorkoutDetails(updatedWorkout);

    const response = await fetch(`https://workout-tracker-lac.vercel.app/api/workouts/${workoutId._id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Assuming user.token is the JWT token
      }
    });

    const json = await response.json();
    console.log("json: " , json)

    if (response.ok) {
      console.log('updated workout:', json);
      dispatch({ type: 'UPDATE_WORKOUT', payload: json }); // Update local state with the updated workout
      setShowForm(false); // hide the form after successful update
      handleCancelEdit();
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

      <div className="button-group">
        <button className="btn-purple">Update</button> &nbsp;
      </div>

    </form>
  )

}

export default UpdateWorkoutForm;
