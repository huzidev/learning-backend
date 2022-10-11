import React from 'react';

export default function SignUp() {
  const Navigate = useNavigate();
  const host = "http://localhost:8000";

  const [user, setUser] = React.useState({
    username : "",
    email : "",
    number : "",
    password : "",
    cpassword : ""
  });

  let name, value;
  function inputHandler(e) {
    name: e.target.name;
    value: e.target.value;
    setUser({
        ...user,
        [name]: value
    });
  };

  async function signUp(e) {

    e.preventDefault();

    const { username, email, number, password, cpassword } = user;
    const res = await fetch(`${host}/signup`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            number: parseInt(user.number),
            password,
            cpassword 
        })
    });

    const data = await res.json();

    if (res.status === 421 || !data) {
        window.alert("Invalid Value")
    } else if (res.status === 422) {
        window.alert("Email already Exist")
    } else if (res.status === 423) {
        window.alert("Username already Exist")
    } else if (res.status === 424) {
        window.alert("Number already Exist")
    } else if (res.status === 425) {
        window.alert("Password doesn't match")
    } else if (res.status === 426) {
        window.alert(`Username's length must be greater than 4 character and you've used just ${username.length} characters`)
    } else if (res.status === 427) {
        window.alert(`Password's length must be greater than 8 character and you've used just ${password.length} values`)
    } else if (res.status === 500) {
        window.alert("Internal Server Error : Failed to registered!")
    } else {
        window.alert("User registered successfully!")
        console.log("Successful Registration");
        Navigate("/login");
    }
  };

  return (
    <div>
        <h1>
            SignUp page
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
                name="username"
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
                name="username"
                value={user.cpassword}
                onChange={inputHandler}
                placeholder="Confirm Yours Password"
                required
            />
            <button onClick={signUp}>
                
            </button>
        </form>
    </div>
  )
}
