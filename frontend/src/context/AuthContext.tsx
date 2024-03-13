import React, { createContext, ReactNode, useReducer } from "react";

interface User {
    email: string;
    password: string;
}

export const AuthContext = createContext<{ state: { user: User[] | null }, dispatch: React.Dispatch<any> }>({
    state: { user: [] },  
    dispatch: () => {}
});

export const authReducer = (state: { user: any; }, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('authContext state: ', state)
            return {
                user: action.payload
            };
        case 'LOGOUT':
            return {
                user: null
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // every time we login or logout, the state changes will log to console
    console.log('authContext state: ', state)

    return (
        <AuthContext.Provider value={{state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
