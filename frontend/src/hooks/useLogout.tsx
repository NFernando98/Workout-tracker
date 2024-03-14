import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // 2 things: update global state (dispatch) and delete token from local storage

        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}