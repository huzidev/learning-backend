import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './MyComponents/Navbar';
import { Home } from './MyComponents/Home';
import About from './MyComponents/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './MyComponents/Alert';
import Signup from './MyComponents/Signup';
import Login from './MyComponents/Login';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is amazing React course" />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route exact path="/about" element={<About  />}/>
              <Route exact path="/login" element={<Login  />}/>
              <Route exact path="/signup" element={<Signup />}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;