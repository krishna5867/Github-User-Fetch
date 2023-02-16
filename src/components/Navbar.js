import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const handleSignout = () => {
        signOut(auth);
        navigate('/login')
    };

return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" style={{width:'100vw'}}>
        <div className="container-fluid">
            <Link className="navbar-brand mx-4" to="/"><h3> <b>GitHub</b></h3></Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
        <div className="collapse navbar-collapse text-center" id="navbarNav">
            <ul className="navbar-nav">
                {user ? 
                (<>
                <li className="nav-item">
                    <Link className="nav-link active mt-2" aria-current="page" to="/"><strong>{user?.email}</strong></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="">
                    <button className='btn btn-warning text-dark rounded mx-2' onClick={handleSignout}><b>Logout</b></button></Link>
                </li>
                </>): (<>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login"><button className='btn btn-light text-dark rounded mx-2'><b>Login</b></button></Link>
                </li>
                </>)}
                
            </ul>
        </div>
    </nav>
);
};

export default Navbar;
