import React from 'react';
import Home from './Home';
import Register from './Register';
import Error from './Error';
import Login from './Login';
import Logout from './Logout';
import About from './About';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import RegisterBuyer from './RegisterBuyer';
import RegisterSeller from './RegisterSeller';

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/register/buyer" element={<RegisterBuyer />} />
                    <Route exact path="/register/seller" element={<RegisterSeller />} />
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}
