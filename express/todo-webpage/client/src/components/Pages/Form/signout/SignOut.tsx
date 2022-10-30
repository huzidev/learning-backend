import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignOut(): JSX.Element {

    const Navigate = useNavigate();

    React.useEffect(() => {
        fetch('/signout', {
          method : 'GET',
          headers : {
              "Accept" : "application/json",
              "Content-Type" : "application/json"
          },
          credentials : "include"
        }).then((res: Response) => {
            localStorage.removeItem('jwtoken')
            setTimeout(() => {
              window.alert("Logout successfully")
              Navigate('/', {
                replace : true
              })
              window.location.reload();
            }, 2500)
        }).catch((err: any) => {
          console.log(err);
        })
      }, [])

    return (
        <div>
            Logging Out
        </div>
    )
}
