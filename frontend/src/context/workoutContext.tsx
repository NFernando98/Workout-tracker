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
            console.log('Handling SET_WORKOUTS action:', action.payload); // Log the payload
            // return new value that we want the state to be, so we return a new object in essence
            return {
                // action.payload
                // because if we want to set all of the workouts, then the payload property on the action that we pass into the dispatch function would be an array of all of the workouts
                workouts: action.payload
            };
        case 'CREATE_WORKOUT':
            return {
                // return workouts property inside the object
                // workoouts: [new workout, rest of the data workouts]
                workouts: [action.payload, ...(state.workouts || [])]
            };
        case 'DELETE_WORKOUT':
            console.log('Handling DELETE_WORKOUT action:', action.payload); // Log the payload
            return {
                workouts: state.workouts.filter((w: { _id: any; }) => w._id !== action.payload._id)
            }
        default:
            return state;
    }
}

// WorkoutsContextProvider component provides the context value and renders its children
// children is whatever components our workoutscontext wraps
export const WorkoutsContextProvider = ({ children }: { children: ReactNode }) => {
    // useReducer is used but useState can be used here also
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: []
    });

    return (
        // value={{ state, dispatch } to provide state and dispatch to other components
        // other components can use the state, or use dispatch function to update the state
        <WorkoutsContext.Provider value={{state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}
