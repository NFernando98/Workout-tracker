// WorkoutDetails.tsx
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { formatDistanceToNow } from 'date-fns';
import { useState } from "react"
import UpdateWorkoutForm from '../components/UpdateWorkoutForm'

const WorkoutDetails = ({ workout }: { workout: any }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false); 
  const [currentWorkout, setCurrentWorkout] = useState(workout);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  }

  const handleUpdateClick = () => {
    setEditMode(true); // Enter edit mode when "edit" is clicked
  }

  const handleCancelEdit = () => {
    setEditMode(false); // Exit edit mode
  }

  const updateWorkoutDetails = (updatedWorkoutDetails: any) => {
    // Update the workout details state in WorkoutDetails
    setCurrentWorkout({
      ...currentWorkout,
      ...updatedWorkoutDetails
    });
  };

  return (
    <div className="workout-details">
      <h4>{currentWorkout.title}</h4>
      <p><strong>Load (kg): </strong>{currentWorkout.load}</p>
      <p><strong>Number of reps: </strong>{currentWorkout.reps}</p>
      <p>{formatDistanceToNow(new Date(currentWorkout.createdAt), { addSuffix: true })}</p>
      <div className="action-buttons">
        <span className="material-symbols-outlined delete-button" onClick={handleClick}>delete</span>
        {!editMode && <span className="material-symbols-outlined" onClick={handleUpdateClick}>edit</span>}
        {editMode && <span className="material-symbols-outlined" onClick={handleCancelEdit}>cancel</span>}
      </div>
      {editMode && <UpdateWorkoutForm workoutId={currentWorkout._id} updateWorkoutDetails={updateWorkoutDetails} />}
    </div>
  )
}

export default WorkoutDetails;

