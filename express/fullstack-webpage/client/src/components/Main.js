import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logInActions } from '../store/Login-Store';

export default function Main() {

    const dispatch = useDispatch();

    function passwordConditionLog() {
        dispatch(logInActions.passwordConditionLog())
    }

    return (
        <div className='nav'>
            <div  className='nav-bar'>
                <Link to='/' className='animation' onClick={passwordConditionLog}>Home</Link>
            </div>
        </div>
    )
}
