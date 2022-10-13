import React from 'react';
import 'antd/dist/antd.css';
import SignUp from './Form/SignUp';
import SingIn from './Form/SingIn';
import Home from './Home';
import Error from './Error';
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
                    <Route exact path="/signup" element={<SignUp />} />
                    <Route exact path="/signin" element={<SingIn />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
    </div>
  )
}
