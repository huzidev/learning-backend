import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className='nav'>
            <div  className='nav-bar'>
                <Link to='/' className='animation'>Home</Link>
            </div>
        </div>
    )
}
