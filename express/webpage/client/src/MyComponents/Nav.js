import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </div>
    )
}
