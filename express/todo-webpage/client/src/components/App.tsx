import 'antd/dist/antd.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import UserState from './Context/UserState';
import Error from './Error';
import PageWrapper from './Home';
import routes from './Router/routes';
export default function App(): JSX.Element {
  return (
      <UserState>
        <Router>
          <Routes>
          {routes.map(({ Component, path }) => {
            return (
              <Route
              key={path}
              path={path}
              element={
                <PageWrapper>
                  <Component  />
                </PageWrapper>
              }
              />
            )
          })} 
            <Route path="*" element={<Error />}/>
          </Routes>
        </Router>
      </UserState>
  )
}
