import React from 'react';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import ContactUs from './ContactUs';
import Login from './Login';
import Register from './Register';
import ErrorPage from './ErrorPage';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

export default function App() {
    return (
        <div>
            <Router>
                <Nav />
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route exact path="/about" element={<About />}/>
                    <Route exact path="/contact" element={<ContactUs />}/>
                    <Route exact path="/login" element={<Login />}/>
                    <Route exact path="/logout" element={<Logout />}/>
                    <Route exact path="/register" element={<Register />}/>
                    <Route exact path='*' element={<ErrorPage />}/>
                </Routes>
            </Router>
        </div>
    )
}
