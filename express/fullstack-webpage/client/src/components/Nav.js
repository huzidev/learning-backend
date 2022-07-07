import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerActions } from '../store/Register-Store';

export default function Nav() {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    
    const isSeller = useSelector((state) => state.register.registerSeller);
    const isBuyer = useSelector((state) => state.register.registerBuyer);
  
    function register() {
        dispatch(registerActions.registerState());
    }
    function login() {
        dispatch(registerActions.loginState());
    }
    
    return (
        <div className='nav'>
            <div className='nav-bar'>
                <div className='right-side'>
                    <Link to='/' className='animation right-element'>Home</Link>
                    {
                        isLoggedIn
                            ? (
                                <Link to='/about' className='animation'>About</Link>
                            ) 
                            : ''
                    }
                    {
                        isBuyer
                            ? (
                                <>
                                    <Link to='/showProducts' className='animation'>Show Products</Link>
                                    <Link to='/allSellers' className='animation'>All Sellers</Link>
                                </>
                            )
                            : <h5>buyer false</h5>
                    }
                    {
                        isSeller
                            ? (
                                <>
                                    <Link to='/addProducts' className='animation'>Add Product</Link>
                                    <Link to='/showProducts' className='animation'>Show Products</Link>
                                    <Link to='/allSellers' className='animation'>All Sellers</Link>
                                </>
                            )
                            : <h5>seller false</h5>
                    }
                </div>
                <div className='left-side'>
                    {
                        isLoggedIn 
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
