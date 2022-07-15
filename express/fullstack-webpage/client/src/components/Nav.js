import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stateActions } from '../store/State-Store';

export default function Nav() {

    const dispatch = useDispatch()

    const hamburgerOpen = useSelector((state) => state.login.hamburgerOpen)

    function register() {
        dispatch(stateActions.registerState());
        dispatch(stateActions.fixState())
    }
    function login() {
        dispatch(stateActions.loginState());
        dispatch(stateActions.fixState())
    }
    function hamburgerMenu() {
        dispatch(stateActions.hamburgerState())
    }
    function fixState() {
        dispatch(stateActions.fixState())
    }
  
    const activeClass = hamburgerOpen ? ' open' : '';


    return (
        <div className='nav'>
            <div onClick={hamburgerMenu} className={`ham` + activeClass}>
                <div className='hamburger-menu'>
                    <div className='menu'>
                    </div>
                </div>
            </div>
            <div className={`nav-bar` + activeClass}>
                <div className='left-side'>
                    <Link to='/' className='animation left-element'>Home</Link>
                    
                    {
                        localStorage.getItem('jwtokenbuyer')
                            ? (
                                <>
                                    <Link to='/about/buyer' onClick={fixState} className='animation'>About</Link>
                                    <Link to='/allProducts' onClick={fixState} className='animation'>Show Products</Link>
                                    <Link to='/allSellers' onClick={fixState} className='animation'>All Sellers</Link>
                                </>
                            )
                            : ''
                    }
                    {
                        localStorage.getItem('jwtokenseller')
                            ? (
                                <>
                                    <Link to='/about/seller' onClick={fixState} className='animation'>About</Link>
                                    <Link to='/addProduct' onClick={fixState} className='animation'>Add Product</Link>
                                    <Link to='/allProducts' onClick={fixState} className='animation'>Show Products</Link>
                                    <Link to='/allSellers' onClick={fixState} className='animation'>All Sellers</Link>
                                </>
                            )
                            : ''
                    }
                </div>
                <div className='right-side'>
                    {
                        localStorage.getItem('jwtokenbuyer') || localStorage.getItem('jwtokenseller')
                            ? (
                                <Link to='/logout' onClick={fixState} className='animation right-element'>Logout</Link>
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
