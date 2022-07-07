import React from 'react';
import Home from './Home';
import Register from './Register';
import Error from './Error';
import Login from './Login';
import LoginBuyer from './LoginBuyer'
import LoginSeller from './LoginSeller'
import Logout from './Logout';
import AboutSeller from './AboutSeller';
import RegisterBuyer from './RegisterBuyer';
import RegisterSeller from './RegisterSeller';
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
                    <Route exact path="/about/seller" element={<AboutSeller />} />
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}
