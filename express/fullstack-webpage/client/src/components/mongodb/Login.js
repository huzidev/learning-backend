import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <>
            <div className='nav'>
                    <div  className='nav-bar'>
                        <Link to='/' className='animation'>Home</Link>
                    </div>
                </div>
            <div className='modal'>
                <h5>
                    Login as <Link to='/login/buyer'>Buyer</Link>
                </h5>
                &nbsp;&nbsp;
                <h5>
                    Login as <Link to='/login/seller'>Seller</Link>
                </h5>
            </div>
        </>
    )
}
