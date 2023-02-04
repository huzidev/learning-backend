import 'antd/dist/antd.css';
import routes from './Router/routes'
import SignOut from './Pages/Form/signout/SignOut';
import Home from './Home';
import Error from './Error';
import UserState from './Context/UserState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import paths from './Router/paths';
import { useLocation } from 'react-router-dom';
export default function App(): JSX.Element {
  const Location = useLocation();
  const allPaths = Object.values(paths);
  let pathsName: any;
  for (let i = 0; i < allPaths.length; i++) {
    let pathsName = allPaths[i];
  }
  console.log("paths name", pathsName);

  if () {
    console.log("updateuser is included");
  }
  
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
              <Route path="*" element={<Error />}/>
            </Routes>
        </Router>
      </UserState>
    </div>
  )
}
