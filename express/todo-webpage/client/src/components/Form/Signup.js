import React from 'react';

export default function Signup() {

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
  }

  async function signUp(e) {

    e.preventDefault();

    const { username, email, number, password, cpassword } = user;
    };

  return (
    <div>

    </div>
  )
}
