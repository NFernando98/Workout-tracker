import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Signup inside this hook, get res back and if its successful and user is logged in then,
// also want to update authcontext to say look we have the current user now and update state 
// using dispatch to have user's email 

export const useSignup = () => {
    const [error, setError] = useState(null);
    // is going to be true when we start the req
    // isLoaading for if I want some loading state or disable state on button when we use form
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext()

    const signup = async (email: any, password: any) => {
        setIsLoading(true);
        setError(null)

        const response = await fetch('https://workout-tracker-lac.vercel.app/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();

        if (!response.ok) {
            // setLoading falase, because now we are no longer loading, so its available again
            setIsLoading(false)
            setError(json.error);
        }

        if (response.ok) {
            // Save the user to local storage
            // Reason: if the user crosses off our website and returns hours later, our global state woudlve reset to null, but can detect 
            // user's logged in with the presence of that json web token in local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }

    }

    return { signup, isLoading, error }

}
