import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav() {

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  
    return (
        <div className='nav'>
            <div className='nav-bar'>
                <div className='right-side'>
                    <Link to='/' className='animation right-element'>Home</Link>
                    {
                        isLoggedIn
                            ? (
                                <Link to='/about' className='animation'>About</Link>
                            ) 
                            : ''
                    }
                </div>
                <div className='left-side'>
                    {isLoggedIn ? <Link to='/logout' className='animation'>Logout</Link>
                    : (
                        <>
                            <Link to='/login' className='animation'>Login</Link>
                            <Link to='/register' className='animation'>Register</Link>    
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
