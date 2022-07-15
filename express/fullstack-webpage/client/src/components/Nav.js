import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { stateActions } from '../store/State-Store';

export default function Nav() {

    const dispatch = useDispatch()

    function register() {
        dispatch(stateActions.registerState());
    }
    function login() {
        dispatch(stateActions.loginState());
    }
    
    return (
        <div className='nav'>
            <div className='ham'>
                <div className='hamburger-menu'>
                    <div className='menu'>
                    </div>
                </div>
            </div>
            <div className='nav-bar'>
                <div className='left-side'>
                    <Link to='/' className='animation left-element'>Home</Link>
                    
                    {
                        localStorage.getItem('jwtokenbuyer')
                            ? (
                                <>
                                    <Link to='/about/buyer' className='animation'>About</Link>
                                    <Link to='/allProducts' className='animation'>Show Products</Link>
                                    <Link to='/allSellers' className='animation'>All Sellers</Link>
                                </>
                            )
                            : ''
                    }
                    {
                        localStorage.getItem('jwtokenseller')
                            ? (
                                <>
                                    <Link to='/about/seller' className='animation'>About</Link>
                                    <Link to='/addProduct' className='animation'>Add Product</Link>
                                    <Link to='/allProducts' className='animation'>Show Products</Link>
                                    <Link to='/allSellers' className='animation'>All Sellers</Link>
                                </>
                            )
                            : ''
                    }
                </div>
                <div className='right-side'>
                    {
                        localStorage.getItem('jwtokenbuyer') || localStorage.getItem('jwtokenseller')
                            ? (
                                <Link to='/logout' className='animation right-element'>Logout</Link>
                            )
                            : (
                                <>
                                    <Link to='/login' className='animation' onClick={login}>Login</Link>
                                    <Link to='/register' className='animation right-element' onClick={register}>Register</Link>    
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
