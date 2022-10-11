import React from 'react';
import SignUp from './Form/SignUp';
import Home from './Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <div>
        Hello, World
        <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/signup" element={<SignUp />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
    </div>
  )
}
