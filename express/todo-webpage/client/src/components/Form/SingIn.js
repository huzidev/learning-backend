import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingIn() {

  const Navigate = useNavigate();
  const host = "http://localhost:8000";

  const [user, setUser] = React.useState({
    username: "",
    number : "",
    email: "",
    password : ""
  });


  let name, value;
  function inputHandler(e) {
    name= e.target.name;
    value= e.target.value;
    setUser({
        ...user,
        [name]: value
    });
  };

  let type;
  let namea;
  let state;

  let a;
  let b;
  let c;
  async function signIn(e) {
    e.preventDefault();

    const { email, username, number, password } = user;
    
    const res = await fetch(`/signin`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username,
        email,
        number,
        password
      })
    });
    
    if (res.status === 455) {
      a = true;
      b = false;
      c = false;
    } else if (res.status === 456) {
      a = false;
      b = true;
      c = false;
    } else if (res.status === 457) {
      a = false;
      b = false;
      c = true;
    }

    const data = await res.json();
    if (!data) {
      window.alert("Invalid Value!")
    } else if (res.status === 400) {
      window.alert("Email or Password is incorrect")
    } else if (res.status === 401) {
      window.alert("Username or Password is incorrect")
    } else if (res.status === 402) {
      window.alert("Number or Password is incorrect")
    } else if (res.status === 500) {
      window.alert("Internal Server Error : Failed to registered!")
    }
    else {
      window.alert("LoggedIn Successfully!")
      localStorage.setItem('jwtoken', data.token)
    }
  }

  return (
    <div>
        <h1>
          SingIn Page
        </h1>
        <form>
          {
            a ? (
                <input 
                type="text"
                name="username"
                value={user.username}
                onChange={inputHandler}
                required
              />
            ) : "hello"
          }
            <input 
              type={type}
              name={namea}
              value={state}
              onChange={inputHandler}
              placeholder="Enter email, number, username"
              required
            />
            {/* <input 
              type="text"
              name="username"
              value={user.username}
              onChange={inputHandler}
              required
            /> */}
            <input 
              type="password"
              name="password"
              value={user.password}
              onChange={inputHandler}
              placeholder="Enter Yours Password"
              required
            />
            <button onClick={signIn}>
              SignIn
            </button>
        </form>
    </div>
  )
}
