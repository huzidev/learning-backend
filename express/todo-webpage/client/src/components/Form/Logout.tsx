import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout(): JSX.Element {

    const history = useHistory();

    React.useEffect(() => {
        fetch('/signout', {
          method : 'GET',
          headers : {
              "Accept" : "application/json",
              "Content-Type" : "application/json"
          },
          credentials : "include"
        }).then((res: Response) => {
          if (res.status === 200) {
            localStorage.removeItem('jwtoken')
          } else {
            const error = new Error();
            throw error;
          }
          setTimeout(() => {
            window.alert("Logout successfully")
            history.push('/', {
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
