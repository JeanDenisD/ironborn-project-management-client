import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav className="Navbar">
            <NavLink to="/">Home</NavLink> | 
            <NavLink to="/projects">Projects</NavLink> 
            {isLoggedIn && (
                <>
                    | <NavLink to="/projects/create">New Project</NavLink>
                    <span>Welcome {user && user.email}</span>
                    | <button onClick={logOutUser}>Logout</button> 
                </>
            )}

            {!isLoggedIn && (
                <>
                  |||  
                    <Link to="/signup"> Register </Link> 
                    | <Link to="/login"> Login </Link>
                </>
            )}
        </nav>
    );
}


export default Navbar;