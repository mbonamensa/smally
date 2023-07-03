import { useState, useEffect } from "react"
import {auth, logInWithEmailAndPassword} from "../firebase"
import {Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"

function Login() {

    const [inputData, setInput] = useState({
        email: "",
        password: ""
    })
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate("/account");
    }, [user, loading]);

    // console.log(loading)
    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget
        // setInput(e.currentTarget.value)
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleLogin() {
        logInWithEmailAndPassword(inputData.email, inputData.password)
    }

    console.log(auth.currentUser)

    return (
        <div className="formBox">
            <h2><Link to="/">Smally</Link></h2>
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
                <button onClick={handleLogin}>Login</button>
                <p>Don't have an account? <Link to="/signup"> Sign Up</Link> </p>
            </div>

        </div>
    )
}


export default Login