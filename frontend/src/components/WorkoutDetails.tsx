import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
// date fns
import { formatDistanceToNow } from 'date-fns';

const WorkoutDetails = ({ workout }: { workout: any }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext();

  const [title, setTitle] = useState<string>(workout.title);
  const [load, setLoad] = useState<string>(workout.load);
  const [reps, setReps] = useState<string>(workout.reps);
  const [selectedWeight, setSelectedWeight] = useState<string>(workout.selectedWeight);
  const [notes, setNotes] = useState<string>(workout.notes);
  const [isEditing, setEditing] = useState<boolean>(false);

  const handleSubmit = async() => {
    if (!user){
      return
    }

    const updatedWorkout = { title, load, selectedWeight, reps, notes };

    const response = await fetch('https://workout-tracker-lac.vercel.app/api/workouts/' + workout._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Assuming user.token is the JWT token
      }
    });

    const json = await response.json();

    if(response.ok) {
      console.log('updated workout:', json)
      dispatch({type: 'UPDATE_WORKOUT', payload: json})
    }
  }
  
  const handleClick = async() => {
    if (!user){
      return
    }

    // /api/workouts/:id is the endpoint
    const response = await fetch('https://workout-tracker-lac.vercel.app/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}` // Assuming user.token is the JWT token
    }
    });
    const json = await response.json()

    // make sure our response was ok, because if it was not, we dont want to then start deleting things from our global context state
    if(response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  const editTemplate = (
    <form onSubmit={handleSubmit}>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load <select  value={selectedWeight} onChange={(e) => setSelectedWeight(e.target.value)}>
                    <option  value="kg">kg</option>
                    <option  value="lbs">lbs</option>
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
        <button className="btn-purple" type="button" onClick={() => setEditing(false)}>Cancel</button>
      </div>
    </form>
  )

  const viewTemplate = (
    <>
      <details >
        <summary>
          <h4>{(workout.title).toUpperCase()}</h4>
          <p><strong>Load ({workout.selectedWeight}): </strong>{workout.load}</p>
          <p><strong>Number of reps: </strong>{workout.reps}</p>
        </summary>
        <p><strong>Notes: </strong></p>
        <textarea value={workout.notes} readOnly></textarea>
        <div className="button-group">
          <button className="btn-purple" onClick={() => setEditing(true)}>Edit</button>
        </div>
      </details>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </>
  )


  return (
    <div className="workout-details">
      {isEditing ? editTemplate :  viewTemplate}
    </div>
  )
}

export default WorkoutDetails
