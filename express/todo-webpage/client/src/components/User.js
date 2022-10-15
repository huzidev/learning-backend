import React from 'react';
import TodoPage from './Todo/TodoPage';

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

  React.useEffect(() => {
    if (localStorage.getItem('jwtoken')) {
        about();
    }
  }, [])
  
  return (
    <div>
        User data
        <h1>
            Name: {userData.username}
        </h1>
        <h1>
            Email: {userData.email}
        </h1> 
        <h1>
            Number: {userData.number}
        </h1>
        <TodoPage 
            test={userData.username}
        />
    </div>
  )
}
