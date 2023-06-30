import { useState } from "react"
import {auth, registerWithEmailAndPassword} from "../firebase"
// import {useNavigate } from "react-router-dom"
// import { useAuthState } from "react-firebase-hooks/auth"

function UserForm() {
    const [inputData, setInput] = useState({
        email: "",
        password: ""
    })
    // const [user, loading, error] = useAuthState(auth)
    // const navigate = useNavigate()
    // const [loadScreen, setLoadScreen] = useState("")

    // useEffect(() => {
    //     if (loading) {
    //       setLoadScreen("Loading...")
    //     //   return;
    //     }
    //     if (user) navigate("/account");
    // }, [user, loading]);

    // console.log(loading)
    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget
        // setInput(e.currentTarget.value)
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSignUp() {
        registerWithEmailAndPassword(inputData.email, inputData.password)
    }

    console.log(auth.currentUser)

    return (
        <div className="formBox">
            <div >
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
                <button onClick={handleSignUp}>Sign in</button>
            </div>
        </div>
    )
}

export default UserForm