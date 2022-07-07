import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stateActions } from '../store/State-Store';

export default function Nav() {

    const dispatch = useDispatch()

    const isLoggedInSeller = useSelector((state) => state.login.isLoggedInSeller);
    const isLoggedInBuyer = useSelector((state) => state.login.isLoggedInBuyer);
    
    function register() {
        dispatch(stateActions.registerState());
    }
    function login() {
        dispatch(stateActions.loginState());
    }
    
    return (
        <div className='nav'>
            <div className='nav-bar'>
                <div className='left-side'>
                    <Link to='/' className='animation right-element'>Home</Link>
                    {
                        isLoggedInSeller
                            ? (
                                <Link to='/about/seller' className='animation'>About</Link>
                            ) 
                            : ''
                    }
                    {
                        isLoggedInBuyer
                         ? (
                            <Link to='/about/buyer' className='animation'>About</Link>
                         )
                         : ''
                    }
                    {
                        isLoggedInBuyer 
                            ? (
                                <>
                                    <Link to='/showProducts' className='animation'>Show Products</Link>
                                    <Link to='/allSellers' className='animation'>All Sellers</Link>
                                </>
                            )
                            : ''
                    }
                    {
                        isLoggedInSeller
                            ? (
                                <>
                                    <Link to='/addProducts' className='animation'>Add Product</Link>
                                    <Link to='/showProducts' className='animation'>Show Products</Link>
                                    <Link to='/allSellers' className='animation'>All Sellers</Link>
                                </>
                            )
                            : ''
                    }
                </div>
                <div className='right-side'>
                    {
                        isLoggedInSeller || isLoggedInBuyer
                            ? (
                                <Link to='/logout' className='animation'>Logout</Link>
                            )
                            : (
                                <>
                                    <Link to='/login' className='animation' onClick={login}>Login</Link>
                                    <Link to='/register' className='animation' onClick={register}>Register</Link>    
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
