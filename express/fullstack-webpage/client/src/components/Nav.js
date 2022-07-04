import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav() {

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  
    return (
        <div className='nav'>
            <div className='nav-bar'>
                <div className='right-side'>
                    <Link to='/'>Home</Link>
                </div>
                <div className='left-side'>
                    {isLoggedIn ? <Link to='/logout'>Logout</Link>
                    : (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>    
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
