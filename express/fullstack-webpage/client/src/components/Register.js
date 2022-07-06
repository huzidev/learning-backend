import React from 'react';
import Modal from './Modal';
import RegisterBuyer from './RegisterBuyer';
import RegisterSeller from './RegisterSeller';
import { Link } from 'react-router-dom';
import registerStore from '../store/Register-Store';
import { useDispatch, useSelector } from 'react-redux';

export default function Register() {
    
    // const dispatch = useDispatch();

    // const registerBuyer = useSelector((state) => state.register.registerBuyer);
    // const registerSeller = useSelector((state) => state.register.registerSeller);

    // function buyer() {
    //     dispatch(registerStore.regBuyer())
    // }
    // function seller() {
    //     dispatch(registerStore.regSeller())
    // }
    return (
        <div>
            <Modal />
            {/* { 
                registerBuyer 
                    ? (
                        <RegisterBuyer />
                    )
                    : ''
            }
            { 
                registerSeller
                    ? (
                        <RegisterSeller />
                    )
                    : ''
            } */}
        </div>
    )
}
