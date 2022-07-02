import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/logout">Logout</Link>
        </div>
    )
}
