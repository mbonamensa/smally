import { Link } from "react-router-dom"


function NavBar() {
    return (
        <nav className="">
            <h1><a href={window.location.host}>Smally</a></h1>

            <div>
                <p className="login-btn"><Link to="/login">Login</Link></p>
                <p className="signup-btn"><Link to="/signup">Signup</Link></p>
            </div>
        </nav>
    )
}

export default NavBar