import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    return (
        <nav >
            <h3>Toxicity</h3>
            <div >
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/profile" className="hover:text-blue-500">Profile</Link>
            <Link to="/login" className="hover:text-blue-500">Login</Link>
            <Link to="/posts" className="hover:text-blue-500">Posts</Link>
            <Link to="/register" className="hover:text-blue-500">Register</Link>


            <button type="primary" onClick={() => { logout(); navigate("/login") }}>Logout</button>
            </div>
        </nav>

    )
}

export default Header