import { useState } from "react"
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await signup(email, password)
    }
    
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

                <label>Email:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
                {/* want function to be disabled if isLoading is true because 
                if loading is true,a req is going on so we dont want to send
                another one right away*/} 
        </form>
    )
}

export default Signup