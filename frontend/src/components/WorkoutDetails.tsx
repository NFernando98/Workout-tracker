import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
// date fns
import { formatDistanceToNow } from 'date-fns';

const WorkoutDetails = ({ workout }: { workout: any }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext();

  const handleClick = async() => {
    if (!user){
      return
  }

    // /api/workouts/:id is the endpoint
    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
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

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
