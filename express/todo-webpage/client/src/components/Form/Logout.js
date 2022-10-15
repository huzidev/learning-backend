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
          if (res.status === 200) {
            localStorage.removeItem('jwtoken')
          } else {
            const error = new Error(res.Error);
            throw error;
          }
          setTimeout(() => {
            window.alert("Logout successfully")
            Navigate('/', {
              replace : true
            })
          }, 2500)
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
