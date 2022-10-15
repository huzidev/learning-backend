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
        setUserData(data);

        if (!res.status === 200) {
            const error = new Error(res.error)
            throw error;
        }
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div>
        User data
    </div>
    
  )
}
