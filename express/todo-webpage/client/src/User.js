import React from 'react';

export default function User() {

  const [userData, setUserData] = React.useState({})

  async function about() {
    try {
        
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div>User data</div>
  )
}
