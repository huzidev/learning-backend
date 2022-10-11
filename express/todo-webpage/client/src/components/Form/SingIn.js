import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingIn() {

  const Navigate = useNavigate();

  const [user, setUser] = React.useState({
    username : "",
    email : "",
    number : "",
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

  async function loginSeller(e) {
    e.preventDefault();

    const { email, username, number, password } = user;
    
    const res = await fetch(`/signin`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email,
            username,
            number,
            password
        })
    });

    const data = await res.json();
    if (!data) {
      window.alert("Invalid Value!")
    } 
    else if (res.status === 500) {
      window.alert("Internal Server Error : Failed to registered!")
    }
    else {
      props.showAlert("LoggedIn Successfully!")
      localStorage.setItem('jwtoken', data.token)
      Navigate("/");
    }
  }

  return (
    <div>
        <h1>
          SingIn Page
        </h1>
        <form>
            <input 
                type="text"
                name="username"
                value={user.username}
                onChange={inputHandler}
                placeholder="Enter Yours Name"
                required
            />
            <input 
                type="email"
                name="email"
                value={user.email}
                onChange={inputHandler}
                placeholder="Enter Yours Email"
                required
            />
            <input 
                type="number"
                name="number"
                value={user.number}
                onChange={inputHandler}
                placeholder="Enter Yours Number"
                required
            />
            <input 
                type="password"
                name="password"
                value={user.password}
                onChange={inputHandler}
                placeholder="Enter Yours Password"
                required
            />
            <input 
                type="password"
                name="cpassword"
                value={user.cpassword}
                onChange={inputHandler}
                placeholder="Confirm Yours Password"
                required
            />
            <button onClick={signUp}>
                SignUp
            </button>
        </form>
    </div>
  )
}
