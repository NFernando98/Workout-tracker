import { WorkoutsContext } from "../context/workoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutContext must be used inside and WorkoutsContextProvider')
    }

    return context
}