import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './MyComponents/Navbar';
import { Home } from './MyComponents/Home';
import About from './MyComponents/About';
import NoteState from './context/notes/NoteState';
import Alert from './MyComponents/Alert';
import Signup from './MyComponents/Signup';
import Login from './MyComponents/Login';

function App() {

  const [alert, setAlert] = React.useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1200);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}/>
              <Route exact path="/about" element={<About  />}/>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}/>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;