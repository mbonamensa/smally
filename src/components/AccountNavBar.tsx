type AccountNavBarTypes = {
    logout: Function
}

function AccountNavBar({logout}: AccountNavBarTypes) {
    return (
        <nav className="nav-colored">
            <h1><a href={window.location.host}>Smally</a></h1>

            <button onClick={() => logout()}>
                <p>Logout</p>
            </button>
        </nav>
    )
}

export default AccountNavBar