import 'antd/dist/antd.css';
import routes from './Router/routes'
import SignOut from './Pages/Form/signout/SignOut';
import Home from './Home';
import Error from './Error';
import UserState from './Context/UserState';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import paths from './Router/paths';
export default function App(): JSX.Element {
  
  const history = createBrowserHistory();
  let path = history.location.pathname;
  const allPaths = Object.values(paths);
  let pathsName: any;
  for (let i = 0; i < allPaths.length; i++) {
    pathsName = allPaths[i];
  }

  console.log("curr path is", history.location.pathname);
  
  return (
    <div>
      <UserState>
        <Router>
            { history.location.pathname === pathsName && <Home /> }
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
              <Route path="*" element={<Error />}/>
            </Routes>
        </Router>
      </UserState>
    </div>
  )
}
