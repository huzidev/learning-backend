import React from 'react';
import 'antd/dist/antd.css';
import SignUp from './Form/SignUp';
import SingIn from './Form/SingIn';
import Logout from './Form/Logout';
import ContactUs from './Form/ContactUs';
import Home from './Home';
import User from './User';
import Error from './Error';
import UserState from './Context/UserState';
import { Skeleton } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const TodoPage = React.lazy(() => import('./Todo/TodoPage'))

export default function App() {
  return (
    <div>
      <UserState>
        <Router>
          <Home />
          <Routes>
              <Route exact path="/" element={
                <React.Suspense fallback={<h1>Please Wait...</h1>}>
                  <TodoPage /> 
                </React.Suspense>
              }/>
              <Route exact path="/about" />
              <Route exact path="/signup" />
              <Route exact path="/signin" />
              <Route exact path="/signout" element={<Logout />} />
              <Route exact path="/addnote" />
              <Route exact path="/updateuser"/>
              <Route exact path="/contact" />
              <Route exact path="*" element={<Skeleton active />} />
          </Routes>
        </Router>
      </UserState>
    </div>
  )
}
