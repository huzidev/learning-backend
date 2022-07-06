import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';

export default function Register() {

    const dispatch = useDispatch();

    const registerBuyer = useSelector((state) => state.register.registerBuyer);
    const registerSeller = useSelector((state) => state.register.registerSeller);

    return (
        <div>
            <Modal />      
        </div>
    )
}
