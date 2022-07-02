import React from 'react';
import Home from './Home';
import Register from './Register';
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
                    <Route exact path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    )
}
