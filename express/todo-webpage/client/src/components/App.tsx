import 'antd/dist/antd.css';
import { useContext } from 'react';
import DataContext from './Context/DataContext';
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
import { GlobalStyles } from './styled-components/Global.styled';
import { Wrapper } from './styled-components/Container.styled';

export default function App(): JSX.Element {
  const context = useContext(DataContext)
  const { userData } = context
  
  return (
    <div>
      <UserState>
        <GlobalStyles />
        <Wrapper dark={userData.isTheme}>
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
        </Wrapper>
      </UserState>
    </div>
  )
}
