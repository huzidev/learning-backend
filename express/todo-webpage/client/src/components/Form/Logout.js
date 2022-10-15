import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const Navigate = useNavigate();

    React.useEffect(() => {
        fetch('/signout', {
          method : 'GET',
          headers : {
              "Accept" : "application/json",
              "Content-Type" : "application/json"
          },
          credentials : "include"
        }).then((res) => {
          Navigate('/', {
            replace : true
          })
          if (!res.status === 200) {
            const error = new Error(res.Error);
            throw error;
          } else {
            localStorage.removeItem('jwtoken')
            window.alert("Logout successfully")
          }
        }).catch((err) => {
          console.log(err);
        })
      }, [])

    return (
        <div>
            Logging Out
        </div>
    )
}
