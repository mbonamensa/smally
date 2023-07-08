import {Routes, Route} from "react-router-dom"

import Home from "./pages/Home"
import Account from "./pages/Account"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"



function App() {

    return (
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/account" element={ <Account /> } />
        </Routes>    
    )
}

export default App