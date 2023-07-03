import { useState, useEffect } from "react"
import {auth, signUpWithEmailAndPassword} from "../firebase"
import {Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"

function SignUp() {

    const [inputData, setInput] = useState({
        email: "",
        password: ""
    })
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate("/account");
    }, [user, loading]);

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSignUp() {
        signUpWithEmailAndPassword(inputData.email, inputData.password)
    }

    console.log(auth.currentUser)

    return (
        <div className="formBox">
            <h2>Smally</h2>
            <div className="form-container">
                <input 
                type="email"
                name="email"
                value={inputData.email} 
                onChange={handleChange} 
                placeholder="Email"
                />
                <input 
                type="password"
                name="password"
                value={inputData.password} 
                onChange={handleChange} 
                placeholder="Password"
                />
                <button onClick={handleSignUp}>Sign up</button>
                <p>Already have an account? <Link to="/login">Login</Link> </p>
            </div>

        </div>
    )
}


export default SignUp