import React from 'react';
import Modal from './Modal';
import RegisterBuyer from './RegisterBuyer';
import RegisterSeller from './RegisterSeller';
import { Link } from 'react-router-dom';
import registerStore from '../store/Register-Store';
import { useDispatch, useSelector } from 'react-redux';

export default function Register() {

    const dispatch = useDispatch();

    const registerBuyer = useSelector((state) => state.register.registerBuyer);
    const registerSeller = useSelector((state) => state.register.registerSeller);

    function buyer() {
        dispatch(registerStore.regBuyer())
    }
    function seller() {
        dispatch(registerStore.regSeller())
    }
    return (
        <div>
            <Modal />
            <Link to='/register/buyer' onClick={buyer}>Buyer</Link>
            <h3 onClick={buyer}>
                buyer
            </h3>
            { 
                registerBuyer 
                    ? (
                        <RegisterBuyer />
                    )
                    : ''
            }
            <Link to='/register/seller' onClick={seller}>Seller</Link>
            {/* <h3 onClick={seller}>
                seller
            </h3> */}
            { 
                registerSeller
                    ? (
                        <RegisterSeller />
                    )
                    : ''
            }
        </div>
    )
}
