import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// checks its in scope of that context
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside and AuthContextProvider')
    }

    return context
};