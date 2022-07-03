import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav() {

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  
    return (
        <div>
            <Link to='/'>Home</Link>
            {isLoggedIn ? <Link to='/logout'>Logout</Link>
            : (
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>    
                </>
            )}
        </div>
    )
}
