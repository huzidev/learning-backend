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
            <Nav />
            <Router>
                <Routes>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/contact">
                        <ContactUs />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route>
                        <ErrorPage />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}
