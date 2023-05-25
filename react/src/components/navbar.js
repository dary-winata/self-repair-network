import { Button } from 'react-bootstrap'
import { useEffect } from 'react'

const Navbar = () => {
    useEffect(() => {
        const login = document.getElementById("loginButton")
        const logout = document.getElementById("logoutButton")

        if(localStorage.getItem('username') == null) {
            logout.style.visibility = 'hidden'
            login.style.visibility = 'visible'
        } else {
            login.style.visibility = 'hidden'
            logout.style.visibility = 'visible'
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('username')
        window.location.href = "/"
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark" style={{backgroundColor: "#808080", width: "100vw"}}>
            <div className="container-fluid">
                <a className="nav-link" href="/dashboard" style={{ fontWeight: "900" }}>Dashboard</a>
                <div className="collapse navbar-colxlapse" id="navbarCollapse" style={{justifyContent: "flex-end"}} >
                    <Button className="d-flex" id='loginButton' style={{float: "right"}} href="/login">Login</Button>
                    <Button className="d-flex" id='logoutButton' style={{float: "right"}} onClick={() => logout()} href="/login">Logout</Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar