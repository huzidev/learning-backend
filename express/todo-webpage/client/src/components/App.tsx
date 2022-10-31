import 'antd/dist/antd.css';
import routes from './Router/routes'
import SignOut from './Pages/Form/signout/SignOut';
import Home from './Home';
import Error from './Error';
import UserState from './Context/UserState';
import { Skeleton } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

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
            <Route path="/signout" element={<SignOut />} />
            <Route path="*" element={<Skeleton active />} />
          </Routes>
        </Router>
      </UserState>
    </div>
  )
}
