import React, { createContext, useReducer, useEffect, ReactNode } from 'react';

interface User {
    token: any;
    email: string;
    password: string;
}

interface State {
    user: User | null;
}

interface Action {
    type: string;
    payload?: User; // Make payload optional
}

interface AuthContextProps {
    user: User | null;
    dispatch: React.Dispatch<Action>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'LOGIN':
            return { 
                user: action.payload ?? null // Use null if action.payload is undefined
            };    
        case 'LOGOUT':
            return { 
                user: null 
        };
        default:
        return state;
    }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    
    // Point of this useEffect is to let react know user is still logged in when refreshing the page
    // only fire useEffect ones when the component first renders
    useEffect(() => {
        // check for token in local storage just once to find out if we have a value for it
        const userString = localStorage.getItem('user');
        // nsure that the value retrieved from localStorage is a string before parsing it
        const user = userString ? JSON.parse(userString) : null;
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);
    

    // every time we login or logout, the state changes will log to console
    console.log('authContext state: ', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};