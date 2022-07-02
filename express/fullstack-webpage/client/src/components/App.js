import React from 'react';
import Home from './Home';
import Register from './Register';
import Nav from './Nav';
import Error from './Error';
import Login from './Login';
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
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}
