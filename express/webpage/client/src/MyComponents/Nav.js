import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact Us</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    )
}
