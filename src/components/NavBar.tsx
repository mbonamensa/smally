

function NavBar() {
    return (
        <nav className="">
            <h1><a href={window.location.host}>Smally</a></h1>

            <div>
                <p>Signup</p>
                <p>Login</p>
            </div>
        </nav>
    )
}

export default NavBar