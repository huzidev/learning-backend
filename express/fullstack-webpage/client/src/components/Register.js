import React from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className='modal'>
            <h5>
                Register as <Link to='/register/buyer'>Buyer</Link>
            </h5>
            <h5>
                Register as <Link to='/register/seller'>Seller</Link>
            </h5>
        </div>
    )
}
