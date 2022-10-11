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
    if (res.status === 421 || !data) {
        props.showAlert("Invalid Value!", "error")
    }   
    else if (res.status === 500) {
        props.showAlert("Internal Server Error : Failed to registered!", "error")
    }
    else {
        props.showAlert("LoggedIn Successfully!", "success")
        // REDUX FUNCTION FOR CHANGING NAV-BAR
        dispatch(stateActions.logInSeller());
        // redux function for changing state type of password
        dispatch(stateActions.passwordConditionLog());
        console.log("Successfully loggedIn");
        localStorage.setItem('jwtokenseller', data.token)
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
