import React from 'react';
import Home from './Home';
import Register from './Register';
import Error from './Error';
import Login from './Login';
import LoginBuyer from './LoginBuyer'
import LoginSeller from './LoginSeller'
import Logout from './Logout';
import About from './About';
// import AboutBuyer from './AboutBuyer';
import RegisterBuyer from './RegisterBuyer';
import RegisterSeller from './RegisterSeller';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { useSelector } from 'react-redux';

export default function App() {

    const isBuyer = useSelector((state) => state.login.isLoggedInBuyer)
    const isSeller = useSelector((state) => state.login.isLoggedInSeller)
    
    const registerBuyer = useSelector((state) => state.login.registerBuyer)
    const registerSeller = useSelector((state) => state.login.registerSeller)

    const pathBuyer = isBuyer ? '/buyer' : ''
    const pathSeller = isSeller ? '/seller' : ''

    const pathBuyerReg = registerBuyer ? '/buyer' : ''
    const pathSellerReg = registerSeller ? '/seller' : ''
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/login/buyer" element={<LoginBuyer />} />
                    <Route exact path="/login/seller" element={<LoginSeller />} />
                    <Route exact path="/register" element={<Register />} />
                    {
                        registerBuyer ? <Route exact path={`/register` + pathBuyerReg} element={<Register />} /> : ''
                    }
                    {
                        registerSeller ? <Route exact path={`/register` + pathSellerReg} element={<Register />} /> : ''
                    }
                    {
                        isBuyer ? <Route exact path={`/about` + pathBuyer} element={<About />} /> : ''
                    }
                    {
                        isSeller ? <Route exact path={`/about` + pathSeller} element={<About />} /> : ''
                    }
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}
