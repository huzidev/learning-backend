import React from 'react';
import { Link } from 'react-router-dom';

export default function Modal() {
    return (
        <div className='modal'>
            <h5>
                Register as <Link to='/register/seller'>Seller </Link>
            </h5>
            <h5>
                Register as Buyer
            </h5>
        </div>
    )
}
