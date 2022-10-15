import React from 'react';

export default function User() {

  const [userData, setUserData] = React.useState({})

  async function about() {
    try {
        const res = await fetch('/about', {
            method : 'GET',
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                },
            credentials : "include"
        })
        const data = await res.json();
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div>User data</div>
  )
}
