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

export default function App(): JSX.Element {
  return (
    <div>
      <UserState>
        <Router>
          <Home />
          <Routes>
              <Route path="/" element={
                <React.Suspense fallback={<h1>Please Wait...</h1>}>
                  <TodoPage /> 
                </React.Suspense>
              }/>
              <Route path="/about" />
              <Route path="/signup" />
              <Route path="/signin" />
              <Route path="/signout" element={<Logout />} />
              <Route path="/addnote" />
              <Route path="/updateuser"/>
              <Route path="/contact" />
              <Route path="*" element={<Skeleton active />} />
          </Routes>
        </Router>
      </UserState>
    </div>
  )
}
