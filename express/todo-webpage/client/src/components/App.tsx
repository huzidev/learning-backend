import React from 'react';
import 'antd/dist/antd.css';
import routes from './Router/routes'
import Logout from './Pages/Form/Logout';
import ContactUs from './Pages/Form/ContactUs';
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
const TodoPage = React.lazy(() => import('./Pages/Todo/TodoPage'))

export default function App(): JSX.Element {
  return (
    <div>
      <UserState>
        <Router>
          <Home />
          <Routes>
            {routes.map(({ Component, ...route }) => {
              return (
                <Route 
                  {...route}
                  key={route.path}
                />
              )
            })} 
              <Route path="/" element={
                <React.Suspense fallback={<h1>Please Wait...</h1>}>
                  <TodoPage /> 
                </React.Suspense>
              }/>
              <Route path="/signout" element={<Logout />} />
              <Route path="*" element={<Skeleton active />} />
          </Routes>
        </Router>
      </UserState>
    </div>
  )
}
