import React from 'react';
import Home from './Home';
import Register from './mongodb/Register';
import Error from './Error';
import Login from './mongodb/Login';
import LoginBuyer from './mongodb/LoginBuyer'
import LoginSeller from './mongodb/LoginSeller'
import Logout from './mongodb/Logout';
import About from './mongodb/About';
import RegisterBuyer from './mongodb/RegisterBuyer';
import RegisterSeller from './mongodb/RegisterSeller';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

export default function App() {
    
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/login/buyer" element={<LoginBuyer />} />
                    <Route exact path="/login/seller" element={<LoginSeller />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/register/buyer" element={<RegisterBuyer />} />
                    <Route exact path="/register/seller" element={<RegisterSeller />} />
                    <Route exact path={"/about/buyer"} element={<About />} />
                    <Route exact path={"/about/seller"} element={<About />} />
                    {/* <Route exact path="/about/buyer" element={<AboutBuyer />} /> */}
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}
