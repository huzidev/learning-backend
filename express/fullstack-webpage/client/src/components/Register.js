import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import registerStore from '../store/Register-Store';
import Modal from './Modal';

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
            { 
                registerBuyer 
                    ? (
                        <Link to='/register/buyer' onClick={}>Buyer</Link>
                    )
                    : ''
            }
            { 
                registerSeller
                    ? (
                        <Link to='/register/seller'>Seller</Link>
                    )
                    : ''
            }
        </div>
    )
}
