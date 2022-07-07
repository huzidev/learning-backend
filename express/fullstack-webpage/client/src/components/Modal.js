import React from 'react';
// import RegisterBuyer from './RegisterBuyer';
// import RegisterSeller from './RegisterSeller';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Modal() {


    // const registerBuyer = useSelector((state) => state.register.registerBuyer);
    // const registerSeller = useSelector((state) => state.register.registerSeller);

    // function buyer() {
    //     dispatch(registerStore.regBuyer())
    // }
    // function seller() {
    //     dispatch(registerStore.regSeller())
    // }

    return (
        <div className='modal'>
            {/* for registration */}
            <h5>
                Register as <Link to='/register/buyer'>Buyer</Link>
            </h5>
            <h5>
                Register as <Link to='/register/seller'>Seller</Link>
            </h5>
            {/* for loggingIn */}
            <h5>
                Login as <Link to='/login/buyer'>Buyer</Link>
            </h5>
            <h5>
                Login as <Link to='/login/seller'>Seller</Link>
            </h5>
        </div>
    )
}
