import React from 'react';

export default function Signup() {
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
            number,
            password,
            cpassword 
        })
    });
  };

  return (
    <div>

    </div>
  )
}
