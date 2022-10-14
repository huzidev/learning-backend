import React from 'react';
import 'antd/dist/antd.css';
import SignUp from './Form/SignUp';
import SingIn from './Form/SingIn';
import ContactUs from './Form/ContactUs';
import Error from './Error';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const Home = React.lazy(() => import('./Home'))

export default function App() {
  return (
    <div>
        <Router>
          <Routes>
              <Route exact path="/" element={
                <React.Suspense fallback={<h1>Please Wait</h1>}>
                  <Home /> 
                </React.Suspense>
              }/>
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SingIn />} />
            <Route exact path="/contact" element={<ContactUs />} />
            <Route exact path="*" element={<Error />} />
          </Routes>
        </Router>
    </div>
  )
}
