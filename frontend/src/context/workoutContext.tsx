import React, { createContext, ReactNode, useReducer } from "react";

// Define the shape of a workout object
interface Workout {
    id: number;
    name: string;
    reps: number;
}

// Create the context with an initial value of an empty array of Workout objects
export const WorkoutsContext = createContext<{ state: { workouts: Workout[] | null }, dispatch: React.Dispatch<any> }>({
    state: { workouts: [] },  // Change null to an empty array
    dispatch: () => {}
});


// dispatch({type: 'SET_WORKOUTS', payload: [{},{}]})
export const workoutsReducer = (state: { workouts: any; }, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...(state.workouts || [])]
            };
        default:
            return state;
    }
}

// WorkoutsContextProvider component provides the context value and renders its children
export const WorkoutsContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: []
    });

    return (
        <WorkoutsContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}
