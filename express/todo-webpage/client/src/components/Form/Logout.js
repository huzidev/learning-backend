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
          Navigate('/login', {
            replace : true
          })
          if (res.status === 200) {
            window.alert("Logout successfully")
            localStorage.removeItem('jwtokenseller')
          } else {
            const error = new Error(res.Error);
            throw error;
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
