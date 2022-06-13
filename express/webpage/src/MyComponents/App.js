import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import ContactUs from './ContactUs';
import Login from './Login';
import Register from './Register';
import ErrorPage from './ErrorPage';

export default function App() {
    return (
        <div>
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
        </div>
    )
}
